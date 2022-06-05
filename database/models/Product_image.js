module.exports = (sequelize, dataTypes) =>{
const alias = "Product_image";

const cols = {

  product_image_id:{
    type: dataTypes.INTEGER(10).UNSIGNED,
    primaryKey: true,
    autoIncrement: true
  },
  image:{
    type: dataTypes.STRING(100),
    allowNull: false
  },
  product_id:dataTypes.INTEGER(10).UNSIGNED
};

let config = {
  timestamps: false,
  deletedAt: false
};

const Product_image = sequelize.define(alias,cols,config);

Product_image.associate = function(models){

  Product_image.belongsTo(models.Product,{ 
    as: "products",
    foreignKey: "product_id"
  })

}

return Product_image
} 

