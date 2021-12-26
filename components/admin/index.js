const express = require('express');
const router = express.Router();
const pageController = require('./mainPageController');


router.get('/', pageController.showInfo);


module.exports = router;