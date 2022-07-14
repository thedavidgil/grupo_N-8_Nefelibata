const path = require("path");
const db = require('../../../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const moment = require('moment');


//const usersApiController = {
    //"list": (req, res) => {
        //Users.findAll ( {//la respuesta en metodo json. Este formato json permite enviar la info de este modo para poder ser consumida como si fuese una Api
          //  include: ["users_products", "user_category"]
        //})
       // .then(user =>{
        //    let respuesta = {
         //       meta: {
         //          count: user.length,//se obtiene el total de usuario
          //          status : 200,//si el valor es satisfactorio
           //         countUser:{
           //          count},
             //   user: [{
             //      id: user.id,
                //  name: user.first_name,
                  //  email: user.email,
                  //  detail: "http://localhost:5000/api/users"
               // }]
           // },
              //  data: user//se obtiene la data
              //  }
             //   return res.json(respuesta);
           // })
    //},
    //"detail": (req, res) => {
     //   Users.findByPk (req.params.id,{
      //      include:["avatar_id"]
       // })
       // .then(user =>{
        //        let respuesta = {
         //           meta: {
          //          id: user.id,
          //          name: user.first_name,
           //         email: user.email,
           //         avatar_id: "'http://localhost:5000/api/user/:id/avatar_id'",
           //         status: 200,
           //         data: user
           //         },
                    
             //   }
            //    return res.json(respuesta);
            //});
   // }
//}//

const usersApiController = {
    'list': (req, res) => {
        db.User.findAll()
        .then(user => {
            let respuesta = {
                meta: {
                    status : 200,
                    total: actors.length,
                    url: 'api/user'
                },
                data: user
            }
                res.json(respuesta);
            })
    },
    
    'detail': (req, res) => {
        db.user.findByPk(req.params.id)
            .then(user => {
                let respuesta = {
                    meta: {
                        status: 200,
                        total: actor.length,
                        url: '/api/user/:id'
                    },
                    data: user
                }
                res.json(respuesta);
            });
    }
}

    module.exports = usersApiController;