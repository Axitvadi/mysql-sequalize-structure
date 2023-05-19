const Sequelize = require("sequelize");
const sequelize = require("../config/db");

const Product = sequelize.define(
    "product",
    {
        product_name:{
            type:Sequelize.STRING,
            allowNull: false,
        },
        product_price:{
            type:Sequelize.STRING,
            allowNull: false,
        },
        product_category:{
            type:Sequelize.STRING,
            allowNull: false
        }
    },
    { indexes: [{ unique: true, fields: ['id'] }], 
      paranoid: false,
    }
);

module.exports = Product;