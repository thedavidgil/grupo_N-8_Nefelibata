const express = require("express");
const router = express.Router();
const editController = require("../controller/editController");

router.get("/",editController.index);

module.exports = router;