// ************ Require's ************
const express = require('express');
const router = express.Router();
const path = require("path");
const multer = require("multer");


// ************ Controller Require ************
const productsController = require('../controller/productsController');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(__dirname, "../../public/images/products"))
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
})

const upload = multer({ storage: storage })


/*** GET ALL PRODUCTS ***/
router.get("/", productsController.home);


/*** GET ONE PRODUCT ***/
router.get('/:id', productsController.detail);

/** CREATE ONE PRODUCT */
router.get("/create", productsController.create);
router.post("/", upload.single("image"), productsController.store);


/**EDIT ONE PRODUCT */
router.get("/edit/:id", productsController.edit);
router.put("/edit/:id", upload.single("image"),productsController.update);

/*** DELETE ONE PRODUCT***/
router.delete('/delete/:id', productsController.destroy);


module.exports = router;