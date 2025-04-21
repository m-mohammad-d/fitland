import AddressList from "@/components/checkout/AddressList";
import AddressModal from "@/components/checkout/AddressModal";
import { GET_USER_ADDRESS } from "@/graphql/queries/addressQueries";
import { graphQLFetch } from "@/lib/graphqlFetch";
import { GetAddressesResponse } from "@/types/Address";
import Link from "next/link";

async function CheckOutAddress() {
  const res = await graphQLFetch<GetAddressesResponse>(
    process.env.NEXT_PUBLIC_BACKEND_URL || "",
    GET_USER_ADDRESS.loc?.source.body as string
  );

  return (
    <div className="container mx-auto px-4 my-12 flex gap-6 flex-col md:flex-row">
      <div className="w-full">
        <AddressList addresses={res.data.getUserAddress} />
        <AddressModal />
      </div>
      <div className="mt-6 md:mt-0">
        <div className="bg-background p-6 rounded-xl shadow-lg border border-neutral-100">
          <h2 className="text-xl font-semibold mb-6">توجه به انتخاب آدرس</h2>

          <div className="space-y-4">
            <div className="text-neutral-600">
              لطفاً در انتخاب آدرس دقیق باشید تا فرآیند خرید شما بدون مشکل ادامه
              یابد.
            </div>
            <div className="text-neutral-600">
              در صورت لزوم، می‌توانید آدرس جدیدی اضافه کنید.
            </div>
          </div>

          <div className="py-4">
            <Link
              href="/checkout/shipping"
              className="mt-12 bg-primary-600 hover:bg-primary-700 text-white py-3 px-4 rounded-lg transition-colors font-medium shadow-md hover:shadow-lg"
            >
              ادامه فرآیند خرید
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckOutAddress;
