const express = require("express");
const router = express.Router();
const productController = require("../controller/productController");

router.post("/",productController.addProduct);
router.get("/",productController.getAllProduct);
router.get("/:id",productController.getProductById);
router.put("/:id",productController.updateProductById);
router.delete("/:id",productController.deleteProduct);

module.exports = router;