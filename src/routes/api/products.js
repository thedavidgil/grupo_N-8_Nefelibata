// ************ Require's ************
const express = require('express');
const router = express.Router();


// ************ Controller Require ************
const productsAPIController = require('../../controller/api/productsAPIController');

// ************ Routes ************

/*** GET ALL PRODUCTS ***/
router.get('/', productsAPIController.list);
/*** GET ONE PRODUCT ***/
router.get('/:id', productsAPIController.detail);

module.exports = router;