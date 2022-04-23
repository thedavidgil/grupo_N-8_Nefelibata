// ************ Require's ************
const express = require('express');
const router = express.Router();
const multer = require("multer");



// ************ Controller Require ************
const usersController = require('../controller/usersController');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(__dirname, "../../public/images"))
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
})

const upload = multer({ storage: storage })



/** REGISTER USER */
router.get("/register",usersController.register);
router.post("/register", upload.single("images"), usersController.create);
router.get("/confirmation", usersController.confirmation);
router.get("/list", usersController.list);

/** EDIT USER */

router.get("/edit/:idUser",usersController.edit);
//router.put("/edit/:idUser",usersController.edit2);


/**Loggin */
router.get("/login",usersController.login);


/**RECOVERY USER */
router.get("/recovery",usersController.recovery);



module.exports = router;