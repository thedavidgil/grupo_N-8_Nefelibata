const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator")
const fs = require('fs');
const path = require('path');
const usersFilePath = path.join(__dirname, '../data/usersDataBase.json');
let users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
const db = require("../../database/models");//Sabrina. Cambiar el nombre de nuestra db?!


const controller = {

  register: (req, res) => {
    res.render("./users/register")
  },
  processRegister: (req, res) => {//hace la previa validacion
    const resultValidation = validationResult(req);

    if (resultValidation.errors.length > 0) {//validacion de express validator
      return res.render("./users/register", {
        errors: resultValidation.mapped(),
        oldData: req.body
      });
    }

    db.User.findOne({//Sabrina. Devuelve el primer resultado de la busqueda.
      where: {//condicion 
        email: req.body.email// por el email
      }
    }).then(result => {//la promesa
      if (result !== null) {//si el resultado es diferente a nulo
        throw res.render("./users/register"//entonces me redirije a esta vista
          , {
            errors: {//si hay error
              email: {//objeto literal donde en la propiedad email tenga a su vez
                msg: "Este email ya está registrado"//muestra este mensaje
              }
            },
            oldData: req.body//mantiene laa info que se registró previamente

          })
      } else {
        return result//sino, retorna el resultado
      }
    }).then(() => {
      db.Avatar.create({//trae de la db el avatar para crear
        avatar: req.file.filename
      })
        .then(() => {
          db.Avatar.findOne({
            where: {
              avatar: req.file.filename//guarda la imagen
            }
          })
            .then(result => {//de ese resultado 
              db.User.create({//de la db de usuarios, lo crea con lo que a continuación solicita
                first_name: req.body.firstName,
                last_name: req.body.lastName,
                email: req.body.email,
                password: bcryptjs.hashSync(req.body.password, 10),
                avatar_id: result.avatar_id
              })
                .then(() => {
                  res.redirect("login")//finalizado ese proceso lo redirige a login (para loguearse)
                })
            })
        })
    })
  },


  login: (req, res) => {//controlador que renderiza la vista de login
    return res.render("./users/login");
  },

  loginProcess: (req, res) => {//otro metodo que recibirá al req, al res
    //aca se procesa todo el formulario: tomar lo que viajo en el req del body y verificar si tengo a x persona registrada
    let userToLogin = Users.findByField('email', req.body.email);// voy a buscar el usuario...tomo del modelo User.findByField donde digo que quiero buscar por email, y lo que vino en el body del req en el email
    if (userToLogin) {//si obtuve algo es true, sino es false
      let isOkThePassword = bcryptjs.compareSync(req.body.password, userToLogin.password);//encontrado el usuario hay que verificar si su contraseña , guardada en la Bd corresponde con la ingresada
      if (isOkThePassword) {//si todo esta bien, antes de redirigir a la persona quiero guardar al usuario en session, para eso se hace la linea 56
        delete userToLogin.password;//antes de pasar el usuario en sesion es borrar del userToLogin la propiedad password. Es solo por seguridad. Con delete podemos borrar una propiedad determinada. Se borra la contraseña. No se quiere mantener en session toda la info del usuario. Si interesa el fullname, email
        req.session.userLogged = userToLogin;//session es la parte que nos va a permitir implementar a lo largo de toda nuestra aplicacion la variable session que es objeto literal que va a contener info que yo quiera (se instala express-session. npm install express-session) luego inicializo la sesion en app.js
        if (req.body.remember_user) {//si en el req, en el body vino remember_user, entonces, a linea 59
          res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 2 })//proceso para recordar el usuario. seteo una cookie. En el res voy a setaer una cookie userEmail y lo que va a guardar la cookie es el valor de lo que vino en el body del req que es la propiedad email. Esto va a durar maxAge es para indicar que la cookie dura 1000 milisegundos pero lo multiplica por 60 que son 60 segundos. va a userLoggedMiddleware
        }

        return res.redirect("profile");//si da verdadero, redirigir a /user/profile. o sea, si los datos ingresados son correctos me llevan a userProfile

      }
      return res.render("./users/login", {//cuando no se obtiene nada (undefined)
        errors: {//crear un objeto literal
          email: {//va a tener un error para el email
            msg: 'Las credenciales son inválidas'//el mensaje de error del email
          }
        }
      });
    }

    return res.render("./users/login", {
      errors: {
        email: {
          msg: 'No se encuentra este email en nuestra base de datos'//acá interesa redirigir a una persona a una vista (en este caso userProfile)
        }
      }
    });

  },



  //??????????????????????????????
  edit: (req, res) => {//Sabrina. Es muy parecido al de crear. La diferencia es que como quiero editar una peli tengo que mandar los datos de la peli para que llegue y se autocomplete el formulario
    //const id = req.params.id; Sabrina. Lo comenté porque está guardado en el findByPk de linea 115.
    const userToEdit = users[id - 1];//Sabrina. Esta constante se quitaria?
    db.User.findByPk(req.params.id)//Sabrina. Me guardo el id que me llega por parámetro.
      .then(function (userToEdit) {//Sabrina
        res.render("./users/edit", { userToEdit: userToEdit });
      })
  },

  update: (req, res) => {//???????????????????
    const id = req.params.id;//Sabrina. seria ideal poner el req params aca para validar que no me esta llegando cualquier cosa en lugrar de ponerlo en el where. Sería así: const id = req.params.id; sería la mejor forma de validar el id que nos llega
    users = users.map(user => {
      if (user.id == id) {
        users.firstName = req.body.firstName,
          users.lastName = req.body.lastName,
          users.email = req.body.email,
          users.password = req.body.password,
          users.category = req.body.category,
          users.image = req.file?.filename ?? "default-image.png"
      }
      db.User.update({//Sabrina
        first_name: req.body.firstName,
        last_name: req.body.lastName,
        email: req.body.email,
        password: bcryptjs.hashSync(req.body.password, 10),
        avatar_id: result.avatar_id
      },
        {
          where: {//Sabrina
            id: req.params.id
          }
        })
        .then(function (response) {//Sabrina. si devuelve cero es que no se pudo actualizar y si es un uno se actualizó. El response es para validar lo que llega, si llega el cero valida como false, el uno como true
          if (response)
            return users;
        });
      fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2))
      return res.redirect("usersList" + req.params.id);//sabrina. Agregué el + req.params.id
    })
      .catch(function (err) {//Sabrina
        console.error(err);
      })
  },

  confirmation: (req, res) => {
    res.render("./users/confirmation") //?????
  },

  list: (req, res) => {
    res.render("./users/usersList") //?????
  },


  profile: (req, res) => {
    return res.render("./users/profile", {
      user: req.session.userLogged
    })
  },

  logout: (req, res) => {
    res.clearCookie('userEmail');
    req.session.destroy();
    return res.redirect('/');
  },

  recovery: (req, res) => {
    res.render("./users/passwordRecovery") //?????
  }
}




module.exports = controller;