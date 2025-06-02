const prisma = require('../prisma/client'); 
const seedCategory = require('./seeders/category');
const seedProduct = require('./seeders/product');
const seedInventory = require('./seeders/inventory');
const seedSale = require('./seeders/sale');

async function main() {
  await seedCategory(prisma);
  await seedProduct(prisma);
  await seedInventory(prisma);
  await seedSale(prisma);
}
main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
