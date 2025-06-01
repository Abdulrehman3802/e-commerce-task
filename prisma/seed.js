const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const seedInventory = require('./seeders/inventory')(prisma);
const seedCategory = require('./seeders/category')(prisma);
const seedProduct = require('./seeders/product')(prisma);
const seedSale = require('./seeders/sale')(prisma);
async function main() {
    await seedCategory();
    await seedProduct();
    await seedInventory();
    await seedSale();
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
