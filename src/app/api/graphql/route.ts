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
    products: async () =>
      await prisma.product.findMany({ include: { comments: true , category : true } }),
    product: async (_: any, { id }: { id: string }) =>
      await prisma.product.findUnique({
        where: { id },
        include: { comments: true, category: true },
      }),
  },
  Mutation: {
    addProduct: async (_: any, args: any) =>
      await prisma.product.create({
        data: {
          name: args.name,
          description: args.description,
          price: args.price,
          stock: args.stock,
          categoryId: args.categoryId,
          images: args.images,
          colors: args.colors,
          sizes: args.sizes,
          discountCode: args.discountCode || null,
        },
      }),

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

const server = new ApolloServer({ typeDefs, resolvers });
const handler = startServerAndCreateNextHandler<NextRequest>(server);

export { handler as GET, handler as POST };
