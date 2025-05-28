import { GET_USER_ORDERS } from "@/graphql/queries/orderQueries";
import { graphQLFetch } from "@/lib/graphqlFetch";
import { GetUserOrdersResponse } from "@/types/Order";
import { Metadata } from "next/types";
import OrderContent from "@/components/account/orders/OrderContent";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "سفارش‌های من",
  description: "نمایش لیست سفارش‌هایی که تاکنون ثبت کرده‌اید.",
  openGraph: {
    title: "سفارش‌های من | FitLand",
    description: "مدیریت و مشاهده وضعیت سفارش‌های شما در فیت‌لند.",
  },
  twitter: {
    title: "سفارش‌های من",
    description: "سفارش‌های قبلی و در حال پردازش خود را بررسی کنید.",
  },
};

const statusLabels = {
  PROCESSING: "در حال پردازش",
  SHIPPED: "در حال ارسال",
  DELIVERED: "تحویل داده شده",
  CANCELED: "لغو شده",
};

async function UserOrdersPage() {
  const res = await graphQLFetch<GetUserOrdersResponse>(
    process.env.NEXT_PUBLIC_BACKEND_URL || "",
    GET_USER_ORDERS.loc?.source.body as string
  );

  const orders = res.data.getUserOrders;
  const ordersByStatus = orders.reduce(
    (acc, order) => {
      const status = order.status;
      if (!acc[status]) {
        acc[status] = [];
      }
      acc[status].push(order);
      return acc;
    },
    {} as Record<string, typeof orders>
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800 sm:text-3xl">تاریخچه سفارشات</h1>
        <p className="mt-2 text-gray-500">لیست تمام سفارشات شما در یک نگاه</p>
      </div>

      <OrderContent ordersByStatus={ordersByStatus} statusLabels={statusLabels} />
    </div>
  );
}

export default UserOrdersPage;
