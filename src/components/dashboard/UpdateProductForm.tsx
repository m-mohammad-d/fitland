"use client";

import { useMutation } from "@apollo/client";
import { UPDATE_PRODUCT } from "@/graphql/mutations/productMutations";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { colors } from "@/constants/Colors";
import ProductForm from "@/components/dashboard/ProductForm";
import { Category } from "@/types/Category";
import { ProductFormValues } from "@/lib/schemas/productSchema";

interface UpdateProductFormProps {
  categories: Category[];
  defaultValues: ProductFormValues;
  productId: string;
}

export default function UpdateProductForm({ categories, defaultValues, productId }: UpdateProductFormProps) {
  const router = useRouter();
  const [updateProduct, { loading }] = useMutation(UPDATE_PRODUCT, {
    onCompleted: () => {
      toast.success("محصول با موفقیت بروزرسانی شد");
      router.push("/dashboard/products");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleSubmit = async (data: ProductFormValues) => {
    // Convert selected hex values to color objects
    const selectedColors = data.colors.map(hex => {
      const color = colors.find(c => c.hex === hex);
      return {
        hex,
        name: color?.name || "نامشخص"
      };
    });

    await updateProduct({
      variables: {
        id: productId,
        name: data.name,
        description: data.description,
        price: data.price,
        stock: data.stock,
        images: data.images,
        colors: selectedColors,
        sizes: data.sizes,
        categoryId: data.categoryId,
        brand: data.brand,
        discount: data.discount,
      },
    });
  };

  return (
    <ProductForm 
      categories={categories}
      defaultValues={defaultValues}
      onSubmit={handleSubmit}
      isLoading={loading}
      submitLabel="بروزرسانی محصول"
    />
  );
} 