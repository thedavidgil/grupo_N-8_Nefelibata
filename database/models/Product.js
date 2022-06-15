module.exports = (sequelize, dataTypes ) => {
  const alias = "Product";
  const cols = {
  
    id:{
      type: dataTypes.INTEGER(10).UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    name:{
      type: dataTypes.STRING(30),
      allowNull: false
    },
    description:{
      type: dataTypes.TEXT,
      allowNull: false
    },
    price:{
      type: dataTypes.DECIMAL(10, 2).UNSIGNED,
      allowNull: false
    },
  
    product_category_id: dataTypes.INTEGER(10).UNSIGNED,
  
    show_product:{
      type: dataTypes.INTEGER(4).UNSIGNED,
      allowNull: false
    } 
  };
  
  let config = {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    paranoid: true
    /*timestamps: false,
    deletedAt: false*/
  }
  
  const Product = sequelize.define(alias,cols,config);
  
  Product.associate = function(models){
  
    Product.belongsTo(models.Product_category,{
      as:"product_categories",
      foreignKey:"product_category_id"
  
    })
                                                                                                                                                    
    Product.hasMany(models.Product_image,{ 
      as: "product_images", 
      foreignKey: "product_id"
    })
  
    Product.belongsToMany(models.User,{ 
      as: "users",
      through: 'user_products',
      foreignKey: 'product_id',
      otherKey: 'user_id',
      timestamps: false
    })
    
  
  }
  
  return Product
}

