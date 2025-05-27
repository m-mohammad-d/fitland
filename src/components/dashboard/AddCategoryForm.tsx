"use client";

import { useMutation } from "@apollo/client";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import CategoryForm from "@/components/dashboard/CategoryForm";
import { CategoryFormValues } from "@/validator/Category";
import { ADD_CATEGORY } from "@/graphql/mutations/categoryMutations";

export default function AddCategoryForm() {
  const router = useRouter();
  const [createCategory, { loading }] = useMutation(ADD_CATEGORY, {
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
    await createCategory({
      variables: {
        name: data.name,
      },
    });
  };

  return <CategoryForm onSubmit={handleSubmit} isLoading={loading} submitLabel="ایجاد دسته‌بندی" />;
}
