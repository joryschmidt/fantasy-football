var express = require('express');
var router = express.Router();
var statsController = require('../controllers/stats.controller');

router.get('/', statsController.getStats);

module.exports = router;