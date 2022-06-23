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
router.get("/confirmation", usersController.confirmation);//??????????????????
router.get("/list", usersController.list);//?????????????????????

/** EDIT USER */

router.get("/edit/:id",usersController.edit);//???????????????
router.put("/edit/:id",usersController.update);//??????????????????middleware opcional


/**Loggin */
router.get("/login", guestMiddleware, usersController.login);
router.post("/login", usersController.loginProcess);//middleware opcional

/**profile Perfil de usuario*/
router.get("/profile", authMiddleware, usersController.profile)

/**Logout Perfil de usuario*/
router.get("/logout", usersController.logout)

/**RECOVERY USER */
router.get("/recovery",usersController.recovery);//???????????????



module.exports = router;