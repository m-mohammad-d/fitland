import { clearAuthCookie, setAuthCookie, signToken } from "@/lib/Auth";
import { GraphQLContext } from "@/app/api/graphql/types/graphql";
import { Prisma, PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import type { AddAddressInput, AddCategoryArgs, AddCommentArgs, AddProductArgs, CreateOrderInput, ProductQueryArgs } from "./types";
import { GraphQLError } from "graphql";

const prisma = new PrismaClient();
const resolvers = {
  Query: {
    products: async (_: void, args: ProductQueryArgs) => {
      const { sortBy, filters, page = 1, pageSize = 10 } = args;

      const where: Prisma.ProductWhereInput = {};

      if (filters) {
        const { minPrice, maxPrice, discount, category, colors, sizes, availableOnly, search } = filters;

        if (minPrice !== undefined || maxPrice !== undefined) {
          where.price = {
            ...(minPrice !== undefined ? { gte: minPrice } : {}),
            ...(maxPrice !== undefined ? { lte: maxPrice } : {}),
          };
        }

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
  },

  Mutation: {
    addProduct: async (_: void, args: AddProductArgs) => {
      const discountedPrice = args.discount && args.discount > 0 ? Math.round(args.price * (1 - args.discount / 100)) : null;

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
    signUp: async (_: void, { email, password, name }: { email: string; password: string; name?: string }, context: GraphQLContext) => {
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
          status: "PENDING",
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
  },
};

export default resolvers;
