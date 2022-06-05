const { sequelize, dataTypes } = require('sequelize');

const alias = "Product_category";

const cols = {

  product_category_id:{
    type: dataTypes.INT(10).UNSIGNED,
    primaryKey: true,
    autoIncrement: true
  },
  category:{
    type: dataTypes.STRING(30),
    allowNull: false
  }
};

let config = {
  timestamps: false,
  deletedAt: false
};


const Product_category = sequelize.define(alias,cols,config);

Product_category.associate = function(models){
  
  Product_category.hasMany(models.Product,{
    as: "products",
    foreignKey: "product_category_id"
  })
  
}

module.exports = Product_category;