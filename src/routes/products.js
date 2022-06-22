// ************ Require's ************
const express = require('express');
const router = express.Router();


// ************ Controller Require ************
const productsController = require('../controller/productsController');

// ************ Middlewares ************
const upload = require("../middlewares/multerMiddleware");



/*** GET ALL PRODUCTS ***/
router.get("/", productsController.home);//OK

/** CREATE ONE PRODUCT */
router.get("/create", productsController.create);//OK? BUSCAR TODAS LAS CATEGORIAS DE LA BD
router.post("/store", upload.single("image"), productsController.store);//OK? FALTAN LAS VALIDACIONES

/*** GET ONE PRODUCT ***/
router.get('/:id', productsController.detail);//OK

/**EDIT ONE PRODUCT */
router.get("/edit/:id", productsController.edit);//OK
router.put("/edit/:id", upload.single("image"),productsController.update);

/*** DELETE ONE PRODUCT***/
router.get('/delete/:id', productsController.delete);
router.delete('/delete/:id', productsController.destroy);



module.exports = router;