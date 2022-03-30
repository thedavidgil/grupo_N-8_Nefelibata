const express = require("express");
const router = express.Router();
const createController = require("../controller/createController");

router.get("/",createController.index);

module.exports = router;
