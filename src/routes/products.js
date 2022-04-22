// ************ Require's ************
const express = require('express');
const router = express.Router();
const path = require("path");
const multer = require("multer");


// ************ Controller Require ************
const productsController = require('../controller/productsController');

<<<<<<< HEAD
=======


>>>>>>> feb5d6858997de6775363d34a7b537a48f0dd9c9
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(__dirname, "../../public/image"))
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
})

const upload = multer({ storage: storage })


/*** GET ALL PRODUCTS ***/
router.get("/", productsController.home);//muestra la vista principal que es home. Apunta a / que es products. productsController (el archivo) retorna la vista de home


/*** GET ONE PRODUCT ***/
<<<<<<< HEAD
router.get('/:id/', productsController.detail);//obtener el detalle de un producto. Es una vista. De los productos llega un id y busco el producto con ese id
=======
router.get("/detail", productsController.detail);//obtener el detalle de un producto. Se muestra una vista. De los productos llega un id y busco el producto con ese id
>>>>>>> feb5d6858997de6775363d34a7b537a48f0dd9c9


/** CREATE ONE PRODUCT */
router.get("/create", productsController.create); //muestra el formulario de creacion de un producto. para ver una vista
router.post("/", upload.single("image"), productsController.store); //sabrina - Middleware de Multer. Recibe la información del formulario y debe hacer algo. procesa la info del formulario y la deberia guardar en la BD. como crea un nuevo producto se usa POST


/**EDIT ONE PRODUCT */
router.get("/edit/:id", productsController.edit);// Similar al de crear. Ruta que muestra el formulario de edicion de productos
router.put("/edit/:id", productsController.update); //sabrina. La ruta que procesa la información que llega del formulario. Acá se modifica un dato

/*** DELETE ONE PRODUCT***/ 
router.delete('/delete/:id', productsController.destroy);


module.exports = router;