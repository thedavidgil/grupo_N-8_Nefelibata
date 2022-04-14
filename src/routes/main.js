// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const mainController = require('../controller/mainController');

router.get('/', mainController.index); 
router.get("/contact", mainController.contact);

module.exports = router;