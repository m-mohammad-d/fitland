"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/ui/Input";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import UploadSpinner from "@/components/ui/UploadSpinner";
import { DiscountFormValues, discountSchema } from "@/validator/Discount";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/SelectOption";

interface DiscountFormProps {
  defaultValues?: DiscountFormValues;
  onSubmit: (data: DiscountFormValues) => Promise<void>;
  isLoading?: boolean;
  submitLabel?: string;
}

export default function DiscountForm({ defaultValues, onSubmit, isLoading = false, submitLabel = "ایجاد کد تخفیف" }: DiscountFormProps) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<DiscountFormValues>({
    resolver: zodResolver(discountSchema),
    defaultValues: defaultValues || {
      isActive: true,
    },
  });

  const handleFormSubmit = async (data: DiscountFormValues) => {
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

  const type = watch("type");
  const isActive = watch("isActive");

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <Input label="کد تخفیف" errorMessage={errors.code?.message} {...register("code")} />

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">نوع تخفیف</label>
          <Select dir="rtl" value={type} onValueChange={(value) => setValue("type", value as "PERCENT" | "AMOUNT")}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="انتخاب نوع تخفیف" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="PERCENT">درصدی</SelectItem>
              <SelectItem value="AMOUNT">مبلغ ثابت</SelectItem>
            </SelectContent>
          </Select>
          {errors.type && <p className="mt-1 text-sm text-red-500">{errors.type.message}</p>}
        </div>

        <Input label="مقدار تخفیف" type="text" errorMessage={errors.value?.message} {...register("value", { valueAsNumber: true })} />

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">وضعیت</label>
          <Select dir="rtl" value={isActive ? "true" : "false"} onValueChange={(value) => setValue("isActive", value === "true")}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="انتخاب وضعیت" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="true">فعال</SelectItem>
              <SelectItem value="false">غیرفعال</SelectItem>
            </SelectContent>
          </Select>
          {errors.isActive && <p className="mt-1 text-sm text-red-500">{errors.isActive.message}</p>}
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
