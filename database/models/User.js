const { sequelize, dataTypes } = require('sequelize');

const alias = "User";
const cols = {

  user_id:{
    type: dataTypes.INT(10).UNSIGNED,
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
    type: dataTypes.string(30),
    allowNull: false
  },
  password:{
    type: dataTypes.string(30),
    allowNull: false
  },
  user_category_id: dataTypes.INT(10).UNSIGNED,
  avatar_id:dataTypes.INT(10).UNSIGNED

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
    as:"user_categories",
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


module.exports = User;