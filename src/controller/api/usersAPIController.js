const path = require("path");
const db = require('../../../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const moment = require('moment');

const usersApiController = {
list: async (req, res) => {
    try{
        const userList =await User.findAll({
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
},

    detail: async (req, res) => {
        try{
            const id = req.params.id;
            const userDetail = await User.findByPk(
                id,{
                    include:{all:true},
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


    module.exports = usersApiController;