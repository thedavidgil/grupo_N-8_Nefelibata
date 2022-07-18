// ************ Require's ************
const express = require('express');
const router = express.Router();


// ************ Controller Require ************
const usersAPIController = require('../../controller/api/usersAPIController');

// ************ Routes ************

/*** GET ALL USERS ***/
router.get('/', usersAPIController.list);
/*** GET ONE USER ***/
router.get('/:id', usersAPIController.detail);

module.exports = router;