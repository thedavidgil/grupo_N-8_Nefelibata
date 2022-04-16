// ************ Require's ************
const express = require('express');
const router = express.Router();



// ************ Controller Require ************
const productsController = require('../controller/productsController');


/*** GET ALL PRODUCTS ***/ 
router.get("/",productsController.index);


/** CART **/
router.get("/cart",productsController.cart);


/*** GET ONE PRODUCT ***/ 
router.get("/detail",productsController.detail);


/** CREATE ONE PRODUCT */
router.get("/create",productsController.create);


/**EDIT ONE PRODUCT */
router.get("/edit/:id",productsController.edit);//Muestra formulario de edicion de productos
router.put('/edit/:id', productsController.update);

/*** DELETE ONE PRODUCT***/ 
router.delete('/delete/:id', productsController.destroy);// Elimina producto de la base de datos


module.exports = router;