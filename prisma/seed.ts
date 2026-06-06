import "dotenv/config";

import bcrypt from "bcryptjs";

import { PrismaClient } from "../src/generated/prisma";
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
      slug: "musteri-firma",
    },

    update: {},

    create: {
      name: "Musteri Firmasi",
      slug: "musteri-firma",
    },
  });

  console.log("Company created");

  // PRODUCTS

  const products = [
    {
      name: "al'bi Kavurmalı Karışık Tost",
      description:
        "Tercihe göre focaccia ekmeği ve ya ciabatta ekmeği içinde, kavurma, suda mozerella peyniri, domates ve biber ile...",
      price: 420,
      imageUrl:
        "https://durusergida.com/storage/media/97/conversions/ubap7375-crop.JPG",
    },

    {
      name: "al'bi RoastBeef Sandviç",
      description:
        "Panini ekmek içinde roastbeef, kaşar peyniri ve özel üretim sosumuz ile...",
      price: 680,
      imageUrl:
        "https://durusergida.com/storage/media/73/conversions/ubap7369-crop.JPG",
    },

    {
      name: "al'bi Pesto Soslu Mozerella Sandviç",
      description:
        "Tercihe göre focaccia ekmeği ve ya ciabatta ekmeği içinde, suda mozerella peyniri, pesto sos ve kuru domates ile...",
      price: 540,
      imageUrl:
        "https://durusergida.com/storage/media/98/conversions/ubap7411-crop.JPG",
    },

    {
      name: "al'bi Atom Sandviç",
      description:
        "Panini ekmeği içinde, kaşar peyniri, çıtır kapya ve meksika biberli atom sos ile...",
      price: 890,
      imageUrl:
        "https://durusergida.com/storage/media/102/conversions/ubap7382-crop.JPG",
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
      email: "customer@duruser.com",
    },

    update: {},

    create: {
      name: "Musteri Firmasi",

      email: "customer@duruser.com",

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
