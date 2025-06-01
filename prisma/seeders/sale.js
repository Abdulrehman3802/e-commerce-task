module.exports = async (prisma) => {
  const products = await prisma.product.findMany();

  await prisma.sale.createMany({
    data: [
      { productId: products[0].id, quantity: 2, totalPrice: 99.98, saleDate: new Date('2025-05-01') },
      { productId: products[0].id, quantity: 1, totalPrice: 49.99, saleDate: new Date('2025-05-02') },
      { productId: products[1].id, quantity: 1, totalPrice: 129.99, saleDate: new Date('2025-05-01') },
      { productId: products[2].id, quantity: 3, totalPrice: 59.97, saleDate: new Date('2025-05-03') },
      { productId: products[3].id, quantity: 2, totalPrice: 79.98, saleDate: new Date('2025-05-04') },
      { productId: products[4].id, quantity: 1, totalPrice: 89.99, saleDate: new Date('2025-05-05') },
    ],
  });
};
