// require("dotenv").config();
const {Sequelize, DataTypes} = require("sequelize");

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        dialect: "mysql",
        host: process.env.DB_HOST,
    }
);

module.exports = sequelize;

// sequelize.authenticate().then(() => {
//     console.log('Connection has been established successfully.');
//     sequelize.sync({ force: false })
//  }).catch((error) => {
//     console.error('Unable to connect to the database: ', error);
//  });