const Sequelize = require('sequelize')
const sequelize = require("../config/db");

const User = sequelize.define(
    'user',
    {
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      }
    },
    { indexes: [{ unique: true, fields: ['id', 'email'] }], 
      paranoid: false,
    }
  );

 
module.exports = User;