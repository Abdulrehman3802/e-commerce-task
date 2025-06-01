const express = require('express');
const router = express.Router();
const {
saleController
} = require('../controller/index');

router.get('/', saleController.getSales);
router.get('/summary', saleController.getRevenueSummary);
router.get('/comparison', saleController.compareRevenue);

module.exports = router;
