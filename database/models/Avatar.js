module.exports = (sequelize, dataTypes) =>{
let alias = "Avatar";
let cols = {

  avatar_id:{
    type: dataTypes.INTEGER(10).UNSIGNED,
    primaryKey: true,
    autoIncrement: true
  },
  avatar:{
    type: dataTypes.STRING(100),
    allowNull: false
  }
};

let config = {
  timestamps: false,
  deletedAt: false
};

const Avatar = sequelize.define(alias,cols,config);

Avatar.associate = function(models){
  Avatar.belongsTo(models.User,{
    as:"users",
    foreignKey: "avatar_id"
  })
}

return Avatar

};

