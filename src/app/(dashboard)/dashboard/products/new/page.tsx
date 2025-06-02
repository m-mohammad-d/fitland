import { GET_CATEGORIES } from "@/graphql/queries/categoryQueries";
import { graphQLFetch } from "@/lib/graphqlFetch";
import { GraphQLFetchGetCategorysResponse } from "@/types/Category";
import AddProductForm from "@/components/dashboard/AddProductForm";
export const dynamic = "force-dynamic";

export default async function NewProductPage() {
  const categoryResponse = await graphQLFetch<GraphQLFetchGetCategorysResponse>(process.env.NEXT_PUBLIC_BACKEND_URL || "", GET_CATEGORIES.loc?.source.body as string);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">افزودن محصول جدید</h1>
      </div>

      <AddProductForm categories={categoryResponse?.data?.categories} />
    </div>
  );
}
