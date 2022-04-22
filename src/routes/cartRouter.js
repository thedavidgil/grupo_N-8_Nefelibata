// ************ Require's ************
const express = require('express');
const router = express.Router();
const path = require("path");

// ************ Controller Require ************
const cartController = require('../controller/cartController');

router.get("/", cartController.cart);

module.exports = router;