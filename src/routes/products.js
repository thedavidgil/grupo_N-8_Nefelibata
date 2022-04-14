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
router.get("/edit/:id",productsController.edit);//Formulario de edicion de productos


module.exports = router;