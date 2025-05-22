import UpdateProductForm from "@/components/dashboard/UpdateProductForm";
import { GET_CATEGORIES } from "@/graphql/queries/categoryQueries";
import { GET_PRODUCT_BY_ID } from "@/graphql/queries/productQueries";
import { graphQLFetch } from "@/lib/graphqlFetch";
import { GraphQLFetchGetCategorysResponse } from "@/types/Category";
import { Product } from "@/types/Products";

interface GetProductResponse {
  data: {
    product: Product;
  };
}

export default async function UpdateProductPage({ params }: { params: { id: string } }) {
  const [categoryResponse, productResponse] = await Promise.all([
    graphQLFetch<GraphQLFetchGetCategorysResponse>(process.env.NEXT_PUBLIC_BACKEND_URL || "", GET_CATEGORIES.loc?.source.body as string),
    graphQLFetch<GetProductResponse>(process.env.NEXT_PUBLIC_BACKEND_URL || "", GET_PRODUCT_BY_ID.loc?.source.body as string, { id: params.id }),
  ]);

  const product = productResponse.data.product;

  if (!product) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <h1 className="text-2xl font-bold text-gray-900">محصول یافت نشد</h1>
      </div>
    );
  }

  // Transform product data to match form values
  const defaultValues = {
    name: product.name,
    description: product.description,
    price: product.price,
    stock: product.stock,
    categoryId: product.categoryId,
    brand: product.brand, // Add default value for brand
    images: product.images,
    colors: product.colors?.map((color) => color.hex) || [],
    sizes: product.sizes,
    discount: product.discount,
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">ویرایش محصول</h1>
      </div>

      <UpdateProductForm categories={categoryResponse.data.categories} defaultValues={defaultValues} productId={params.id} />
    </div>
  );
}
