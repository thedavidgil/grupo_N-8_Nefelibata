module.exports = (sequelize, dataTypes) => {
  const alias = "User";
  const cols = {
  
    user_id:{
      type: dataTypes.INTEGER(10).UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    first_name: {
      type: dataTypes.STRING(30),
      allowNull: false
    },
    last_name: {
      type: dataTypes.STRING(30),
      allowNull: false
    },
    email:{
      type: dataTypes.STRING(30),
      allowNull: false
    },
    password:{
      type: dataTypes.STRING(100),
      allowNull: false
    },
    user_category_id: dataTypes.INTEGER(10).UNSIGNED,
    avatar_id:dataTypes.INTEGER(10).UNSIGNED
  
  };
  
  let config = {
    timestamps: false,
    deletedAt: false
  };
  
  const User = sequelize.define(alias,cols,config);
  
  User.associate = function(models){
  
    User.hasOne(models.Avatar,{
      as:"avatars",
      foreignKey: "avatar_id"
    })
  
    User.belongsTo(models.User_category,{
      as:"User_category",
      foreignKey:"user_category_id"
  
    })
  
    User.belongsToMany(models.Product,{ 
      as: "products",
      through: 'user_products',
      foreignKey: 'user_id',
      otherKey: 'product_id',
      timestamps: false
    })
  
  }
  
  
  return User
} 

