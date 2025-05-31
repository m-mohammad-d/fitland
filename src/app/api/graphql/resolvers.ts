import { clearAuthCookie, setAuthCookie, signToken } from "@/lib/Auth";
import { GraphQLContext } from "@/app/api/graphql/types/graphql";
import { Prisma, PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import type {
  AddAddressInput,
  AddCategoryArgs,
  AddCommentArgs,
  AddProductArgs,
  CreateOrderInput,
  UpdateDiscountCodeInput,
  ProductQueryArgs,
  UpdateCommentArgs,
  UpdateProductArgs,
  AddDiscountCodeInput,
  UpdateCategoryArgs,
} from "./types";
import { GraphQLError } from "graphql";
import { CommentSchema } from "@/validator/Comment";

const prisma = new PrismaClient();
const resolvers = {
  Query: {
    products: async (_: void, args: ProductQueryArgs) => {
      const { sortBy, filters, page = 1, pageSize = 10 } = args;

      const where: Prisma.ProductWhereInput = {};

      if (filters) {
        const { minPrice, maxPrice, discount, category, brand , colors, sizes, availableOnly, search } = filters;

        if (minPrice !== undefined || maxPrice !== undefined) {
          where.price = {
            ...(minPrice !== undefined ? { gte: minPrice } : {}),
            ...(maxPrice !== undefined ? { lte: maxPrice } : {}),
          };
        }
        if (brand?.length) where.brand = { in: brand };
        if (discount) where.discount = { gte: discount };
        if (category?.length) where.categoryId = { in: category };
        if (sizes?.length) where.sizes = { hasSome: sizes };
        if (availableOnly) where.stock = { gt: 0 };

        if (colors?.length) {
          where.OR = colors.map((color) => ({
            colors: {
              array_contains: [{ name: color }],
            },
          }));
        }

        if (search) {
          where.OR = [{ name: { contains: search, mode: "insensitive" } }, { description: { contains: search, mode: "insensitive" } }];
        }
      }

      const orderBy: Record<string, "asc" | "desc"> = {};

      if (sortBy) {
        const isDesc = sortBy.endsWith("Desc");
        const column = isDesc ? sortBy.replace("Desc", "") : sortBy;
        orderBy[column] = isDesc ? "desc" : "asc";
      }

      const skip = (page - 1) * pageSize;
      const take = pageSize;
      const totalCount = await prisma.product.count({ where });

      const products = await prisma.product.findMany({
        where,
        orderBy,
        skip,
        take,
        include: { category: true },
      });

      return {
        items: products.map((product) => ({
          ...product,
          discountedPrice: product.discount ? Math.round(product.price * (1 - product.discount / 100)) : product.price,
        })),
        totalCount,
      };
    },

    getUserWalletInfo: async (_parent: void, _args: void, context: GraphQLContext) => {
      try {
        const userId = context.user?.id;
        console.log(context);

        const wallet = await prisma.wallet.findUnique({
          where: {
            userId,
          },
          include: {
            transactions: true,
          },
        });

        if (!wallet) {
          throw new GraphQLError("کیف پول پیدا نشد", {
            extensions: {
              code: "NOT_FOUND",
              http: {
                status: 404,
              },
            },
          });
        }

        return wallet;
      } catch (error) {
        console.error(error);
        throw new GraphQLError("مشکلی در دریافت اطلاعات کیف پول پیش آمد", {
          extensions: {
            code: "INTERNAL_SERVER_ERROR",
            http: {
              status: 500,
            },
          },
        });
      }
    },
    getProductComments: async (_: void, { id }: { id: string }, context: GraphQLContext) => {
      if (!id) {
        throw new GraphQLError("ارسال آیدی اجباری است", {
          extensions: {
            code: "BAD_USER_INPUT",
            http: {
              status: 400,
            },
          },
        });
      }

      const userId = context?.user?.id || null;

      const comments = await prisma.comment.findMany({
        where: { productId: id },
        include: { user: true, reactions: true },
      });

      const formattedComments = comments.map((comment) => {
        const likeCount = comment.reactions.filter((r) => r.type === "LIKE").length;
        const dislikeCount = comment.reactions.filter((r) => r.type === "DISLIKE").length;
        const userReactionType = userId ? comment.reactions.find((r) => r.userId === userId)?.type || null : null;

        return {
          ...comment,
          userReactionType,
          likes: likeCount,
          dislikes: dislikeCount,
        };
      });

      return formattedComments;
    },

    getMe: async (_parent: void, _args: void, context: GraphQLContext) => {
      try {
        const userId = context?.user?.id;

        const user = await prisma.user.findUnique({ where: { id: userId } });

        if (!user) {
          throw new GraphQLError("User not found", {
            extensions: {
              code: "NOT_FOUND",
              http: {
                status: 404,
              },
            },
          });
        }

        return user;
      } catch (error) {
        console.error("Error in getMe function:", error);
        throw error;
      }
    },
    getAllUsers: async (_parent: void, _args: void, context: GraphQLContext) => {
      const userId = context?.user?.id;
      const userRole = context?.user?.role;
      if (!userId || userRole !== "ADMIN") {
        throw new GraphQLError("دسترسی غیرمجاز", {
          extensions: {
            code: "UNAUTHENTICATED",
            http: {
              status: 401,
            },
          },
        });
      }

      return await prisma.user.findMany();
    },
    categories: async () => {
      return await prisma.category.findMany();
    },
    getCategoryById: async (_: void, { id }: { id: string }) => {
      if (!id) {
        throw new GraphQLError("ارسال آیدی اجباری است", {
          extensions: {
            code: "BAD_USER_INPUT",
            http: { status: 400 },
          },
        });
      }
      return await prisma.category.findUnique({ where: { id } });
    },
    product: async (_: void, { id }: { id: string }) => {
      const product = await prisma.product.findUnique({
        where: { id },
        include: { comments: true, category: true },
      });

      if (!product) return null;

      return {
        ...product,
        discountedPrice: product.discount ? Math.round(product.price * (1 - product.discount / 100)) : product.price,
      };
    },
    getAllOrders: async () => {
      return await prisma.order.findMany({
        include: {
          items: {
            include: {
              product: true,
            },
          },
          user: true,
          discountCode: true,
          address: true,
        },
      });
    },
    getOrderById: async (_: void, { id }: { id: string }) => {
      if (!id) {
        throw new GraphQLError("ارسال آیدی اجباری است", {
          extensions: {
            code: "BAD_USER_INPUT",
            http: {
              status: 400,
            },
          },
        });
      }
      const order = await prisma.order.findUnique({
        where: { id },
        include: {
          items: {
            include: {
              product: true,
            },
          },
          discountCode: true,
          address: true,
          user: true,
        },
      });

      if (!order) {
        throw new GraphQLError("سفارش پیدا نشد", {
          extensions: {
            code: "NOT_FOUND",
            http: {
              status: 404,
            },
          },
        });
      }

      return order;
    },
    getUserOrders: async (_parent: void, _args: void, context: GraphQLContext) => {
      const userId = context?.user?.id;

      return await prisma.order.findMany({
        where: { userId },
        include: {
          items: {
            include: {
              product: true,
            },
          },
          discountCode: true,
          address: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    },
    getUserAddress: async (_parent: void, _args: void, context: GraphQLContext) => {
      const userId = context?.user?.id;

      return await prisma.address.findMany({
        where: { userId },
      });
    },
    getAddressById: async (_: void, { id }: { id: string }) => {
      if (!id) {
        throw new GraphQLError("ارسال آیدی اجباری است", {
          extensions: {
            code: "BAD_USER_INPUT",
            http: {
              status: 400,
            },
          },
        });
      }
      const address = await prisma.address.findUnique({
        where: { id },
      });

      if (!address) {
        throw new GraphQLError("ادرسی پیدا نشد");
      }

      return address;
    },
    getUserLists: async (_parent: void, _args: void, context: GraphQLContext) => {
      const userId = context?.user?.id;

      if (!userId) {
        throw new GraphQLError("دسترسی غیرمجاز", {
          extensions: {
            code: "UNAUTHENTICATED",
            http: { status: 401 },
          },
        });
      }

      return await prisma.list.findMany({
        where: { userId },
        include: {
          products: {
            include: {
              product: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    },

    getListById: async (_: void, { id }: { id: string }, context: GraphQLContext) => {
      const userId = context?.user?.id;

      if (!userId) {
        throw new GraphQLError("دسترسی غیرمجاز", {
          extensions: {
            code: "UNAUTHENTICATED",
            http: { status: 401 },
          },
        });
      }

      const list = await prisma.list.findUnique({
        where: { id },
        include: {
          products: {
            include: {
              product: true,
            },
          },
        },
      });

      if (!list) {
        throw new GraphQLError("فهرست مورد نظر یافت نشد", {
          extensions: {
            code: "NOT_FOUND",
            http: { status: 404 },
          },
        });
      }

      if (list.userId !== userId) {
        throw new GraphQLError("شما دسترسی به این فهرست را ندارید", {
          extensions: {
            code: "FORBIDDEN",
            http: { status: 403 },
          },
        });
      }

      return list;
    },
    getAllDiscountCodes: async () => {
      return await prisma.discountCode.findMany();
    },
    getDiscountCodeById: async (_: void, { id }: { id: string }) => {
      if (!id) {
        throw new GraphQLError("ارسال آیدی اجباری است", {
          extensions: {
            code: "BAD_USER_INPUT",
            http: { status: 400 },
          },
        });
      }
      const discountCode = await prisma.discountCode.findUnique({ where: { id } });
      if (!discountCode) {
        throw new GraphQLError("کد تخفیف یافت نشد", {
          extensions: {
            code: "NOT_FOUND",
            http: { status: 404 },
          },
        });
      }
      return discountCode;
    },
    getSalesStats: async (_: void, { days }: { days: number }) => {
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - days);

      const orders = await prisma.order.findMany({
        where: {
          createdAt: {
            gte: startDate,
          },
          status: {
            not: "CANCELED",
          },
        },
        select: {
          totalPrice: true,
          createdAt: true,
        },
      });

      const totalSales = orders.reduce((sum, order) => sum + order.totalPrice, 0);

      // Group sales by day
      const salesByDay = orders.reduce(
        (acc, order) => {
          const date = order.createdAt.toISOString().split("T")[0];
          acc[date] = (acc[date] || 0) + order.totalPrice;
          return acc;
        },
        {} as Record<string, number>,
      );

      // Transform salesByDay object into an array of objects
      const salesByDayArray = Object.entries(salesByDay).map(([date, total]) => ({
        date,
        total,
      }));

      return {
        totalSales,
        salesByDay: salesByDayArray,
      };
    },

    getOrdersStats: async (_: void, { days }: { days: number }) => {
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - days);

      const orders = await prisma.order.findMany({
        where: {
          createdAt: {
            gte: startDate,
          },
        },
        select: {
          id: true,
          createdAt: true,
          status: true,
        },
      });

      const totalOrders = orders.length;

      // Group orders by day
      const ordersByDay = orders.reduce(
        (acc, order) => {
          const date = order.createdAt.toISOString().split("T")[0];
          acc[date] = (acc[date] || 0) + 1;
          return acc;
        },
        {} as Record<string, number>,
      );

      // Count orders by status
      const ordersByStatus = orders.reduce(
        (acc, order) => {
          acc[order.status] = (acc[order.status] || 0) + 1;
          return acc;
        },
        {} as Record<string, number>,
      );

      // Transform objects into arrays
      const ordersByDayArray = Object.entries(ordersByDay).map(([date, count]) => ({
        date,
        count,
      }));

      const ordersByStatusArray = Object.entries(ordersByStatus).map(([status, count]) => ({
        status,
        count,
      }));

      return {
        totalOrders,
        ordersByDay: ordersByDayArray,
        ordersByStatus: ordersByStatusArray,
      };
    },

    getNewUsersStats: async (_: void, { days }: { days: number }) => {
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - days);

      const users = await prisma.user.findMany({
        where: {
          createdAt: {
            gte: startDate,
          },
        },
        select: {
          id: true,
          createdAt: true,
        },
      });

      const totalNewUsers = users.length;

      // Group new users by day
      const usersByDay = users.reduce(
        (acc, user) => {
          const date = user.createdAt.toISOString().split("T")[0];
          acc[date] = (acc[date] || 0) + 1;
          return acc;
        },
        {} as Record<string, number>,
      );

      // Transform object into array
      const usersByDayArray = Object.entries(usersByDay).map(([date, count]) => ({
        date,
        count,
      }));

      return {
        totalNewUsers,
        usersByDay: usersByDayArray,
      };
    },
  },

  Mutation: {
    addProduct: async (_: void, args: AddProductArgs) => {
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
        },
      });
    },
    updateProduct: async (_: void, args: UpdateProductArgs, context: GraphQLContext) => {
      const userId = context?.user?.id;

      if (!userId) {
        throw new GraphQLError("دسترسی غیرمجاز", {
          extensions: {
            code: "UNAUTHORIZED",
            http: { status: 401 },
          },
        });
      }

      return await prisma.product.update({
        where: { id: args.id },
        data: args,
      });
    },
    deleteProduct: async (_: void, { id }: { id: string }, context: GraphQLContext) => {
      const userId = context?.user?.id;

      if (!userId) {
        throw new GraphQLError("دسترسی غیرمجاز", {
          extensions: {
            code: "UNAUTHORIZED",
            http: {
              status: 401,
            },
          },
        });
      }

      return await prisma.product.delete({
        where: { id },
      });
    },

    addComment: async (_: void, args: AddCommentArgs, context: GraphQLContext) => {
      const userId = context?.user?.id;

      if (!userId) {
        throw new GraphQLError("دسترسی غیرمجاز", {
          extensions: {
            code: "UNAUTHORIZED",
            http: {
              status: 401,
            },
          },
        });
      }

      return await prisma.comment.create({
        data: {
          userId,
          content: args.content,
          productId: args.productId,
          rating: args.rating,
        },
      });
    },

    addCategory: async (_: void, args: AddCategoryArgs) => {
      return await prisma.category.create({
        data: {
          name: args.name,
        },
      });
    },
    updateCategory: async (_: void, { input }: { input: UpdateCategoryArgs }, context: GraphQLContext) => {
      const { id, name } = input;
      const userId = context?.user?.id;
      const isAdmin = context?.user?.role === "ADMIN";

      if (userId && !isAdmin) {
        throw new GraphQLError("دسترسی غیرمجاز", {
          extensions: {
            code: "UNAUTHORIZED",
            http: {
              status: 401,
            },
          },
        });
      }
      const existingCategory = await prisma.category.findUnique({ where: { id } });
      if (!existingCategory) {
        throw new GraphQLError("دسته‌بندی یافت نشد", {
          extensions: {
            code: "NOT_FOUND",
            http: {
              status: 404,
            },
          },
        });
      }

      return await prisma.category.update({
        where: { id: id },
        data: { name },
      });
    },

    signUp: async (_: void, { email, password, name }: { email: string; password: string; name?: string }) => {
      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser) {
        throw new GraphQLError("این ایمیل قبلاً ثبت شده است", {
          extensions: {
            code: "BAD_USER_INPUT",
            http: {
              status: 400,
            },
          },
        });
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
        throw new GraphQLError("ثبت‌نام انجام نشد. لطفاً دوباره تلاش کنید", {
          extensions: {
            code: "INTERNAL_SERVER_ERROR",
            http: {
              status: 500,
            },
          },
        });
      }

      await prisma.wallet.create({
        data: {
          userId: user.id,
          balance: 0,
        },
      });

      const token = signToken({ id: user.id, role: user.role });

      await setAuthCookie(token);

      return {
        id: user.id,
        name: user.name,
        email: user.email,
      };
    },

    signIn: async (_: void, { email, password }: { email: string; password: string; name?: string }) => {
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        throw new GraphQLError("ایمیل یا رمز عبور اشتباه است", {
          extensions: {
            code: "UNAUTHENTICATED",
            http: { status: 401 },
          },
        });
      }

      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        throw new GraphQLError("ایمیل یا رمز عبور اشتباه است", {
          extensions: {
            code: "UNAUTHENTICATED",
            http: { status: 401 },
          },
        });
      }
      const token = signToken({ id: user.id, role: user.role });

      await setAuthCookie(token);
      return {
        id: user.id,
        name: user.name,
        email: user.email,
      };
    },

    signOut: async () => {
      await clearAuthCookie();

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
        photo,
        gender,
      }: {
        id: string;
        name?: string;
        email?: string;
        phone?: string;
        nationalCode?: string;
        gender?: string;
        photo?: string;
      },
    ) => {
      const existingUser = await prisma.user.findUnique({ where: { id } });
      if (!existingUser) {
        throw new GraphQLError("کاربر پیدا نشد", {
          extensions: {
            code: "NOT_FOUND",
            http: { status: 404 },
          },
        });
      }

      if (email && email !== existingUser.email) {
        const emailExists = await prisma.user.findUnique({ where: { email } });
        if (emailExists) {
          throw new GraphQLError("این ایمیل قبلاً ثبت شده است", {
            extensions: {
              code: "BAD_USER_INPUT",
              http: { status: 400 },
            },
          });
        }
      }

      if (phone && phone !== existingUser.phone) {
        const phoneExists = await prisma.user.findUnique({ where: { phone } });
        if (phoneExists) {
          throw new GraphQLError("این شماره تلفن قبلاً ثبت شده است", {
            extensions: {
              code: "BAD_USER_INPUT",
              http: { status: 400 },
            },
          });
        }
      }

      let genderEnum: "MALE" | "FEMALE" | undefined = undefined;
      if (gender) {
        genderEnum = gender.toUpperCase() as "MALE" | "FEMALE";

        if (!["MALE", "FEMALE"].includes(genderEnum)) {
          throw new GraphQLError("مقدار وارد شده برای جنسیت نامعتبر است", {
            extensions: {
              code: "BAD_USER_INPUT",
              http: { status: 400 },
            },
          });
        }
      }

      const updatedUser = await prisma.user.update({
        where: { id },
        data: {
          name: name || existingUser.name,
          photo: photo || existingUser.photo,
          email: email || existingUser.email,
          phone: phone || existingUser.phone,
          nationalCode: nationalCode || existingUser.nationalCode,
          gender: genderEnum || existingUser.gender,
        },
      });

      return updatedUser;
    },
    deleteUser: async (_: void, { id }: { id: string }, context: GraphQLContext) => {
      const userId = context?.user?.id;
      const userRole = context?.user?.role;
      if (!userId || userRole !== "ADMIN") {
        throw new GraphQLError("دسترسی غیرمجاز", {
          extensions: {
            code: "UNAUTHENTICATED",
            http: { status: 401 },
          },
        });
      }
      await prisma.orderItem.deleteMany({ where: { order: { userId: id } } });
      await prisma.listProduct.deleteMany({ where: { list: { userId: id } } });
      await prisma.transaction.deleteMany({ where: { wallet: { userId: id } } });
      await prisma.order.deleteMany({ where: { userId: id } });
      await prisma.list.deleteMany({ where: { userId: id } });
      await prisma.address.deleteMany({ where: { userId: id } });
      await prisma.reaction.deleteMany({ where: { userId: id } });
      await prisma.comment.deleteMany({ where: { userId: id } });
      await prisma.wallet.delete({ where: { userId: id } });
      return await prisma.user.delete({ where: { id } });
    },

    createOrder: async (_: void, { input }: { input: CreateOrderInput }, context: GraphQLContext) => {
      const userId = context?.user?.id;

      if (!userId) {
        throw new GraphQLError("دسترسی غیرمجاز", {
          extensions: {
            code: "UNAUTHENTICATED",
            http: { status: 401 },
          },
        });
      }
      let discountCodeId: string | undefined = undefined;
      let discountAmount: number = 0;

      if (input.discountCode) {
        const discount = await prisma.discountCode.findUnique({
          where: { code: input.discountCode },
        });

        if (!discount || !discount.isActive) {
          throw new GraphQLError("کد تخفیف نامعتبر یا غیرفعال است", {
            extensions: {
              code: "BAD_USER_INPUT",
              http: { status: 400 },
            },
          });
        }
        discountCodeId = discount.id;
        if (discount.type === "AMOUNT") {
          discountAmount = discount.value;
        } else if (discount.type === "PERCENT") {
          discountAmount = (input.totalPrice * discount.value) / 100;
        }

        if (discountAmount >= input.totalPrice) {
          throw new GraphQLError("مقدار تخفیف نباید بیشتر یا مساوی مبلغ کل باشد", {
            extensions: {
              code: "BAD_USER_INPUT",
              http: { status: 400 },
            },
          });
        }
      }
      const finalPrice = input.totalPrice - discountAmount + input.tax + input.shippingCost;

      const order = await prisma.order.create({
        data: {
          userId,
          addressId: input.addressId,
          deliveryDate: new Date(input.deliveryDate),
          paymentMethod: input.paymentMethod,
          shippingCost: input.shippingCost,
          tax: input.tax,
          totalPrice: finalPrice,
          discountCodeId,
          status: "PROCESSING",
          items: {
            create: input.items.map((item) => ({
              productId: item.productId,
              color: item.color,
              size: item.size,
              quantity: item.quantity,
              priceAtPurchase: item.priceAtPurchase,
            })),
          },
        },
        include: { items: true },
      });

      return order;
    },
    applyDiscount: async (_: void, { code, totalPrice }: { code: string; totalPrice: number }) => {
      const discount = await prisma.discountCode.findUnique({
        where: { code },
      });

      if (!discount || !discount.isActive) {
        return {
          success: false,
          message: "کد تخفیف نامعتبر یا غیرفعال است",
        };
      }

      let discountAmount = 0;

      if (discount.type === "AMOUNT") {
        discountAmount = discount.value;
      } else if (discount.type === "PERCENT") {
        discountAmount = (totalPrice * discount.value) / 100;
      }

      if (discountAmount >= totalPrice) {
        return {
          success: false,
          message: "مقدار تخفیف بیش از مبلغ کل است",
        };
      }

      return {
        success: true,
        message: "کد تخفیف با موفقیت اعمال شد",
        discountAmount,
        discountPercent: discount.type === "PERCENT" ? discount.value : null,
        type: discount.type,
        code: discount.code,
      };
    },
    addDiscountCode: async (_: void, { input }: { input: AddDiscountCodeInput }, context: GraphQLContext) => {
      const { code, value, isActive, type } = input;
      const userId = context?.user?.id;
      const userRole = context?.user?.role;
      if (!userId || userRole !== "ADMIN") {
        throw new GraphQLError("دسترسی غیرمجاز", {
          extensions: {
            code: "UNAUTHENTICATED",
            http: { status: 401 },
          },
        });
      }
      const existingDiscountCode = await prisma.discountCode.findUnique({
        where: { code },
      });

      if (existingDiscountCode) {
        throw new GraphQLError("کد تخفیف قبلاً ثبت شده است", {
          extensions: {
            code: "BAD_USER_INPUT",
            http: { status: 400 },
          },
        });
      }

      if (type === "PERCENT" && value > 100) {
        throw new GraphQLError("مقدار تخفیف باید کمتر از 100 باشد", {
          extensions: {
            code: "BAD_USER_INPUT",
            http: { status: 400 },
          },
        });
      }

      const discountCode = await prisma.discountCode.create({
        data: {
          code,
          isActive,
          type: type as "PERCENT" | "AMOUNT",
          value,
        },
      });
      return discountCode;
    },
    updateDiscountCode: async (_: void, { input }: { input: UpdateDiscountCodeInput }, context: GraphQLContext) => {
      const { code, value, isActive, type, id } = input;
      const userId = context?.user?.id;
      const userRole = context?.user?.role;
      if (!userId || userRole !== "ADMIN") {
        throw new GraphQLError("دسترسی غیرمجاز", {
          extensions: {
            code: "UNAUTHENTICATED",
            http: { status: 401 },
          },
        });
      }
      const existingDiscountCode = await prisma.discountCode.findUnique({
        where: { id },
      });
      if (!existingDiscountCode) {
        throw new GraphQLError("کد تخفیف یافت نشد", {
          extensions: {
            code: "NOT_FOUND",
            http: { status: 404 },
          },
        });
      }
      if (type === "PERCENT" && value > 100) {
        throw new GraphQLError("مقدار تخفیف باید کمتر از 100 باشد", {
          extensions: {
            code: "BAD_USER_INPUT",
            http: { status: 400 },
          },
        });
      }
      const updatedDiscountCode = await prisma.discountCode.update({
        where: { id },
        data: { code, value, isActive, type },
      });
      return updatedDiscountCode;
    },
    addAddress: async (_: void, { input }: { input: AddAddressInput }, context: GraphQLContext) => {
      const userId = context?.user?.id;

      if (!userId) {
        throw new GraphQLError("دسترسی غیرمجاز", {
          extensions: {
            code: "UNAUTHENTICATED",
            http: { status: 401 },
          },
        });
      }

      const address = await prisma.address.create({
        data: {
          userId,
          fullName: input.fullName,
          phone: input.phone,
          zipCode: input.zipCode,
          plaque: input.plaque,
          unit: input.unit,
          details: input.details,
          fullAddress: input.fullAddress,
        },
      });

      return address;
    },
    walletDeposit: async (_: void, { amount }: { amount: number }, context: GraphQLContext) => {
      const userId = context?.user?.id;

      if (!userId) {
        throw new GraphQLError("دسترسی غیرمجاز", {
          extensions: {
            code: "UNAUTHENTICATED",
            http: { status: 401 },
          },
        });
      }

      const wallet = await prisma.wallet.findUnique({
        where: { userId },
      });

      if (!wallet) {
        throw new GraphQLError("کیف پول پیدا نشد", {
          extensions: {
            code: "NOT_FOUND",
            http: {
              status: 404,
            },
          },
        });
      }
      const updatedWallet = await prisma.wallet.update({
        where: { userId },
        data: {
          balance: wallet.balance + amount,
        },
      });
      await prisma.transaction.create({
        data: {
          walletId: wallet.id,
          amount,
          transactionType: "DEPOSIT",
        },
      });
      return updatedWallet;
    },
    walletWithdraw: async (_: void, { amount }: { amount: number }, context: GraphQLContext) => {
      const userId = context?.user?.id;

      if (!userId) {
        throw new GraphQLError("دسترسی غیرمجاز", {
          extensions: {
            code: "UNAUTHENTICATED",
            http: { status: 401 },
          },
        });
      }

      const wallet = await prisma.wallet.findUnique({
        where: { userId },
      });

      if (!wallet) {
        throw new GraphQLError("کیف پول پیدا نشد", {
          extensions: {
            code: "NOT_FOUND",
            http: { status: 404 },
          },
        });
      }

      if (wallet.balance < amount) {
        throw new GraphQLError("موجودی کافی نیست", {
          extensions: {
            code: "BAD_REQUEST",
            http: { status: 400 },
          },
        });
      }
      const updatedWallet = await prisma.wallet.update({
        where: { userId },
        data: {
          balance: wallet.balance - amount,
        },
      });

      await prisma.transaction.create({
        data: {
          walletId: wallet.id,
          amount,
          transactionType: "PAYMENT",
        },
      });

      return updatedWallet;
    },
    likeComment: async (_: void, { type, commentId }: { type: "LIKE" | "DISLIKE"; commentId: string }, context: GraphQLContext) => {
      try {
        // Authentication check
        const userId = context?.user?.id;

        if (!userId) {
          throw new GraphQLError("دسترسی غیرمجاز", {
            extensions: {
              code: "UNAUTHENTICATED",
              http: { status: 401 },
            },
          });
        }

        // Check if comment exists
        const comment = await prisma.comment.findUnique({
          where: { id: commentId },
        });
        if (!comment)
          throw new GraphQLError("کامنت یافت نشد", {
            extensions: {
              code: "NOT_FOUND",
              http: {
                status: 404,
              },
            },
          });

        // Check for existing reaction
        const existingReaction = await prisma.reaction.findUnique({
          where: {
            commentId_userId: { commentId, userId },
          },
        });

        // If same reaction exists, remove it (toggle)
        if (existingReaction?.type === type) {
          await prisma.reaction.delete({
            where: { id: existingReaction.id },
          });
          return null;
        }

        // Create or update reaction
        const reaction = await prisma.reaction.upsert({
          where: { commentId_userId: { commentId, userId } },
          update: { type },
          create: { type, commentId, userId },
        });

        return reaction;
      } catch (error) {
        console.error("Error in likePost resolver:", error);
      }
    },
    updateComment: async (_: void, args: UpdateCommentArgs, context: GraphQLContext) => {
      const { user } = context;
      const { commentId, content, rating } = args;
      const parsed = CommentSchema.safeParse(args);

      if (!parsed.success) {
        const message = parsed.error.errors.map((e) => e.message).join("، ");
        throw new GraphQLError(message, {
          extensions: { code: "BAD_USER_INPUT", http: 400 },
        });
      }

      if (!user) {
        throw new GraphQLError("برای ویرایش کامنت ابتدا وارد حساب کاربری خود شوید.", {
          extensions: { code: "UNAUTHORIZED", http: 401 },
        });
      }

      const existingComment = await prisma.comment.findUnique({
        where: { id: commentId },
      });

      if (!existingComment) {
        throw new GraphQLError("کامنت مورد نظر پیدا نشد.", {
          extensions: { code: "NOT_FOUND", http: 404 },
        });
      }

      if (existingComment.userId !== user.id) {
        throw new GraphQLError("شما اجازه ویرایش این کامنت را ندارید.", {
          extensions: { code: "FORBIDDEN", http: 403 },
        });
      }

      const updatedComment = await prisma.comment.update({
        where: { id: commentId },
        data: { content, rating },
      });

      return updatedComment;
    },
    deleteComment: async (_: void, { commentId }: { commentId: string }, context: GraphQLContext) => {
      const { user } = context;

      if (!user) {
        throw new GraphQLError("برای حذف کامنت ابتدا وارد حساب کاربری خود شوید.", {
          extensions: { code: "UNAUTHORIZED", http: 401 },
        });
      }

      const existingComment = await prisma.comment.findUnique({
        where: { id: commentId },
      });

      if (!existingComment) {
        throw new GraphQLError("کامنت مورد نظر پیدا نشد.", {
          extensions: { code: "NOT_FOUND", http: 404 },
        });
      }

      if (existingComment.userId !== user.id) {
        throw new GraphQLError("شما اجازه حذف این کامنت را ندارید.", {
          extensions: { code: "FORBIDDEN", http: 403 },
        });
      }

      // Delete all reactions first
      await prisma.reaction.deleteMany({
        where: { commentId },
      });

      // Then delete the comment
      const deletedComment = await prisma.comment.delete({
        where: { id: commentId },
      });

      return deletedComment;
    },
    createList: async (_: void, { title }: { title: string }, context: GraphQLContext) => {
      const userId = context?.user?.id;

      if (!userId) {
        throw new GraphQLError("دسترسی غیرمجاز", {
          extensions: {
            code: "UNAUTHENTICATED",
            http: { status: 401 },
          },
        });
      }

      if (!title || title.trim().length === 0) {
        throw new GraphQLError("عنوان فهرست نمی‌تواند خالی باشد", {
          extensions: {
            code: "BAD_USER_INPUT",
            http: { status: 400 },
          },
        });
      }

      return await prisma.list.create({
        data: {
          title,
          userId,
        },
      });
    },

    updateList: async (_: void, { id, title }: { id: string; title: string }, context: GraphQLContext) => {
      const userId = context?.user?.id;

      if (!userId) {
        throw new GraphQLError("دسترسی غیرمجاز", {
          extensions: {
            code: "UNAUTHENTICATED",
            http: { status: 401 },
          },
        });
      }

      if (!title || title.trim().length === 0) {
        throw new GraphQLError("عنوان فهرست نمی‌تواند خالی باشد", {
          extensions: {
            code: "BAD_USER_INPUT",
            http: { status: 400 },
          },
        });
      }

      const list = await prisma.list.findUnique({
        where: { id },
      });

      if (!list) {
        throw new GraphQLError("فهرست مورد نظر یافت نشد", {
          extensions: {
            code: "NOT_FOUND",
            http: { status: 404 },
          },
        });
      }

      if (list.userId !== userId) {
        throw new GraphQLError("شما دسترسی به این فهرست را ندارید", {
          extensions: {
            code: "FORBIDDEN",
            http: { status: 403 },
          },
        });
      }

      return await prisma.list.update({
        where: { id },
        data: { title },
      });
    },

    deleteList: async (_: void, { id }: { id: string }, context: GraphQLContext) => {
      const userId = context?.user?.id;

      if (!userId) {
        throw new GraphQLError("دسترسی غیرمجاز", {
          extensions: {
            code: "UNAUTHENTICATED",
            http: { status: 401 },
          },
        });
      }

      const list = await prisma.list.findUnique({
        where: { id },
      });

      if (!list) {
        throw new GraphQLError("فهرست مورد نظر یافت نشد", {
          extensions: {
            code: "NOT_FOUND",
            http: { status: 404 },
          },
        });
      }

      if (list.userId !== userId) {
        throw new GraphQLError("شما دسترسی به این فهرست را ندارید", {
          extensions: {
            code: "FORBIDDEN",
            http: { status: 403 },
          },
        });
      }

      // Delete all list products first
      await prisma.listProduct.deleteMany({
        where: { listId: id },
      });

      // Then delete the list
      return await prisma.list.delete({
        where: { id },
      });
    },
    addProductToList: async (_: void, { listId, productId }: { listId: string; productId: string }, context: GraphQLContext) => {
      const userId = context?.user?.id;

      if (!userId) {
        throw new GraphQLError("دسترسی غیرمجاز", {
          extensions: {
            code: "UNAUTHENTICATED",
            http: { status: 401 },
          },
        });
      }

      const list = await prisma.list.findUnique({
        where: { id: listId },
      });

      if (!list) {
        throw new GraphQLError("فهرست مورد نظر یافت نشد", {
          extensions: {
            code: "NOT_FOUND",
            http: { status: 404 },
          },
        });
      }

      if (list.userId !== userId) {
        throw new GraphQLError("شما دسترسی به این فهرست را ندارید", {
          extensions: {
            code: "FORBIDDEN",
            http: { status: 403 },
          },
        });
      }

      const product = await prisma.product.findUnique({
        where: { id: productId },
      });

      if (!product) {
        throw new GraphQLError("محصول مورد نظر یافت نشد", {
          extensions: {
            code: "NOT_FOUND",
            http: { status: 404 },
          },
        });
      }

      try {
        return await prisma.listProduct.create({
          data: {
            listId,
            productId,
          },
          include: {
            product: true,
          },
        });
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
          throw new GraphQLError("این محصول قبلاً به فهرست اضافه شده است", {
            extensions: {
              code: "BAD_USER_INPUT",
              http: { status: 400 },
            },
          });
        }
        throw error;
      }
    },

    removeProductFromList: async (_: void, { listId, productId }: { listId: string; productId: string }, context: GraphQLContext) => {
      const userId = context?.user?.id;

      if (!userId) {
        throw new GraphQLError("دسترسی غیرمجاز", {
          extensions: {
            code: "UNAUTHENTICATED",
            http: { status: 401 },
          },
        });
      }

      const list = await prisma.list.findUnique({
        where: { id: listId },
      });

      if (!list) {
        throw new GraphQLError("فهرست مورد نظر یافت نشد", {
          extensions: {
            code: "NOT_FOUND",
            http: { status: 404 },
          },
        });
      }

      if (list.userId !== userId) {
        throw new GraphQLError("شما دسترسی به این فهرست را ندارید", {
          extensions: {
            code: "FORBIDDEN",
            http: { status: 403 },
          },
        });
      }

      const listProduct = await prisma.listProduct.findUnique({
        where: {
          listId_productId: {
            listId,
            productId,
          },
        },
      });

      if (!listProduct) {
        throw new GraphQLError("این محصول در فهرست وجود ندارد", {
          extensions: {
            code: "NOT_FOUND",
            http: { status: 404 },
          },
        });
      }

      return await prisma.listProduct.delete({
        where: {
          listId_productId: {
            listId,
            productId,
          },
        },
      });
    },
  },
};

export default resolvers;
