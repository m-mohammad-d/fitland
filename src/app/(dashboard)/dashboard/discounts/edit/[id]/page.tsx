import UpdateDiscountForm from "@/components/dashboard/UpdateDiscountForm";
import { GET_DISCOUNT_CODE_BY_ID } from "@/graphql/queries/discountQueries";
import { graphQLFetch } from "@/lib/graphqlFetch";
import { getDiscountCodeResponse } from "@/types/Discount";

export default async function UpdateDiscountPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const discountResponse = await graphQLFetch<getDiscountCodeResponse>(process.env.NEXT_PUBLIC_BACKEND_URL || "", GET_DISCOUNT_CODE_BY_ID.loc?.source.body as string, { id });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">ویرایش کد تخفیف</h1>
      </div>

      <UpdateDiscountForm discountId={id} defaultValues={discountResponse.data.getDiscountCodeById} />
    </div>
  );
}
