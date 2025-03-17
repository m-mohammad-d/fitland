const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  const categories = await prisma.category.createMany({
    data: [{ name: "T-Shirts" }, { name: "Shoes" }, { name: "Accessories" }],
  });

  console.log("✅ Categories seeded");

  const tShirtCategory = await prisma.category.findUnique({
    where: { name: "T-Shirts" },
  });
  const shoesCategory = await prisma.category.findUnique({
    where: { name: "Shoes" },
  });

  if (tShirtCategory && shoesCategory) {
    const products = await prisma.product.createMany({
      data: [
        {
          name: "Nike Running Shoes",
          description: "Comfortable running shoes",
          price: 120,
          stock: 50,
          categoryId: shoesCategory.id,
          images: ["nike1.jpg", "nike2.jpg"],
          colors: ["Black", "White"],
          sizes: ["40", "41", "42"],
          discountCode: "SALE20",
        },
        {
          name: "Adidas T-Shirt",
          description: "Breathable cotton t-shirt",
          price: 35,
          stock: 100,
          categoryId: tShirtCategory.id,
          images: ["adidas1.jpg"],
          colors: ["Blue", "Red"],
          sizes: ["M", "L", "XL"],
          discountCode: null,
        },
      ],
    });

    console.log("✅ Products seeded:", products);
  }

  console.log("🎉 Seeding completed!");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
