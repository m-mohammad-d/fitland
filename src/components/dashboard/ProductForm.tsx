"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema, type ProductFormValues } from "@/lib/schemas/productSchema";
import Input from "@/components/ui/Input";
import ImageUpload from "@/components/ui/ImageUpload";
import MultiSelect from "@/components/ui/MultiSelect";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import UploadSpinner from "@/components/ui/UploadSpinner";
import { Category } from "@/types/Category";
import { colors } from "@/constants/Colors";
import { Sizes } from "@/constants/Sizes";
import { Brands } from "@/constants/Brands";

interface CategoryOption {
  value: string;
  label: string;
}

interface ProductFormProps {
  categories: Category[];
  defaultValues?: ProductFormValues;
  onSubmit: (data: ProductFormValues) => Promise<void>;
  isLoading?: boolean;
  submitLabel?: string;
}

export default function ProductForm({ categories, defaultValues, onSubmit, isLoading = false, submitLabel = "ایجاد محصول" }: ProductFormProps) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: defaultValues || {
      images: [],
      colors: [],
      sizes: [],
    },
  });

  const handleFormSubmit = async (data: ProductFormValues) => {
    try {
      await onSubmit(data);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("خطایی رخ داد");
      }
    }
  };

  const categoryOptions: CategoryOption[] = categories?.map((category) => ({
    value: category.id,
    label: category.name,
  }));

  // Transform colors array to Option format
  const colorOptions = colors.map((color) => ({
    value: color.hex,
    label: color.name,
  }));

  // Transform sizes array to Option format
  const sizeOptions = Sizes.map((size) => ({
    value: size,
    label: size,
  }));

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <Input label="نام محصول" errorMessage={errors.name?.message} {...register("name")} />

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">برند</label>
          <select {...register("brand")} className="focus:border-primary-500 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none">
            <option value="">انتخاب برند</option>
            {Brands.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
          {errors.brand && <p className="mt-1 text-sm text-red-500">{errors.brand.message}</p>}
        </div>

        <Input label="قیمت" type="number" errorMessage={errors.price?.message} {...register("price", { valueAsNumber: true })} />

        <Input label="موجودی" type="number" errorMessage={errors.stock?.message} {...register("stock", { valueAsNumber: true })} />

        <Input label="تخفیف (%)" type="number" errorMessage={errors.discount?.message} {...register("discount", { valueAsNumber: true })} />

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">دسته‌بندی</label>
          <select {...register("categoryId")} className="focus:border-primary-500 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none">
            <option value="">انتخاب دسته‌بندی</option>
            {categoryOptions?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.categoryId && <p className="mt-1 text-sm text-red-500">{errors.categoryId.message}</p>}
        </div>

        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-medium text-gray-700">توضیحات</label>
          <textarea {...register("description")} rows={4} className="focus:border-primary-500 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none" />
          {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description.message}</p>}
        </div>

        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-medium text-gray-700">تصاویر</label>
          <ImageUpload value={watch("images")} onChange={(urls) => setValue("images", urls)} />
          {errors.images && <p className="mt-1 text-sm text-red-500">{errors.images.message}</p>}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">رنگ‌ها</label>
          <MultiSelect options={colorOptions} value={watch("colors")} onChange={(values) => setValue("colors", values)} error={errors.colors?.message} />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">سایز‌ها</label>
          <MultiSelect options={sizeOptions} value={watch("sizes")} onChange={(values) => setValue("sizes", values)} error={errors.sizes?.message} />
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <button type="button" onClick={() => router.back()} className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
          انصراف
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="bg-primary-600 hover:bg-primary-700 focus:ring-primary-500 rounded-lg px-4 py-2 text-sm font-medium text-white focus:ring-2 focus:ring-offset-2 focus:outline-none"
        >
          {isLoading ? <UploadSpinner /> : submitLabel}
        </button>
      </div>
    </form>
  );
}
