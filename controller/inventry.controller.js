const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get all inventory items
exports.getInventory = async (req, res) => {
  try {
    const inventory = await prisma.inventory.findMany({
      include: {
        product: true,
      },
    });
    res.status(200).json(inventory);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve inventory.' });
  }
};

// Add a new inventory item
exports.addInventory = async (req, res) => {
  const { productId, quantity, location, lowStockThreshold } = req.body;
  try {
    const newInventory = await prisma.inventory.create({
      data: {
        productId,
        quantity,
        location,
        lowStockThreshold,
      },
    });
    res.status(201).json(newInventory);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add inventory.' });
  }
};

// Update an existing inventory item
exports.updateInventory = async (req, res) => {
  const { id } = req.params;
  const { quantity, location, lowStockThreshold } = req.body;
  try {
    const updatedInventory = await prisma.inventory.update({
      where: { id: parseInt(id) },
      data: {
        quantity,
        location,
        lowStockThreshold,
      },
    });
    res.status(200).json(updatedInventory);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update inventory.' });
  }
};

// Delete an inventory item
exports.deleteInventory = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.inventory.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete inventory.' });
  }
};
