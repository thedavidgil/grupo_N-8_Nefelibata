// ************ Require's ************
const express = require('express');
const router = express.Router();


// ************ Controller Require ************
const productsController = require('../controller/productsController');

// ************ Middlewares ************
const upload = require("../middlewares/multerMiddleware");


// ************ Middlewares ************
const productMiddleware = require("../middlewares/productMiddleware");


/*** GET ALL PRODUCTS ***/
router.get("/", productsController.home);//OK

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

router.post("/store", upload.single("image"), productsController.store);//OK? FALTAN LAS VALIDACIONES

/*** GET ONE PRODUCT ***/
router.get('/:id', productsController.detail);//OK

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
router.get('/delete/:id', productsController.delete);//OK
router.delete('/delete/:id', productsController.destroy);//OK

// middleware opcional


module.exports = router;