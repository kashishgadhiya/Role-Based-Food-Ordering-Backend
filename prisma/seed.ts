import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.user.createMany({
    data: [
      { id: '1', name: 'Nick Fury', email: 'nick@shield.com', role: 'ADMIN', country: 'ALL' },
      { id: '2', name: 'Captain Marvel', email: 'carol@shield.com', role: 'MANAGER', country: 'INDIA' },
      { id: '3', name: 'Captain America', email: 'steve@shield.com', role: 'MANAGER', country: 'AMERICA' },
      { id: '4', name: 'Thanos', email: 'thanos@shield.com', role: 'MEMBER', country: 'INDIA' },
      { id: '5', name: 'Thor', email: 'thor@shield.com', role: 'MEMBER', country: 'INDIA' },
      { id: '6', name: 'Travis', email: 'travis@shield.com', role: 'MEMBER', country: 'AMERICA' },
    ],
  });

  const indRest = await prisma.restaurant.create({
    data: {
      id: 'r1',
      name: 'Delhi Darbar',
      country: 'INDIA',
      menuItems: {
        create: [
          { name: 'Butter Chicken', price: 15.0 },
          { name: 'Palak Paneer', price: 12.0 },
        ],
      },
    },
  });

  const usaRest = await prisma.restaurant.create({
    data: {
      id: 'r2',
      name: 'Burger King',
      country: 'AMERICA',
      menuItems: {
        create: [
          { name: 'Whopper', price: 8.0 },
          { name: 'Fries', price: 4.0 },
        ],
      },
    },
  });

  console.log('Database seeded!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
