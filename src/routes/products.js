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

// ************ Middlewares ************
const productMiddleware = require("../middlewares/productMiddleware");


/*** GET ALL PRODUCTS ***/
router.get("/", productsController.home);

/** CREATE ONE PRODUCT */
router.get("/create", productMiddleware, productsController.create);

// middleware que valide: 
// Nombre
// ■ Obligatorio.
// ■ Deberá tener al menos 5 caracteres.
// ○ Descripción
// ■ Deberá tener al menos 20 caracteres.
// ○ Imagen
// ■ Deberá ser un archivo válido (JPG, JPEG, PNG, GIF).

router.post("/", upload.single("image"), productsController.store);

/*** GET ONE PRODUCT ***/
router.get('/:id', productsController.detail);


/**EDIT ONE PRODUCT */
router.get("/edit/:id", productsController.edit);
router.put("/edit/:id", upload.single("image"), productMiddleware, productsController.update);

// middleware que valide: 
// Nombre
// ■ Obligatorio.
// ■ Deberá tener al menos 5 caracteres.
// ○ Descripción
// ■ Deberá tener al menos 20 caracteres.
// ○ Imagen
// ■ Deberá ser un archivo válido (JPG, JPEG, PNG, GIF).

/*** DELETE ONE PRODUCT***/
router.get('/delete/:id', productsController.delete);
router.delete('/delete/:id', productsController.destroy);

// middleware opcional


module.exports = router;