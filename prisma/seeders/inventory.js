module.exports = async (prisma) =>{
  const proteinPowder = await prisma.product.findFirst({ where: { name: 'Protein Powder' } });
  const bluetoothSpeaker = await prisma.product.findFirst({ where: { name: 'Bluetooth Speaker' } });
  const inventories = [
    {
      productId: proteinPowder.id,
      quantity: 50,
      location: 'Warehouse A',
      lowStockThreshold: 10,
    },
    {
      productId: bluetoothSpeaker.id,
      quantity: 20,
      location: 'Warehouse B',
      lowStockThreshold: 5,
    },
  ];

  for (const inventory of inventories) {
    await prisma.inventory.create({ data: inventory });
  }
}


