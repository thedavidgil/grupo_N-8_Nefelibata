const express = require("express");
const router = express.Router();
const recoveryController = require("../controller/recoveryController");

router.get("/",recoveryController.index);

module.exports =router;