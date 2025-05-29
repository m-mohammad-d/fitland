import AddressList from "@/components/checkout/AddressList";
import AddressModal from "@/components/checkout/AddressModal";
import EmptyState from "@/components/ui/EmptyState";
import { GET_USER_ADDRESS } from "@/graphql/queries/addressQueries";
import { graphQLFetch } from "@/lib/graphqlFetch";
import { GetAddressesResponse } from "@/types/Address";
import { Metadata } from "next/types";
import { AiOutlineHome } from "react-icons/ai";
export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "آدرس‌های من",
  description: "مدیریت آدرس‌های ثبت‌شده برای ارسال سفارشات.",
  openGraph: {
    title: "آدرس‌ها | FitLand",
    description: "افزودن، ویرایش یا حذف آدرس‌های تحویل شما.",
  },
  twitter: {
    title: "آدرس‌های ثبت شده",
    description: "آدرس‌های خود را برای ارسال سریع‌تر مدیریت کنید.",
  },
};
async function UserAddressList() {
  const res = await graphQLFetch<GetAddressesResponse>(process.env.NEXT_PUBLIC_BACKEND_URL || "", GET_USER_ADDRESS.loc?.source.body as string);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="my-4 text-2xl text-neutral-800">ادرس ها</h1>
      {res?.data?.getUserAddress.length === 0 ? (
        <EmptyState title="هیچ آدرسی ثبت نشده است" icon={<AiOutlineHome />} description="شما هنوز آدرسی ثبت نکرده‌اید. با استفاده از دکمه زیر، آدرس جدید ثبت کنید." />
      ) : (
        <AddressList addresses={res?.data?.getUserAddress} />
      )}
      <AddressModal />
    </div>
  );
}

export default UserAddressList;
