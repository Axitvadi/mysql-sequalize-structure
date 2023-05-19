const Product = require("../model/productModel");

exports.addProduct = async(req, res)=>{
    try {
        const { product_name, product_price, product_category } = req.body;

        if(!product_name || !product_price || !product_category){
           return res.status(400).json({
            success:false,
            message:"required feild are missing"
           });
        };
        const productExisting = await Product.findOne({where:{product_name:product_name}});
        if(productExisting){
            return res.status(404).json({
                success:false,
                message:"product already exists"
            });
        };

        let newProduct = new Product({
            product_name:product_name,
            product_price:product_price,
            product_category:product_category
        });

        await newProduct.save();

        return res.status(200).json({
            success:true,
            data:newProduct,
            message:"product added successfully"
        });
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        });
    };
};

exports.getAllProduct = async(req, res)=>{
    try {
        const product = await Product.findAll();

        const products = product.map(product =>{
            return{
                product_name:product.product_name,
                product_price:product.product_price,
                product_category:product.product_category
            };
        });
        return res.status(200).json({
            success:true,
            data:products,
            message:"product found successfully"
        });
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        });
    };
};

exports.getProductById = async(req, res)=>{
    try {
        const id = req.params.id;
        const product = await Product.findByPk(id);

        const products = {
            id: product.id,
            product_name: product.product_name,
            product_price: product.product_price,
            product_category:product.product_category
        };
        return res.status(200).json({
            success:true,
            data:products,
            message:"product found successfully"
        });
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        });
    };
};

exports.updateProductById = async(req, res)=>{
    try {
        const {product_name, product_price, product_category} = req.body;
        const id = req.params.id;
        const product = await Product.findByPk(id);

        if(!product){
            return res.status(404).json({
                success:false,
                message:"product not found"
            });
        };

        product.product_name = product_name;
        product.product_price =  product_price; 
        product.product_category =  product_category;

       await product.save();
       return res.status(200).json({
        success:true,
        data:product,
        message:"product updated successfully"
       });

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        });
    };
};

exports.deleteProduct = async(req, res)=>{
    try {
        const id = req.params.id;

        const deleteProduct = await Product.destroy({where:{id:id}});

        return res.status(200).json({
            success:true,
            data:deleteProduct,
            message:"product deleted successfully"
        });

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        });
    };
};