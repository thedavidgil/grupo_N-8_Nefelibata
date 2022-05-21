const bcryptjs = require("bcryptjs");
const {validationResult}= require("express-validator")
const fs = require('fs');
const path = require('path');
const usersFilePath = path.join(__dirname, '../data/usersDataBase.json');
let users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const Users = require("../../models/Users");

const controller = {

  register:(req,res) => {
    res.render("./users/register")
  },
  processRegister: (req, res) => {
		const resultValidation = validationResult(req);

    if (resultValidation.errors.length > 0) {
			return res.render("./users/register", {
				errors: resultValidation.mapped(),
				oldData: req.body
			});
		}

		let userInDB = Users.findByField("email", req.body.email);

		if (userInDB) {
			return res.render("./users/register", {
				errors: {
					email: {
						msg: "Este email ya está registrado"
					}
				},
				oldData: req.body
			});
		}

		let userToCreate = {
			...req.body,
			password: bcryptjs.hashSync(req.body.password, 10),
			avatar: req.file.filename
		}

		let usersCreated = Users.create(userToCreate);

		return res.redirect("login");
  },


  login:(req,res) =>{
		return res.render("./users/login");
	},

  loginProcess: (req, res) => {
    let userToLogin = Users.findByField('email', req.body.email);
    if(userToLogin) {
      let isOkThePassword = bcryptjs.compareSync(req.body.password, userToLogin.password);
        if (isOkThePassword) {
          delete userToLogin.password;
          req.session.userLogged = userToLogin;
          if (req.body.remember_user){
            res.cookie('userEmail', req.body.email, {maxAge: (1000 * 60) * 2 })
          }

          return res.redirect("profile");

    }
    return res.render("./users/login", {
      errors: {
        email:{
          msg:'Las credenciales son inválidas'
        }
      }
    });
  }

    return res.render("./users/login", {
      errors: {
        email:{
          msg:'No se encuentra este email en nuestra base de datos'
        }
      }
    });
    
   },
   

  

  edit: (req, res) => {
    const id = req.params.id;
    const userToEdit = users[id-1];
    res.render("./users/edit", {userToEdit : userToEdit})
  },

  update:(req, res) => {
    const id = req.params.id;
   users = users.map(user => {
    if(user.id == id){
        users.firstName = req.body.firstName,
        users.lastName = req.body.lastName,
        users.email = req.body.email,
        users.password = req.body.password,
        users.category = req.body.category,
        users.image = req.file?.filename ?? "default-image.png"
    }
    return users;
    });
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2))
    return res.redirect("usersList");
  },
 
  confirmation:(req,res) => {
    res.render("./users/confirmation")
  },

  list:(req,res) => {
    res.render("./users/usersList")
  },


  profile: (req, res) =>{
	  return res.render("./users/profile", {
      user: req.session.userLogged
    })
  },

  logout: (req, res) => {
    res.clearCookie('userEmail');
    req.session.destroy();
    return res.redirect('/');
  },
  
  recovery:(req,res) => {
    res.render("./users/passwordRecovery")
  }
}




module.exports = controller;