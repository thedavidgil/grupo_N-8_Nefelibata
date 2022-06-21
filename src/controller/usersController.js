const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator")
const db = require("../../database/models");
const fs = require('fs');
const path = require("path");


const controller = {

  register: (req, res) => {
    res.render("./users/register")
  },

  processRegister: (req, res) => {
    const resultValidation = validationResult(req);

    if (resultValidation.errors.length > 0) {
      if(req.file){
        fs.unlink(path.join(__dirname, "../../public/images/avatars/", req.file.filename), function (err) {
          if (err) throw err;
          console.log('Avatar deleted due to error on validation');
        }); 
      }
      return res.render("./users/register", {
        errors: resultValidation.mapped(),
        oldData: req.body
      })
    }
    db.User.findOne({
      where: {
        email: req.body.email
      }
    }).then(result => {
      if (result !== null) {
        throw res.render("./users/register"
          , {
            errors: {
              email: {
                msg: "Este email ya está registrado"
              }
            },
            oldData: req.body

          })
      } else {
        return result
      }
    }).then(() => {
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
                avatar_id: result.avatar_id
              })
                .then(() => {
                  res.redirect("login")
                })
            })
        })
    })
  },


  
  login: (req, res) => {
    return res.render("./users/login");
  },

  loginProcess: async (req, res) => {
    try {
      let userToLogin = await Users.findByField('email', req.body.email);
      //db.User.findOne({
      //where: {
      // email: req.body.email
      //}
      //})
      //.then(function (userToLogin) {
      //if (userToLogin !== null) {//si obtuve algo es true, sino es false. Ahora agrego  el then y al if  le digo que si el mail del  usuario logueado es diferente a nulo, entonces verifique la contraseña
      let isOkThePassword = await bcryptjs.compareSync(req.body.password, userToLogin.password);
      if (isOkThePassword) {
        delete userToLogin.password;
        req.session.userLogged = userToLogin;
        if (req.body.remember_user) {
          res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 2 })
          //}
          // }
          //}
        }
      }
      return res.redirect("profile");
      //})
    }
    catch (err) {
      console.error(err)
    }
    return res.render("./users/login", {
      errors: {
        email: {
          msg: 'Las credenciales son inválidas'
        }
      }

    })
      .then((response) => {
        if (response)
          return res.render("./users/login", {
            errors: {
              email: {
                msg: 'No se encuentra este email en nuestra base de datos'
              }
            }
          })
      })
  },


  //??????????????????????????????
  edit: function (req, res) {
    //const id = req.params.id; 
    //const userToEdit = users[id - 1];
    db.User.findByPk(req.params.id)
      .then(function (Users) {
        res.render("./users/edit", { Users });
      })
  },


  update: (req, res) => {//???????????????????
    const id = req.params.id;
    // users = users.map(user => {
    //if (user.id == id) {
    //users.firstName = req.body.firstName,
    // users.lastName = req.body.lastName,
    //users.email = req.body.email,
    //users.password = req.body.password,
    //users.category = req.body.category,
    // users.image = req.file?.filename ?? "default-image.png"
    //}
    //})
    //}
    //}

    db.User.update({
      first_name: req.body.firstName,
      last_name: req.body.lastName,
      email: req.body.email,
      password: bcryptjs.hashSync(req.body.password, 10),
      avatar_id: result.avatar_id
    })
      .then(() => {
        db.User.findByPk({
          where: {
            id: req.params.id
          }
        })
      })
      //.then(function(response){
      //if(response)
      //return res.redirect("/Users")
      .then(() => {
        db.Avatar.update({
          avatar: req.file.filename
        })
      })
      .then(() => {
        db.Avatar.findOne({
          where: {
            avatar: req.file.filename
          }
        })
          .then(function (response) {
            if (response)
              return res.redirect("/movies")

            return res.redirect("usersList")
          })

       
        return res.redirect("usersList" + req.params.id);
      })
      .catch(function (err) {
        console.error(err);
      })
  },

  list: (req, res) => {
    db.User.findAll()
      .then(usersList => {
        res.render("./users/usersList.ejs", { usersList }) //?????
      })
  },


  profile: (req, res) => {
    db.Users.findAll({
      where: {
        user: req.session.userLogged
      }
    })
      .then(function (userLogged) {
        if (userLogged)
          return res.render("./users/profile")
        //user: req.session.userLogged
      })
  },

  logout: (req, res) => {
    res.clearCookie('userEmail');
    req.session.destroy();
    return res.redirect('/');
  },

  recovery: (req, res) => {
    db.User.findAll({
      where: {
        password: req.body.password
      }
    })
      .then(function (password) {
        if (password)
          res.render("./users/passwordRecovery") //?????
      })
  }
}





module.exports = controller