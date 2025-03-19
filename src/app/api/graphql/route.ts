import { NextRequest } from "next/server";
import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";
import { parse } from "graphql";

const prisma = new PrismaClient();

const schemaPath = path.join(
  process.cwd(),
  "src/app/api/graphql/schema.graphql"
);
const schemaString = fs.readFileSync(schemaPath, "utf8");
const typeDefs = parse(schemaString);

const resolvers = {
  Query: {
    products: async (_: any, args: any) => {
      const { sortBy, order, filters, page = 1, pageSize = 10 } = args;

      let orderBy: any = {};
      if (sortBy) {
        orderBy[sortBy.toLowerCase()] = order?.toLowerCase() || "asc";
      }

      const where: any = {};
      if (filters?.minPrice) where.price = { gte: filters.minPrice };
      if (filters?.maxPrice) where.price = { lte: filters.maxPrice };
      if (filters?.discount) where.discount = { gte: filters.discount };
      if (filters?.categoryId) where.categoryId = filters.categoryId;

      if (filters?.colors?.length) {
        where.colors = { hasSome: filters.colors };
      }

      if (filters?.sizes?.length) {
        where.sizes = { hasSome: filters.sizes };
      }

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
        include: { category: true },
      });

      return products.map((product) => ({
        ...product,
        discountedPrice: product.discount
          ? Math.round(product.price * (1 - product.discount / 100))
          : product.price,
      }));
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

const server = new ApolloServer({ typeDefs, resolvers });
const handler = startServerAndCreateNextHandler<NextRequest>(server);

export { handler as GET, handler as POST };
