"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { ListFormData, listFormSchema } from "@/validator/ProductList";

interface ListFormProps {
  initialTitle?: string;
  onSubmit: (data: ListFormData) => void;
  onCancel: () => void;
  submitText: string;
  cancelText: string;
  title: string;
  isLoading?: boolean;
}

export default function ListForm({ initialTitle = "", onSubmit, onCancel, submitText, cancelText, title, isLoading = false }: ListFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ListFormData>({
    resolver: zodResolver(listFormSchema),
    defaultValues: {
      title: initialTitle,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900">{title}</h3>
      <div className="space-y-2">
        <Input {...register("title")} placeholder="عنوان فهرست" className="w-full" errorMessage={errors.title?.message} />
      </div>
      <div className="flex justify-end gap-2">
        <Button type="button" onClick={onCancel} variant="outline" size="medium" disabled={isLoading}>
          {cancelText}
        </Button>
        <Button type="submit" variant="fill" size="medium" disabled={isLoading}>
          {isLoading ? "در حال ذخیره..." : submitText}
        </Button>
      </div>
    </form>
  );
}
