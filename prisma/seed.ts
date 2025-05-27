const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 در حال افزودن داده‌ها به دیتابیس...");

  await prisma.category.createMany({
    data: [{ name: "تی‌شرت" }, { name: "کفش" }, { name: "اکسسوری" }, { name: "هودی" }, { name: "شلوار ورزشی" }],
  });

  console.log("✅ دسته‌بندی‌ها اضافه شدند.");

  const categories = await prisma.category.findMany();
  const getCategory = (name: string) => {
    const category = categories.find((c: { name: string }) => c.name === name);
    if (!category) {
      throw new Error(`❌ دسته‌بندی ${name} پیدا نشد!`);
    }
    return category.id;
  };

  await prisma.product.createMany({
    data: [
      {
        name: "کفش دویدن نایک",
        description: "کفش سبک و مناسب برای دویدن",
        price: 1200000,
        discount: 16.67,
        stock: 20,
        categoryId: getCategory("کفش"),
        images: ["nike_run_1.jpg", "nike_run_2.jpg"],
        colors: [
          { name: "مشکی", hex: "#000000" },
          { name: "سفید", hex: "#FFFFFF" },
        ],
        sizes: ["40", "41", "42"],
        discountCode: "SALE20",
      },
      {
        name: "تی‌شرت ورزشی آدیداس",
        description: "تی‌شرت نخی و قابل تنفس",
        price: 350000,
        discount: 20,
        stock: 50,
        categoryId: getCategory("تی‌شرت"),
        images: ["adidas_tshirt.jpg"],
        colors: [
          { name: "آبی", hex: "#0000FF" },
          { name: "قرمز", hex: "#FF0000" },
        ],
        sizes: ["M", "L", "XL"],
        discountCode: "ADIDAS20",
      },
      {
        name: "هودی اسپرت نایک",
        description: "هودی گرم و مناسب برای زمستان",
        price: 800000,
        discount: 0,
        stock: 30,
        categoryId: getCategory("هودی"),
        images: ["nike_hoodie.jpg"],
        colors: [
          { name: "خاکستری", hex: "#808080" },
          { name: "مشکی", hex: "#000000" },
        ],
        sizes: ["M", "L"],
      },
      {
        name: "ساعت هوشمند شیائومی",
        description: "ساعت هوشمند با قابلیت نمایش ضربان قلب",
        price: 2000000,
        discount: 10,
        stock: 15,
        categoryId: getCategory("اکسسوری"),
        images: ["xiaomi_watch.jpg"],
        colors: [{ name: "مشکی", hex: "#000000" }],
        discountCode: "TECH10",
      },
      {
        name: "کفش فوتبال آدیداس",
        description: "کفش مخصوص چمن مصنوعی",
        price: 1500000,
        discount: 0,
        stock: 10,
        categoryId: getCategory("کفش"),
        images: ["adidas_football.jpg"],
        colors: [
          { name: "آبی", hex: "#0000FF" },
          { name: "سبز", hex: "#008000" },
        ],
        sizes: ["42", "43"],
      },
      {
        name: "شلوار ورزشی پوما",
        description: "شلوار سبک و مناسب برای ورزش",
        price: 600000,
        discount: 10,
        stock: 25,
        categoryId: getCategory("شلوار ورزشی"),
        images: ["puma_pants.jpg"],
        colors: [
          { name: "مشکی", hex: "#000000" },
          { name: "سرمه‌ای", hex: "#191970" },
        ],
        sizes: ["L", "XL"],
        discountCode: "PUMA10",
      },
      {
        name: "کلاه بیسبال نیویورک یانکیز",
        description: "کلاه با طراحی خاص و مناسب برای استفاده روزمره",
        price: 300000,
        discount: 10,
        stock: 40,
        categoryId: getCategory("اکسسوری"),
        images: ["yankees_cap.jpg"],
        colors: [
          { name: "مشکی", hex: "#000000" },
          { name: "سفید", hex: "#FFFFFF" },
        ],
        discountCode: "CAP10",
      },
    ],
  });

  console.log("✅ محصولات با موفقیت اضافه شدند.");
  console.log("🎉 عملیات seeding تکمیل شد!");
}

main()
  .catch((e) => {
    console.error("❌ خطا در seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
