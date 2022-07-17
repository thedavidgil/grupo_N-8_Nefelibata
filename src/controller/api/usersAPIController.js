//const path = require("path");
//const db = require('../../../database/models');
//const Op = db.Sequelize.Op;
//const sequelize = db.sequelize;
//const { Op } = require("sequelize");
//const moment = require('moment');

/*const User = db.User;
const Avatar= db.Avatar;
const User_category= db.User_category;*/

/*const controller = {
userList: async function (req, res) {
try{
        const users = await User.findAll({
            include:{all:true},
            atributes:["id", "first_name", "last_name", "email", "url"]
        })
        return res.status(200).json({
            total: users.length,
                    data: users, //"http://localhost:5000/api/user",
                    status: 200,
        })

}catch(e){
        console.error(e)
    }
},


userDetail: async function (req, res) {
    try{
            const id = req.params.id;
            const user = await User.findByPk(
                id,{
                    //include:{all:true},
                    atributes:["id", "first_name", "last_name", "email", "avatar"]
                })
                return res.json({
                    detail: user //"http://localhost:5000/api/user/:id",
                })

        }
        catch(e){
            console.error(e)
        }
    }
}*/

    




/*module.exports = {
userList: (req, res) => {
    db.User.findAll()
    .then(user => {
        return res.status(200).json({
            total: user.length,
            data: user,
          status: 200
            })
   })
},
userDetail: (req, res) => {
db.User.findByPk(req.params.id)
.then(user => {
    return res.status(200).json({
        data: user,
        status: 200
        })
})
}
}*/


    /*module.exports = {
        list: (req, res) => {
            db.User.findAll()
            .then(users =>{
                return res.status(200).json({//json envia la info en este formato
                   total: users.length,//asi obtengo el total de registros
                   data:users,
                   status:200
                })
            })
            
        },

        detail:(req, res) => {
            db.User.findByPk(req.params.id)
            .then(user=>{//cualquier info adicional que yo quiera mostrar debe ser aca
                return res.status(200).json({//json envia la info en este formato
                   data:user,
                   // atributes:["id", "first_name", "last_name", "email", "avatar"]
                   status:200
                })
            })
        }
    }*/


    /*const usersAPIController = {
        list : async (req,res) => {
            let users = await db.Users.findAll();
            let count = users.length;
            console.log(users);
            users.forEach(user => {
                let user = {
                    user_id : user.dataValues.user_id,
                    first_name: user.dataValues.first_name,
                    last_name: user.dataValues.last_name,
                    email : user.dataValues.email,
                    detail: "/api/users/${user.dataValues.id}"
                }
                user.dataValues = user
            })
            console.log(users);
            res.json({count,users});
        },
    
        detail : async (req,res) => {
            let user = await db.Users.findByPk(req.params.id);
            let estructura = {
                ...user.dataValues,
                "contraseña" : null,
                "category": null,
                imgUrl:"/api/users/datail/avatar${users.avatar}",
            }
            res.json({estructura})
        }
    }*/
    
    //module.exports = usersAPIController;