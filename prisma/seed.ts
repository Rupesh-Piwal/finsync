
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.category.createMany({
    data: [
      { name: "Housing" },
      { name: "Transportation" },
      { name: "Food" },
      { name: "Utilities" },
      { name: "Entertainment" },
      { name: "Healthcare" },
      { name: "Trip" },
      { name: "Savings" },
      { name: "Other" },
    ],
    skipDuplicates: true, 
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
