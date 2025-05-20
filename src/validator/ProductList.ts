import { z } from "zod";

export const listFormSchema = z.object({
  title: z
    .string()
    .min(3, "عنوان فهرست باید حداقل ۳ کاراکتر باشد")
    .max(50, "عنوان فهرست نمی‌تواند بیشتر از ۵۰ کاراکتر باشد")
});

export type ListFormData = z.infer<typeof listFormSchema>;
