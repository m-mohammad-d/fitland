"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { FaStar } from "react-icons/fa";
import { CommentSchema } from "@/validator/Comment";

type CommentFormValues = z.infer<typeof CommentSchema>;

interface CommentFormProps {
  onSubmit: (data: CommentFormValues) => void;
  defaultValues?: Partial<CommentFormValues>;
  loading?: boolean;
  onCancel?: () => void;
}

export function CommentForm({ onSubmit, defaultValues, loading, onCancel }: CommentFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CommentFormValues>({
    resolver: zodResolver(CommentSchema),
    defaultValues: {
      content: defaultValues?.content || "",
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
        <label htmlFor="rating" className="mb-2 block text-sm font-medium text-gray-700">
          امتیاز شما
        </label>
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button key={star} type="button" onClick={() => handleRatingChange(star)} className="focus:outline-none">
              <FaStar className={`h-8 w-8 ${star <= currentRating ? "fill-yellow-500 text-yellow-500" : "text-gray-300"}`} />
            </button>
          ))}
        </div>
        {errors.rating && <p className="mt-1 text-sm text-red-600">{errors.rating.message}</p>}
      </div>

      <div>
        <label htmlFor="text" className="mb-2 block text-sm font-medium text-gray-700">
          نظر شما
        </label>
        <textarea
          id="text"
          {...register("content")}
          rows={4}
          className="focus:ring-primary-500 focus:border-primary-500 w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none"
          placeholder="نظر خود را بنویسید..."
        />
        {errors.content && <p className="mt-1 text-sm text-red-600">{errors.content.message}</p>}
      </div>

      <div className="flex justify-end gap-3">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="focus:ring-primary-500 rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-offset-2 focus:outline-none"
          >
            انصراف
          </button>
        )}
        <button
          type="submit"
          disabled={loading}
          className="bg-primary-600 hover:bg-primary-700 focus:ring-primary-500 rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white shadow-sm focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "در حال ارسال..." : "ثبت نظر"}
        </button>
      </div>
    </form>
  );
}
