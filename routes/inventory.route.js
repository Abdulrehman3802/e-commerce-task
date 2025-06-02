const express = require('express');
const router = express.Router();
const {inventoryController} = require('../controller/index');

router.get('/status', inventoryController.getInventoryStatus);
router.post('/update', inventoryController.updateInventory);

module.exports = router;
