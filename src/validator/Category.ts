import { z } from "zod";

export const categorySchema = z.object({
  name: z.string().min(2, "نام دسته‌بندی باید حداقل ۲ کاراکتر باشد"),
});

export type CategoryFormValues = z.infer<typeof categorySchema>; 