const express = require("express");
const router = express.Router();
const confirmationController = require("../controller/confirmationController");

router.get("/",confirmationController.index);

module.exports =router;