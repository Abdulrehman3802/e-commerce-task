module.exports = async (prisma) => {
  const categories = await prisma.category.findMany();
  const electronics = categories.find(c => c.name === 'Electronics');
  const fitness = categories.find(c => c.name === 'Fitness');
  const home = categories.find(c => c.name === 'Home Appliances');

  await prisma.product.createMany({
    data: [
      { name: 'Bluetooth Speaker', price: 49.99, categoryId: electronics.id },
      { name: 'LED Monitor', price: 129.99, categoryId: electronics.id },
      { name: 'Yoga Mat', price: 19.99, categoryId: fitness.id },
      { name: 'Protein Powder', price: 39.99, categoryId: fitness.id },
      { name: 'Coffee Maker', price: 89.99, categoryId: home.id },
    ],
  });
};
