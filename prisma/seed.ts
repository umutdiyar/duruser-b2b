import "dotenv/config";

import bcrypt from "bcryptjs";

import { PrismaClient } from "../src/generated/prisma/client";

import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  console.log("Seeding started...");

  const hashedPassword = await bcrypt.hash("123456", 10);

  // COMPANY

  const company = await prisma.company.upsert({
    where: {
      slug: "abc-market",
    },

    update: {},

    create: {
      name: "ABC Market",
      slug: "abc-market",
    },
  });

  console.log("Company created");

  // PRODUCTS

  const products = [
    {
      name: "Karışık Sandviç",
      price: 120,
    },

    {
      name: "Tavuk Wrap",
      price: 140,
    },

    {
      name: "Sezar Salata",
      price: 110,
    },
  ];

  for (const product of products) {
    await prisma.product.create({
      data: product,
    });
  }

  console.log("Products created");

  // ADMIN USER

  await prisma.user.upsert({
    where: {
      email: "admin@duruser.com",
    },

    update: {},

    create: {
      name: "DuruSer Admin",

      email: "admin@duruser.com",

      password: hashedPassword,

      role: "ADMIN",
    },
  });

  console.log("Admin user created");

  // CUSTOMER USER

  await prisma.user.upsert({
    where: {
      email: "customer@abcmarket.com",
    },

    update: {},

    create: {
      name: "ABC Market",

      email: "customer@abcmarket.com",

      password: hashedPassword,

      role: "CUSTOMER",

      companyId: company.id,
    },
  });

  console.log("Customer user created");

  console.log("Seed completed");
}

main()
  .catch((error) => {
    console.error(error);

    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
