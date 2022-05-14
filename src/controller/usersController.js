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
			return res.render("userRegisterForm", {
				errors: resultValidation.mapped(),
				oldData: req.body
			});
		}

		let userInDB = User.findByField("email", req.body.email);// Sabrina. Proceso para que no haya registracion dos veces con un mismo email. Quiero buscar por el campo email y que busque un usuario que coincida con el body en el req en el email

		if (userInDB) {// Sabrina. Es una validación creada por nosotros . Si el usuario está en la BD quiero retornar un error por si alguien intenta registrase con un email que ya existe en la BD, porque el suario ya esta registrado y no puede volver a hacerlo.
			return res.render("userRegisterForm", {
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

		return res.redirect("/users/login");//Sabrina. y enviar esta info redireccionandola
  },

  login: (req, res) => {//Sabrina. controlador que renderiza la vista de login. Este es el metodo de login
		return res.render("login");
	},
	loginProcess: (req, res) => {// Sabrina. otro metodo que recibirá al req, al res
		//aca se procesa todo el formulario: tomar lo que viajo en el req del body y verificar si tengo a x persona registrada
		let userToLogin = User.findByField('email', req.body.email);// voy a buscar el usuario...tomo del modelo, el metodo User.findByField donde digo que quiero buscar por email, y lo que vino en el body del req en el email
		
		if(userToLogin) {// Sabrina. si obtuve algo es true, sino es false
			let okPassword = bcryptjs.compareSync(req.body.password, userToLogin.password);//encontrado el usuario hay que verificar si su contraseña , guardada en la Bd corresponde con la ingresada
			if (okPassword) {//si todo esta bien, antes de redirigir quiero guardar al usuario en session, para eso se hace la linea 56
				delete userToLogin.password;//antes de pasar el usuario en sesion es borrar del userToLogin la propiedad password. Es solo por seguridad. Con delete podemos borrar una propiedad determinada. basicamente, borra la contraseña.
				req.session.userLogged = userToLogin;//session es la parte que nos va a permitir implementar a lo largo de toda nuestra aplicacion la variable session que es objeto literal que va a contener info que yo quiera (se instala express-session. npm install express-session) luego inicializo la sesion en app.js. Al usuario logueado le asigno el userToLogin

				if(req.body.remember_user) {//si en el req, en el body vino remember_user, entonces, a linea 64. este remember estoa agregado en login.ejs
					res.cookie("userEmail", req.body.email, { maxAge: (1000 * 60) * 60 })//proceso para recordar el usuario. seteo una cookie. En el res voy a setaer una cookie userEmail y lo que va a guardar la cookie es el valor de lo que vino en el body del req que es la propiedad email. Esto va a durar maxAge es para indicar que la cookie dura 1000 milisegundos pero lo multiplica por 60 que son 60 segundos. va a userLoggedMiddleware
				}

				return res.redirect('/users/profile');//si da verdadero, redirigir a la vista /user/profile
			}
			return res.render("login", {//cuando no se obtiene nada (undefined)
				errors: {//crear un objeto literal
					email: {//va a tener un error para el email
						msg: "No es válido"//el mensaje de error del email
					}
				}
			});
		}

		return res.render("login", {
			errors: {
				email: {
					msg: "Este mail no está en nuestra base de datos"
				}
			}
		});
	},

	profile: (req, res) => {//
		return res.render("usersProfile", {
			users: req.session.userLogged//recibe una variable que va a tener del rq de la session el userLogged
		});
	},

    logout: (req, res) => {// Sabrina. Metodo logout
		res.clearCookie("userEmail");//Sabrina. res.clearCookie y el mail para indicar que cookie hay que eliminar y esto automaticamente destruye cualquir cookie que exista. entonces aca se destruye la cookie
		req.sessio.destroy(); //Sabrina.hace un req.session.destroy para borrar todo lo que está directamente en session. Lo destruye automaticamente. Aca se destruye la session
		return res.redirect("/"); //luego se hace un redirect a la raiz. Aca se redirige a la home
	},

store:(req,res) => {
    const validaciones = validationResult(req);

    if(validaciones.errors.length > 0){

    return res.render("./users/register",{
        errors: validaciones.mapped(),
        oldData: req.body,
      })
    }

		const userNuevo = {
			id: users.length > 0 ? users[ users.length - 1 ].id + 1 : 1,
			...req.body,
      password:bcrypt.hashSync(req.body.password,12)
		}

		users.push(userNuevo); // Gabriel Guarda el usuario nuevo
		fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2)) //Gabriel. Hay que escribir de nuevo el archivo con los datos nuevos. Users viaja como strin por eso es json.stringify de users

		return res.redirect("confirmation")
   
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

  login:(req,res) =>{
    res.render("./users/login")
  },

  recovery:(req,res) => {
    res.render("./users/passwordRecovery")
  }
}




module.exports = controller;