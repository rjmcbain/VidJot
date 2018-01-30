const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const {ensureAuthenticated} = require('../helpers/auth');
const controllers = require("../controllers/controllers");

router.get('/beerList', controllers.beerList);

module.exports = router;