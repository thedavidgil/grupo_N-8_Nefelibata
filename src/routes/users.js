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
router.get("/register", guestMiddleware, usersController.register);
router.post("/register",upload.single("userImage"),validation, usersController.processRegister);
router.get("/confirmation", usersController.confirmation);
router.get("/list", usersController.list);

/** EDIT USER */

router.get("/edit/:id",usersController.edit);
router.put("/edit/:id",usersController.update);


/**Loggin */
router.get("/login", guestMiddleware, usersController.login);
router.post("/login", usersController.loginProcess);

/**profile Perfil de usuario*/
router.get("/profile", authMiddleware, usersController.profile)

/**Logout Perfil de usuario*/
router.get("/logout", usersController.logout)

/**Procesar el login */
router.post("/login",usersController.loginProcess);//Sabrina. Ruta 

/**Perfil del usuario */
router.get("/profile/",authMiddleware, usersController.profile);//no hay posibilidad de entrar al profile si no tengo a alguien en session. Crea un middleware que haga lo contrario de registro y de login, crea el authMiddleware

/**Logout */
router.get("/logout/", usersController.logout);//metodo logout. Puede ir por post pero lo hace por get(no explica por que usa get y no post). No necesita un middleware en este caso. Se va a generar un metodo al controller en userController

/**RECOVERY USER */
router.get("/recovery",usersController.recovery);



module.exports = router;