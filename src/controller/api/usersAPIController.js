const path = require("path");
const db = require('../../../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const moment = require('moment');


const usersApiController = {
    "list": (req, res) => {
        db.User.findAll()//el modelo a consultar, todos los usuarios
        .then(user => {//recibe a los usuarios
            let respuesta = {//la respuesta en metodo json. Este formato json permite enviar la info de este modo para poder ser consumida como si fuese una Api
                meta: {
                    count: user.length,//se obtiene el total de usuario
                    status : 200,//si el valor es satisfactorio
                },
                user: {
                    id: user.id,
                    name: user.first_name,
                    email: user.email,
                    detail: "api/user",
                },
                data: user//se obtiene la data
            }
                return res.json(respuesta);
            })
    },
    "detail": (req, res) => {
        db.Users.findByPk(req.params.id)
            .then(user => {
                let respuesta = {
                    meta: {
                    count: user.length,//se obtiene el total de usuario
                    status: 200,
                    },
                    user: {
                        id: user.id,
                        name: user.first_name,
                        email: user.email,
                        detail: "/api/avatar_id",
                    },
                    data: user
                }
                return res.json(respuesta);
            });
    }
}

    module.exports = usersApiController;