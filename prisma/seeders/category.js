module.exports = async (prisma) => {
  await prisma.category.createMany({
    data: [
      { name: 'Electronics' },
      { name: 'Fitness' },
      { name: 'Home Appliances' },
    ],
  });
};
