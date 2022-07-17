// ************ Require's ************
const express = require('express');
const router = express.Router();


// ************ Controller Require ************
const usersAPIController = require('../../controller/api/usersAPIController');

// ************ Routes ************

/*** GET ALL PRODUCTS ***/
router.get('/', usersAPIController.list);
/*** GET ONE PRODUCT ***/
router.get('/:id', usersAPIController.detail);

module.exports = router;