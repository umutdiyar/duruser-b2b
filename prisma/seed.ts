import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
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

  const products = await Promise.all([
    prisma.product.create({
      data: {
        name: "Karışık Sandviç",
        price: 120,
      },
    }),
    prisma.product.create({
      data: {
        name: "Tavuk Wrap",
        price: 140,
      },
    }),
    prisma.product.create({
      data: {
        name: "Sezar Salata",
        price: 110,
      },
    }),
  ]);

  console.log({ company, products });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
