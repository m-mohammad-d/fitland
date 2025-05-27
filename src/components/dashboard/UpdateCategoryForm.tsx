"use client";

import { useMutation } from "@apollo/client";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import CategoryForm from "@/components/dashboard/CategoryForm";
import { CategoryFormValues } from "@/validator/Category";
import { UPDATE_CATEGORY } from "@/graphql/mutations/categoryMutations";
import { Category } from "@/types/Category";

export default function UpdateCategoryForm({ category, categoryId }: { category: Category; categoryId: string }) {
  const router = useRouter();
  const [UpdateCategory, { loading }] = useMutation(UPDATE_CATEGORY, {
    onCompleted: () => {
      toast.success("دسته‌بندی با موفقیت ایجاد شد");
      router.push("/dashboard/categories");
      router.refresh();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleSubmit = async (data: CategoryFormValues) => {
    await UpdateCategory({
      variables: {
        input: {
          id: categoryId,
          name: data.name,
        },
      },
    });
  };

  return <CategoryForm onSubmit={handleSubmit} isLoading={loading} defaultValues={category} submitLabel="ایجاد دسته‌بندی" />;
}
