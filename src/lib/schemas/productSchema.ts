import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(2, "نام محصول باید حداقل ۲ کاراکتر باشد"),
  description: z.string().min(10, "توضیحات باید حداقل ۱۰ کاراکتر باشد"),
  price: z.number().min(0, "قیمت نمی‌تواند منفی باشد"),
  stock: z.number().min(0, "موجودی نمی‌تواند منفی باشد"),
  categoryId: z.string().min(1, "دسته‌بندی الزامی است"),
  brand: z.string().min(1, "برند الزامی است"),
  images: z.array(z.string()).min(1, "حداقل یک تصویر الزامی است"),
  colors: z.array(z.string()).min(1, "حداقل یک رنگ الزامی است"),
  sizes: z.array(z.string()).min(1, "حداقل یک سایز الزامی است"),
  discount: z.number().min(0).max(100).optional(),
});

export type ProductFormValues = z.infer<typeof productSchema>; 