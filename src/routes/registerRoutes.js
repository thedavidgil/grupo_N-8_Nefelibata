const express = require("express");
const router = express.Router();
const registerController = require("../controller/registerController");

router.get("/",registerController.index);

module.exports =router;