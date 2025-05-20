import { z } from "zod";

export const CommentSchema = z.object({
  content: z.string().min(3, "متن کامنت باید حداقل ۳ حرف داشته باشد.").max(2000, "متن کامنت نباید بیشتر از ۲۰۰۰ حرف باشد"),
  rating: z.number().int().min(1, "امتیاز باید بین ۱ تا ۵ باشد.").max(5),
});

export type commentInput = z.infer<typeof CommentSchema>;
