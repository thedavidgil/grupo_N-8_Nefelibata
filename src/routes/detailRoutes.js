const express = require("express");
const router = express.Router();
const detailController = require("../controller/detailController");

router.get("/",detailController.index);

module.exports =router;