const express = require('express');
const router = express.Router();
const {inventoryController} = require('../controller/index');
const validate = require('../middleware/validate');
const { inventoryValidation } = require('../validation');

router.get('/status', inventoryController.getInventoryStatus);
router.patch('/update', validate(inventoryValidation.updateInventory), inventoryController.updateInventory);


module.exports = router;
