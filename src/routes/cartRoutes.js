const express = require("express");
const router = express.Router();
const cartController = require("../controller/cartController");

router.get("/",cartController.index);

module.exports =router;