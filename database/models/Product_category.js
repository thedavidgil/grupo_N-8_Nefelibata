module.exports = (sequelize, dataTypes) => {
const alias = "Product_category";

const cols = {

  product_category_id:{
    type: dataTypes.INTEGER(10).UNSIGNED,
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
  deletedAt: false,
  freezeTableName: true
};


const Product_category = sequelize.define(alias,cols,config);

Product_category.associate = function(models){
  
  Product_category.hasMany(models.Product,{
    as: "products",
    foreignKey: "product_category_id"
  })
  
}

return  Product_category;
}

