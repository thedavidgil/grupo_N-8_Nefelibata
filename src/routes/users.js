// ************ Require's ************
const express = require('express');
const router = express.Router();


// ************ Controller Require ************
const usersController = require('../controller/usersController');

// ************ Middlewares ************
const upload = require("../middlewares/multerMiddleware");
const validation = require("../middlewares/validationRegisterMiddleware");


/** REGISTER USER */
router.get("/register",usersController.register);
router.post("/register",upload.single("userImage"),validation, usersController.store);
router.get("/confirmation", usersController.confirmation);
router.get("/list", usersController.list);

/** EDIT USER */

router.get("/edit/:id",usersController.edit);
router.put("/edit/:id",usersController.update);


/**Loggin */
router.get("/login",usersController.login);


/**RECOVERY USER */
router.get("/recovery",usersController.recovery);



module.exports = router;