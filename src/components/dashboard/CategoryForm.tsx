"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CategoryFormValues, categorySchema } from "@/validator/Category";
import Button from "@/components/ui/button";
import Input from "@/components/ui/Input";

interface CategoryFormProps {
  onSubmit: (data: CategoryFormValues) => Promise<void>;
  isLoading?: boolean;
  defaultValues?: CategoryFormValues;
  submitLabel?: string;
}

export default function CategoryForm({ onSubmit, isLoading, submitLabel = "ذخیره", defaultValues }: CategoryFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Input id="name" label="نام دسته بندی" {...register("name")} placeholder="نام دسته‌بندی را وارد کنید" disabled={isLoading} />
        {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
      </div>

      <Button type="submit" disabled={isLoading}>
        {isLoading ? "در حال ذخیره..." : submitLabel}
      </Button>
    </form>
  );
}
