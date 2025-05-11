"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { FaStar } from "react-icons/fa";

// Define the schema for comment validation
const commentSchema = z.object({
  text: z
    .string()
    .min(1, "نظر شما نمی‌تواند خالی باشد")
    .max(1000, "نظر شما نمی‌تواند بیشتر از ۱۰۰۰ کاراکتر باشد"),
  rating: z
    .number()
    .min(1, "لطفاً امتیاز دهید")
    .max(5, "امتیاز نمی‌تواند بیشتر از ۵ باشد"),
});

type CommentFormValues = z.infer<typeof commentSchema>;

interface CommentFormProps {
  onSubmit: (data: CommentFormValues) => void;
  defaultValues?: Partial<CommentFormValues>;
  loading?: boolean;
  onCancel?: () => void;
}

export function CommentForm({
  onSubmit,
  defaultValues,
  loading,
  onCancel,
}: CommentFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CommentFormValues>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      text: defaultValues?.text || "",
      rating: defaultValues?.rating || 0,
    },
  });

  const currentRating = watch("rating");

  const handleRatingChange = (rating: number) => {
    setValue("rating", rating, { shouldValidate: true });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label
          htmlFor="rating"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          امتیاز شما
        </label>
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => handleRatingChange(star)}
              className="focus:outline-none"
            >
              <FaStar
                className={`h-8 w-8 ${
                  star <= currentRating
                    ? "text-yellow-500 fill-yellow-500"
                    : "text-gray-300"
                }`}
              />
            </button>
          ))}
        </div>
        {errors.rating && (
          <p className="mt-1 text-sm text-red-600">{errors.rating.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="text"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          نظر شما
        </label>
        <textarea
          id="text"
          {...register("text")}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
          placeholder="نظر خود را بنویسید..."
        />
        {errors.text && (
          <p className="mt-1 text-sm text-red-600">{errors.text.message}</p>
        )}
      </div>

      <div className="flex justify-end gap-3">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            انصراف
          </button>
        )}
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "در حال ارسال..." : "ثبت نظر"}
        </button>
      </div>
    </form>
  );
}
