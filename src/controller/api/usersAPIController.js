const path = require("path");
const db = require('../../../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const moment = require('moment');

const usersApiController = {
list: async (req, res) => {
    try{
        const list = await User.findAll({
            //include:{all:true},
            atributes:["id", "first_name", "last_name", "email", "url"]
        })
        return res.status(200).json({
            total: users.length,
                    data: users,
                    status: 200
        })
    }catch(error){
        console.error(error)
    }
    console.log(list)
},

   detail: async (req, res) => {
       try{
            const id = req.params.id;
            const userDetail = await User.findByPk(
                id,{
                    //include:{all:true},
                    atributes:["id", "first_name", "last_name", "email", "avatar"]
                })
                return res.json({
                    detail: user
                })

        }catch(error){
            console.error(error)
        }
    }
}

//const userApiController = {
//userList: (req, res) => {
 //   db.User.findAll()
 //   .then(user => {
  //      return res.status(200).json({
  //          total: user.length,
  //          data: user,
  //          status: 200
   //         })
   // })
//},
//userDetail: (req, res) => {
//db.User.findByPk(req.params.id)
//.then(user => {
  //  return res.status(200).json({
  //      data: user,
   //     status: 200
   //     })
//})
//}
//}


    module.exports = usersApiController;