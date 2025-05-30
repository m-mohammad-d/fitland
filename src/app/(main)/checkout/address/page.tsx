import AddressList from "@/components/checkout/AddressList";
import AddressModal from "@/components/checkout/AddressModal";
import OrderProgressBar from "@/components/checkout/OrderProgressBar";
import CheckoutContinueButton from "@/components/checkout/CheckoutContinueButton";
import { GET_USER_ADDRESS } from "@/graphql/queries/addressQueries";
import { graphQLFetch } from "@/lib/graphqlFetch";
import { GetAddressesResponse } from "@/types/Address";
import { Metadata } from "next/types";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "آدرس تحویل",
  description: "لطفاً آدرس تحویل سفارش خود را وارد کنید.",
  openGraph: {
    title: "انتخاب آدرس | FitLand",
    description: "برای دریافت سفارش، آدرس مناسب را وارد کنید.",
  },
  twitter: {
    title: "آدرس سفارش",
    description: "آدرس تحویل کالا را وارد نمایید.",
  },
};

async function CheckOutAddress() {
  const res = await graphQLFetch<GetAddressesResponse>(process.env.NEXT_PUBLIC_BACKEND_URL || "", GET_USER_ADDRESS.loc?.source.body as string);

  return (
    <div className="container mx-auto">
      <OrderProgressBar currentStep={1} />
      <div className="my-12 flex flex-col gap-6 px-4 md:flex-row">
        <div className="w-full">
          <AddressList addresses={res?.data?.getUserAddress} />
          <AddressModal />
        </div>
        <div className="mt-6 md:mt-0">
          <div className="bg-background rounded-xl border border-neutral-100 p-6 shadow-lg">
            <h2 className="mb-6 text-xl font-semibold">توجه به انتخاب آدرس</h2>

            <div className="space-y-4">
              <div className="text-neutral-600">لطفاً در انتخاب آدرس دقیق باشید تا فرآیند خرید شما بدون مشکل ادامه یابد.</div>
              <div className="text-neutral-600">در صورت لزوم، می‌توانید آدرس جدیدی اضافه کنید.</div>
            </div>

            <div className="py-4">
              <CheckoutContinueButton
                href="/checkout/delivery"
                text="ادامه فرآیند خرید"
                validationField="addressId"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckOutAddress;
