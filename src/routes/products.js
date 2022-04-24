// ************ Require's ************
const express = require('express');
const router = express.Router();
const path = require("path");
const multer = require("multer");


// ************ Controller Require ************
const productsController = require('../controller/productsController');

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


/*** GET ALL PRODUCTS ***/
router.get("/", productsController.home);


/*** GET ONE PRODUCT ***/
<<<<<<< HEAD
router.get('/:id', productsController.detail);//obtener el detalle de un producto. Es una vista. De los productos llega un id y busco el producto con ese id
=======
router.get('/:id/', productsController.detail);
>>>>>>> 9f48160a429e26892575ad98ba8a62c2a6735154


/** CREATE ONE PRODUCT */
router.get("/create", productsController.create);
router.post("/", upload.single("image"), productsController.store);


/**EDIT ONE PRODUCT */
router.get("/edit/:id", productsController.edit);
router.put("/edit/:id", productsController.update);

/*** DELETE ONE PRODUCT***/
router.delete('/delete/:id', productsController.destroy);


module.exports = router;