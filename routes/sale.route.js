const express = require('express');
const router = express.Router();
const {
saleController
} = require('../controller/index');
const validate = require('../middleware/validate');
const { saleValidation } = require('../validation');

router.get('/', validate(saleValidation.getSales), saleController.getSales);
router.get('/summary', validate(saleValidation.getRevenueSummary), saleController.getRevenueSummary);
router.get('/comparison', validate(saleValidation.compareRevenue), saleController.compareRevenue);


module.exports = router;
