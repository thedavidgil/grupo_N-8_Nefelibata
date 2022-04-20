// ************ Require's ************
const express = require('express');
const router = express.Router();



// ************ Controller Require ************
const usersController = require('../controller/usersController');


/** REGISTER USER */
router.get("/register",usersController.register);
router.get("/confirmation", usersController.confirmation);


/**Loggin */
router.get("/login",usersController.login);


/**RECOVERY USER */
router.get("/recovery",usersController.recovery);



module.exports = router;