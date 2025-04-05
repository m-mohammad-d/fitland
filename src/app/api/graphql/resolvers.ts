import { Prisma, PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
type Filters = {
  minPrice?: number;
  maxPrice?: number;
  discount?: number;
  category?: string[];
  brand?: string[];
  colors?: { name: string }[];
  sizes?: string[];
  availableOnly?: boolean;
  search?: string;
};

type Args = {
  sortBy?: string;
  filters?: Filters;
  page?: number;
  pageSize?: number;
};
type AddProductArgs = {
  name: string;
  description: string;
  price: number;
  stock: number;
  categoryId: string;
  images: string[];
  colors: { name: string }[];
  sizes: string[];
  discount?: number;
  discountCode?: string | null;
};
type AddCommentArgs = {
  content: string;
  rating: number;
  productId: string;
};
type AddCategoryArgs = {
  name: string;
};
const prisma = new PrismaClient();
const SECRET_KEY = process.env.JWT_SECRET!;
const resolvers = {
  Query: {
    products: async (_: void, args: Args) => {
      const { sortBy, filters, page = 1, pageSize = 10 } = args;

      let orderBy: Record<string, "asc" | "desc"> = {};
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
            array_contains: [{ name: color.name }],
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
    product: async (_: void, { id }: { id: string }) => {
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
    addProduct: async (_: void, args: AddProductArgs) => {
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
    addComment: async (_: void, args: AddCommentArgs) =>
      await prisma.comment.create({
        data: {
          content: args.content,
          rating: args.rating,
          productId: args.productId,
        },
      }),

    addCategory: async (_: void, args: AddCategoryArgs) => {
      return await prisma.category.create({
        data: {
          name: args.name,
        },
      });
    },
    signUp: async (
      _: void,
      {
        email,
        password,
        name,
      }: { email: string; password: string; name?: string }
    ) => {
      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser) {
        throw new Error("Email already in use");
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name: name || "",
          role: "USER",
        },
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      if (!user.id) {
        throw new Error("Failed to create user");
      }

      const token = jwt.sign({ userId: user.id }, SECRET_KEY, {
        expiresIn: "7d",
      });
      const cookieStore = await cookies();

      cookieStore.set("auth-token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: "/",
      });

      return {
        id: user.id,
        name: user.name,
        email: user.email,
      };
    },

    signIn: async (
      _: void,
      { email, password }: { email: string; password: string; name?: string }
    ) => {
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        throw new Error("Invalid email or password");
      }

      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        throw new Error("Invalid email or password");
      }

      const token = jwt.sign({ userId: user.id }, SECRET_KEY, {
        expiresIn: "7d",
      });

      const cookieStore = await cookies();
      cookieStore.set("auth-token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
      });

      return {
        id: user.id,
        name: user.name,
        email: user.email,
      };
    },

    signOut: async () => {
      const cookieStore = await cookies();
      cookieStore.set("auth-token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        expires: new Date(0),
        path: "/",
      });

      return {
        success: true,
      };
    },
    updateUser: async (
      _: void,
      {
        id,
        name,
        email,
        phone,
        nationalCode,
        gender,
      }: {
        id: string;
        name?: string;
        email?: string;
        phone?: string;
        nationalCode?: string;
        gender?: string;
      }
    ) => {
      const existingUser = await prisma.user.findUnique({ where: { id } });
      if (!existingUser) {
        throw new Error("User not found");
      }

      if (email && email !== existingUser.email) {
        const emailExists = await prisma.user.findUnique({ where: { email } });
        if (emailExists) {
          throw new Error("Email already in use");
        }
      }

      if (phone && phone !== existingUser.phone) {
        const phoneExists = await prisma.user.findUnique({ where: { phone } });
        if (phoneExists) {
          throw new Error("Phone number already in use");
        }
      }

      let genderEnum: "MALE" | "FEMALE" | undefined = undefined;
      if (gender) {
        genderEnum = gender.toUpperCase() as "MALE" | "FEMALE";

        if (!["MALE", "FEMALE"].includes(genderEnum)) {
          throw new Error("Invalid gender value");
        }
      }

      const updatedUser = await prisma.user.update({
        where: { id },
        data: {
          name: name || existingUser.name,
          email: email || existingUser.email,
          phone: phone || existingUser.phone,
          nationalCode: nationalCode || existingUser.nationalCode,
          gender: genderEnum || existingUser.gender,
        },
      });

      return updatedUser;
    },
  },
};

export default resolvers;
