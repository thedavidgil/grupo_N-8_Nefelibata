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
router.post("/create", upload.single("image"), productsController.store);//OK? FALTAN LAS VALIDACIONES

/*** GET ONE PRODUCT ***/
router.get('/:id', productsController.detail);//OK

/**EDIT ONE PRODUCT */
router.get("/edit/:id", productsController.edit);
router.put("/edit/:id", upload.single("image"), productMiddleware, productsController.update);

/*** DELETE ONE PRODUCT***/
router.get('/delete/:id', productsController.delete);//OK
router.delete('/delete/:id', productsController.destroy);//OK

// middleware opcional


module.exports = router;