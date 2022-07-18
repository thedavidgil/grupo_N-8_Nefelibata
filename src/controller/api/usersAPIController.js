const db = require('../../../database/models');
<<<<<<< HEAD

const usersApiController = {
    list: async (req, res) =>{
        let users = await db.User.findAll({ attributes: ["user_id", "first_name", "last_name", "email"] });
        users.map(user => user.dataValues.detail = `http://localhost:5000/api/users/${ user.dataValues.user_id }`)
        users = [...users ];

        let lastest = users[users.length-1];

        return res.status(200).json({
            meta: {
                status: 200
            },
            data: {
                users,
                lastest
            }
        });
    },

    detail: async (req, res) => {
        let users = await db.User.findAll({ include:["avatars"], attributes: ["user_id", "first_name", "last_name", "email"] });
        users = { ...users }
        return res.status(200).json({
            meta: {
                status: 200
            },
            data: {
                users
            }
        });
    }
}
module.exports = usersApiController;
=======
const sequelize = db.sequelize;

const usersApiController = {
    list: async (req, res) =>{
        let users = await db.sequelize.query("SELECT user_id, CONCAT(first_name, ' ', last_name), email FROM `Users`");
        let alluser = await db.User.findAll({
            attributes: ["user_id", "first_name", "last_name", "email"] });
            alluser.map(user => user.dataValues.detail = `http://localhost:5000/api/users/${ user.dataValues.user_id }`)
        users = { ...alluser }
        return res.status(200).json({
            meta: {
                status: 200
            },
            data: {
                count: alluser.length,
                users: users
            }
        })
    },

    detail: async (req, res) =>{
            let alluser = await db.User.findAll({ include:["avatars"], attributes: ["user_id", "first_name", "last_name", "email"] });
            users = { ...alluser }
            return res.status(200).json({
                meta: {
                    status: 200
                },
                data: {
                    users
                }
            })
    }
}
module.exports=usersApiController;

//const path = require("path");

//const Op = db.Sequelize.Op;
//const sequelize = db.sequelize;
//const { Op } = require("sequelize");
//const moment = require('moment');



/*module.exports = {
userList: async function (req, res){
try{
        const users = await Users.findAll({
            include:{all:true},
            atributes:["id", "first_name", "last_name", "email", "url"]
        })
        return res.status(200).json({
            total: users.length,
                    data: "http://localhost:5000/api/user",//users
                    status: 200,
        })

}catch(err){
        console.error(err)
    }
},



userDetail: async function (req, res){
    //try{
            const id = req.params.id;
            const users = await Users.findByPk(
                id,{
                    include:{all:true},
                    atributes:["id", "first_name", "last_name", "email", "avatar"]
                })
                return res.json({
                    detail: "http://localhost:5000/api/user/id",//users
                })

        },
        catch(err){
           console.error(err)
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
db.Users.findByPk(req.params.id)
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

    detail: (req, res) =>{
        db.User.findByPk(req.params.id)
        .then(user=>{//cualquier info adicional que yo quiera mostrar debe ser aca
            return res.status(200).json({//json envia la info en este formato
               data:user,
               atributes:["id", "first_name", "last_name", "email", "avatar", "http://localhost:5000/api/users"],
               status:200,
            })
        })
    }
}*/


/*const usersAPIController = {
    list : async (req,res) =>{
        let users = await db.Users.findAll({ include: ['avatars', 'User_category']});
        let count = users.length;
        //console.log(users);
        users.forEach(usuario => {
            let users = {
                user_id : usuario.dataValues.user_id,
                first_name: usuario.dataValues.first_name,
                last_name: usuario.dataValues.last_name,
                email : usuario.dataValues.email,
                detail: "/api/users/${user.dataValues.id}"
            }
            usuario.dataValues = users
        })
        console.log(users);
        res.json({count,users});
    },
 
    detail : async (req,res) =>{
        let user = await db.Users.findByPk(req.params.id);
        let estructura = {
            ...user.dataValues,
            "password" : null,
            "Users.user_category_": null,
            url:"/api/users/detail/avatar${users.avatar}",
        }
        res.json({estructura})
    }
}
module.exports = usersAPIController;*/
>>>>>>> 1920842ed39f3a479de9a397bf3e026a1494503f
