const express = require('express');
const router = express.Router();
const reportController = require('./reportController');

router.get('/year/:year', reportController.report);
module.exports = router;