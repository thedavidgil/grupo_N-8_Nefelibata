module.exports = (sequelize, dataTypes) => {
  const alias = "User_category";

  const cols = {
  
    id:{
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
    deletedAt: false
  };
  
  const User_category = sequelize.define(alias,cols,config);
  
  User_category.associate = function(models){
    
    User_category.hasMany(models.User,{
      as: "users",
      foreignKey: "user_category_id"
    })
    
  }
  
  return User_category
}

