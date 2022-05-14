const bcryptjs = require("bcryptjs");
const bcrypt = require("bcryptjs");
const {validationResult}= require("express-validator")
const fs = require('fs');
const path = require('path');
const usersFilePath = path.join(__dirname, '../data/usersDataBase.json');
let users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const Users = require("../../models/Users");//Sabrina. requierimos el archivo (modulo) de modelos Users.js

const controller = {

  register:(req,res) => {
    res.render("./users/register")
  },
  processRegister: (req, res) => { // Sabrina. hace la previa validacion
		const resultValidation = validationResult(req);

    if (resultValidation.errors.length > 0) {// Sabrina. validacion de express validator
			return res.render("./users/register", {
				errors: resultValidation.mapped(),
				oldData: req.body
			});
		}

		let userInDB = Users.findByField("email", req.body.email);// Sabrina. Proceso para que no haya registracion dos veces con un mismo email. Quiero buscar por el campo email y que busque un usuario que coincida con el body en el req en el email

		if (userInDB) {// Sabrina. Es una validación creada por nosotros . Si el usuario está en la BD quiero retornar un error por si alguien intenta registrase con un email que ya existe en la BD, porque el suario ya esta registrado y no puede volver a hacerlo.
			return res.render("./users/register", {
				errors: {
					email: {//Sabrina.  Objeto literal donde en la propiedad email figure el email, si ya está registrado que muestre el mensaje de la siguiente linea
						msg: "Este email ya está registrado"//el mensaje porque el usuario ya existe
					}
				},
				oldData: req.body//Sabrina. mantiene la info que se registró previamente
			});
		}

		let userToCreate = { //Sabrina. objeto lietral. Si no está registrada la persona, el proceso sigue y genero la info del usuario 
			...req.body,//tiene todo lo que trajo el body en su request
			password: bcryptjs.hashSync(req.body.password, 10),//para encriptar la contraseña (hashearla). El password de este usuario va a ser usando del modulo bcrypt el metodo hashSync y darle lo que viene en el req, en el body, en el password y el salt. Este password va a pisar la propiedad password anterior, mientras coincida con el mismo nombre, se pisa
			avatar: req.file.filename//con multer deja una propiedad que es file y la propiedad filename. Se pone el avatar filename
		}

		let usersCreated = Users.create(userToCreate);//Sabrina. y finalmente aca creo el usuario

		return res.redirect("login");//Sabrina. y enviar esta info redireccionandola
  },

  
  login:(req,res) =>{ //Sabrina. controlador que renderiza la vista de login. Este es el metodo de login
		return res.render("./users/login");
	},

   loginProcess: (req, res) => {
    let userToLogin = Users.findByField('email', req.body.email);
    if(userToLogin) {
      let isOkThePassword = bcryptjs.compareSync(req.body.password, userToLogin.password);
        if (isOkThePassword) {
          delete userToLogin.password;
          req.session.userLogged = userToLogin
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
    res.render("./users/edit", {userToEdit : userToEdit}) //Muestra el formulario de edición
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
    req.session.destroy();
    return res.redirect('/');
  },
  
  recovery:(req,res) => {
    res.render("./users/passwordRecovery")
  }

}

module.exports = controller;