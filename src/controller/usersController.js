const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator")
const db = require("../../database/models");
const fs = require('fs');
const path = require("path");


const controller = {

  register: (req, res) => {
    db.User_category.findAll()
    .then(categorias  => {
      res.render("./users/register",{categorias})
    })
  },

  processRegister: (req, res) => {

    const resultValidation = validationResult(req);
    
    db.User.findOne({
      where: {
        email: req.body.email
      }
    }).then(result => {

      if (result !== null) {

        if(req.file){
          fs.unlink(path.join(__dirname, "../../public/images/avatars/", req.file.filename), function (err) {
            if (err) throw err;
            console.log('Avatar deleted due to error on validation');
          }); 
        } 
        
        db.User_category.findAll()
          .then(categorias => {
            res.render("./users/register"
            , {
              errors: {
                email: {
                  msg: "Este email ya está registrado"
                }
              },
              oldData: req.body,
              categorias: categorias
            })
        })

      } else {
        if (resultValidation.errors.length > 0) {
          if(req.file){
            fs.unlink(path.join(__dirname, "../../public/images/avatars/", req.file.filename), function (err) {
              if (err) throw err;
              console.log('Avatar deleted due to error on validation');
            }); 
          } 
          db.User_category.findAll()
            .then(categorias => {
              return res.render("./users/register", {
                errors: resultValidation.mapped(),
                oldData: req.body,
                categorias: categorias
              })
           
            })
          
        } else {
          db.Avatar.create({
            avatar: req.file.filename
          })
            .then(() => {
              db.Avatar.findOne({
                where: {
                  avatar: req.file.filename
                }
              })
                .then(result => {
                  db.User.create({
                    first_name: req.body.firstName,
                    last_name: req.body.lastName,
                    email: req.body.email,
                    password: bcryptjs.hashSync(req.body.password, 10),
                    user_category_id: req.body.category,
                    avatar_id: result.avatar_id
                  })
                    .then(() => {
                      res.redirect("login")
                    })
                })
            })
        }
      }
    })
  },

  edit: function (req, res) {
    db.User.findByPk(req.params.id)
      .then(Users => {
        db.User_category.findAll()
        .then(categorias => {
          res.render("./users/edit", { userToEdit:Users , categorias});//ver si sigue existiendo el userToEdit, creo que lo cambiaron
        })
      })
  },

  update: (req, res) => {
    const id = req.params.id;

      db.User_category.findOne({
        where:{
          category: req.body.user_category
        }
      })
      .then(result =>{
        db.User.update({
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          email: req.body.email,
          password: bcryptjs.hashSync(req.body.password, 10),
          user_category_id: result.user_category_id,
        },{
          where:{
            user_id: id
          }
        })
        .then(() => {
            db.Avatar.update({
              avatar: req.file.filename
            },{
              where:{
                avatar_id: id
              }
            })
            .then(() =>{
              res.redirect("/users/userList")
            }) 
            .catch(function (err) {
              console.error(err);
            }) 
          
        })
      })
  },



//******************************FALTA CONSTRUIR***********************//

    "list": (req, res) => {
        db.User.findAll()
            .then(user => {
                res.render("/users/usersList", {user})
            })
    },
//******************************FALTA CONSTRUIR(construida)***********************//



  login: (req, res) => {
    return res.render("./users/login");
  },

  loginProcess: (req, res) => {
    
    db.User.findOne({
      where:{
        email: req.body.email
      }
    })
      .then(result => {
  
      let comparacion = bcryptjs.compareSync(req.body.password, result.password)
        
        if (comparacion) {
          result.password = null;
          req.session.userLogged = result;
          
          db.Avatar.findOne({
            where: {
              avatar_id:result.avatar_id
            }
          })
            .then(avatar => {  
              req.session.userLogged.avatar_id = avatar.avatar 
              if (req.body.remember_user) {
                res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 2 });
              }
              return res.redirect("/users/profile");
          })
         
        } else {
          return res.render("./users/login", {
            errors: {
              email: {
                msg: 'Las credenciales son inválidas'
              }
            }
          })
        }
    })
    .catch( () =>{
      return res.render("./users/login", 
      {
        errors: {
          email: {
            msg: 'No se encuentra este email en nuestra base de datos'
          }
        },
        oldData: req.body
      })
    })
  },

//Hasta aqui todo funciona bien













//****************************************FALTA REVISAR***************************//
  profile: (req, res) => {
    db.User.findAll({
      where: {
        user: req.session.userLogged
      }
    })
      .then(function (userLogged) {
        if (userLogged)
          return res.render("./users/profile")
        user: req.session.userLogged
      })
  },

  logout: (req, res) => {
   res.clearCookie('userEmail');
    req.session.destroy();
    return res.redirect('/');
  },

  recovery: (req, res) => {
    /*db.User.findAll({
      where: {
        password: req.body.password
      }
    })
      .then(function (password) {
        if (password)
          res.render("./users/passwordRecovery") //?????
      })*/
  }




}


module.exports = controller