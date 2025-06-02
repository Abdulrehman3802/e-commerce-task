const prisma = require('../prisma/client');
const apiResponse  = require('../utils/apiResponse');
const { status } = require("http-status");
exports.getInventoryStatus = async (req, res) => {
  try {
    const inventoryItems = await prisma.inventory.findMany({
      include: {
        product: true,
      },
    });

    const inventoryStatus = inventoryItems.map((item) => ({
      productId: item.productId,
      productName: item.product.name,
      quantity: item.quantity,
      lowStockThreshold: item.lowStockThreshold,
      isLowStock: item.quantity < item.lowStockThreshold,
      location: item.location,
    }));
    return apiResponse.success(
      res,
      inventoryStatus,
      'Inventory status retrieved successfully',
      status.OK,
    );
  } catch (error) {
    console.error('Error retrieving inventory status:', error);
    return apiResponse.error(
      res,
      'Failed to retrieve inventory status',
      status.INTERNAL_SERVER_ERROR
    );
  }
};

exports.updateInventory = async (req, res) => {
  const { productId, quantityChange, changeType, userId } = req.body;

  try {
    const inventory = await prisma.inventory.findUnique({
      where: { productId },
    });

    if (!inventory) {
      return apiResponse.error(
        res,
        'Inventory record not found',
        status.NOT_FOUND,
      );
    }

    const newQuantity = inventory.quantity + quantityChange;

    if (newQuantity < 0) {
      return apiResponse.error(
        res,
        'Insufficient inventory quantity',
        status.BAD_REQUEST,
      );
    }

    const updatedInventory = await prisma.inventory.update({
      where: { productId },
      data: { quantity: newQuantity },
    });

    await prisma.inventoryLog.create({
      data: {
        inventoryId: updatedInventory.id,
        changeType,
        quantityChanged: quantityChange,
        userId,
      },
    });
    return apiResponse.success(
      res,
      updatedInventory,
      'Inventory updated successfully',
      status.OK,
    );
  } catch (error) {
    console.error('Error updating inventory:', error);
    return apiResponse.error(
      res,
      'Failed to update inventory',
      status.INTERNAL_SERVER_ERROR,
    );
  }
};
