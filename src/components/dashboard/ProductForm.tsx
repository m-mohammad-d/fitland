"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema, type ProductFormValues } from "@/lib/schemas/productSchema";
import Input from "@/components/ui/Input";
import ImageUpload from "@/components/ui/ImageUpload";
import MultiSelect from "@/components/ui/MultiSelect";
import { useMutation } from "@apollo/client";
import { ADD_PRODUCT } from "@/graphql/mutations/productMutations";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import UploadSpinner from "@/components/ui/UploadSpinner";
import { Category } from "@/types/Category";
import { colors } from "@/constants/Colors";
import { Sizes } from "@/constants/Sizes";

interface CategoryOption {
  value: string;
  label: string;
}

interface ProductFormProps {
  categories: Category[];
}

export default function ProductForm({ categories }: ProductFormProps) {
  const router = useRouter();
  const [createProduct, { loading }] = useMutation(ADD_PRODUCT, {
    onCompleted: () => {
      toast.success("محصول با موفقیت ایجاد شد");
      router.push("/dashboard/products");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      images: [],
      colors: [],
      sizes: [],
      isActive: true,
    },
  });

  const onSubmit = (data: ProductFormValues) => {
    // Convert selected hex values to color objects
    const selectedColors = data.colors.map(hex => {
      const color = colors.find(c => c.hex === hex);
      return {
        hex,
        name: color?.name || "نامشخص"
      };
    });

    createProduct({
      variables: {
        name: data.name,
        description: data.description,
        price: data.price,
        stock: data.stock,
        images: data.images,
        colors: selectedColors,
        sizes: data.sizes,
        categoryId: data.categoryId,
      },
    });
  };

  const categoryOptions: CategoryOption[] = categories?.map((category) => ({
    value: category.id,
    label: category.name,
  }));

  // Transform colors array to Option format
  const colorOptions = colors.map(color => ({
    value: color.hex,
    label: color.name
  }));

  // Transform sizes array to Option format
  const sizeOptions = Sizes.map(size => ({
    value: size,
    label: size
  }));

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <Input label="نام محصول" errorMessage={errors.name?.message} {...register("name")} />

        <Input label="برند" errorMessage={errors.brand?.message} {...register("brand")} />

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

        <div className="flex items-center gap-2">
          <input type="checkbox" {...register("isActive")} className="text-primary-600 focus:ring-primary-500 h-4 w-4 rounded border-gray-300" />
          <label className="text-sm font-medium text-gray-700">فعال</label>
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <button type="button" onClick={() => router.back()} className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
          انصراف
        </button>
        <button
          type="submit"
          disabled={loading}
          className="bg-primary-600 hover:bg-primary-700 focus:ring-primary-500 rounded-lg px-4 py-2 text-sm font-medium text-white focus:ring-2 focus:ring-offset-2 focus:outline-none"
        >
          {loading ? <UploadSpinner /> : "ایجاد محصول"}
        </button>
      </div>
    </form>
  );
}
