import UpdateCategoryForm from "@/components/dashboard/UpdateCategoryForm";
import { GET_CATEGORY_BY_ID } from "@/graphql/queries/categoryQueries";
import { graphQLFetch } from "@/lib/graphqlFetch";
import { GetCategoryByIdResponse } from "@/types/Category";

export default async function UpdateCategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const categoryResponse = await graphQLFetch<GetCategoryByIdResponse>(process.env.NEXT_PUBLIC_BACKEND_URL || "", GET_CATEGORY_BY_ID.loc?.source.body as string, { id });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">افزودن دسته‌بندی جدید</h1>
          <p className="mt-2 text-sm text-gray-600">با استفاده از فرم زیر می‌توانید یک دسته‌بندی جدید ایجاد کنید.</p>
        </div>
      </div>

      <div className="rounded-lg p-6">
        <UpdateCategoryForm category={categoryResponse.data?.getCategoryById} categoryId={id} />
      </div>
    </div>
  );
}
