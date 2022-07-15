// ************ Require's ************
const express = require('express');
const router = express.Router();


// ************ Controller Require ************
const usersController = require('../controller/usersController');

// ************ Middlewares ************
const upload = require("../middlewares/multerMiddleware");
const validation = require("../middlewares/validationRegisterMiddleware");
const guestMiddleware = require("../middlewares/guestMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");


/** REGISTER USER */
router.get("/register", guestMiddleware, usersController.register);//OK? DEJAR EL CATEGORIA DE USUARIO COMO CLIENTE POR DEFECTO
router.post("/register", upload.single("avatar"),validation,usersController.processRegister);//OK

/** EDIT USER AND SHOW ALL USERS TO EDIT */
router.get("/edit/:id",usersController.edit);//OK
router.put("/edit/:id",upload.single("avatar"),usersController.update);//OK? (falta agregar validaciones)

/**SHOW ALL USERS */
router.get("/usersList",usersController.list)//HACER CRUD CON BASE DE DATOS, AGREGAR MIDDLEWARE PARA QUE SOLO ADMIN TENGA ACCESO

/**Login */
router.get("/login", guestMiddleware, usersController.login);//OK
router.post("/login", usersController.loginProcess);//OK

/**Perfil de usuario*/
router.get("/profile", authMiddleware, usersController.profile)//FALTA REVISAR VER SESSION

/**Logout Perfil de usuario*/
router.get("/logout", usersController.logout)//FALTA REVISAR VER SESSION

/**RECOVERY USER */
router.get("/recovery",usersController.recovery);//FALTA REVISAR VER SESSION



module.exports = router;