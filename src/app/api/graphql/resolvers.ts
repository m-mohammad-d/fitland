import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const resolvers = {
  Query: {
    products: async (_: any, args: any) => {
      const { sortBy, filters, page = 1, pageSize = 10 } = args;

      let orderBy: any = {};
      if (sortBy) {
        const isDescending = sortBy.endsWith("Desc");
        const column = isDescending ? sortBy.replace("Desc", "") : sortBy;

        orderBy[column] = isDescending ? "desc" : "asc";
      }

      const where: any = {};

      if (filters?.minPrice !== undefined)
        where.price = { gte: filters.minPrice };
      if (filters?.maxPrice !== undefined)
        where.price = { ...where.price, lte: filters.maxPrice };

      if (filters?.discount) where.discount = { gte: filters.discount };

      if (filters?.category?.length)
        where.categoryId = { in: filters.category };

      if (filters?.brand?.length) where.brand = { in: filters.brand };
      if (filters?.colors?.length) {
        where.OR = filters.colors.map((color: { name: string }) => ({
          colors: {
            array_contains: [{ name: color }],
          },
        }));
      }

      if (filters?.sizes?.length) where.sizes = { hasSome: filters.sizes };

      if (filters?.availableOnly) where.stock = { gt: 0 };

      if (filters?.search) {
        where.OR = [
          { name: { contains: filters.search, mode: "insensitive" } },
          { description: { contains: filters.search, mode: "insensitive" } },
        ];
      }

      const skip = (page - 1) * pageSize;
      const take = pageSize;
      const products = await prisma.product.findMany({
        where,
        orderBy,
        skip,
        take,
        include: {
          category: true,
        },
      });
      return products;
    },

    categories: async () => {
      return await prisma.category.findMany();
    },
    product: async (_: any, { id }: { id: string }) => {
      const product = await prisma.product.findUnique({
        where: { id },
        include: { comments: true, category: true },
      });

      if (!product) return null;

      return {
        ...product,
        discountedPrice: product.discount
          ? Math.round(product.price * (1 - product.discount / 100))
          : product.price,
      };
    },
  },

  Mutation: {
    addProduct: async (_: any, args: any) => {
      const discountedPrice =
        args.discount && args.discount > 0
          ? Math.round(args.price * (1 - args.discount / 100))
          : null;

      return await prisma.product.create({
        data: {
          name: args.name,
          description: args.description,
          price: args.price,
          stock: args.stock,
          categoryId: args.categoryId,
          images: args.images,
          colors: args.colors,
          sizes: args.sizes,
          discount: args.discount || 0,
          discountCode: args.discountCode || null,
          discountedPrice,
        },
      });
    },
    addComment: async (_: any, args: any) =>
      await prisma.comment.create({
        data: {
          content: args.content,
          rating: args.rating,
          productId: args.productId,
        },
      }),

    addCategory: async (_: any, args: any) =>
      await prisma.category.create({
        data: {
          name: args.name,
        },
      }),
  },
};

export default resolvers;
