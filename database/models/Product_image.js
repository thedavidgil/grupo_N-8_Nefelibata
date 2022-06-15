module.exports = (sequelize, dataTypes) =>{
const alias = "Product_image";

const cols = {

  id:{
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

const Product_images = sequelize.define(alias,cols,config);

Product_images.associate = function(models){

  Product_images.belongsTo(models.Product,{ 
    as: "products",
    foreignKey: "product_id"
  })

}

return Product_images
} 

