var express = require('express');
var router = express.Router();
var scrapeController = require('../controllers/scrape.controller');

router.get('/', scrapeController.getStats);

module.exports = router;