import { z } from "zod";
export const discountSchema = z
  .object({
    code: z.string().min(3, "کد تخفیف باید حداقل ۳ کاراکتر باشد"),
    type: z.enum(["PERCENT", "AMOUNT"], { required_error: "نوع تخفیف الزامی است" }),
    value: z.number().min(0, "مقدار تخفیف نمی‌تواند منفی باشد"),
    isActive: z.boolean().default(true),
  })
  .refine((data) => (data.type === "PERCENT" ? data.value <= 100 : true), {
    message: "در حالت درصدی، مقدار تخفیف نباید بیشتر از ۱۰۰ باشد",
    path: ["value"],
  });
export type DiscountFormValues = z.infer<typeof discountSchema>;
