"use client";
import DotSpinner from "@/components/ui/DotSpinner";
import { GET_ORDER_BY_ID } from "@/graphql/queries/orderQueries";
import { formatJalaliDate } from "@/lib/Date";
import { GetOrderByIdResponse } from "@/types/Order";
import { useQuery } from "@apollo/client";
import { use } from "react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { FiPhone, FiUser, FiMapPin, FiCalendar, FiTruck, FiCreditCard, FiHash } from "react-icons/fi";
import OrderItemCard from "@/components/account/OrderItemCard";

interface Props {
  params: Promise<{ id: string }>;
}

function OrderDetailsPage({ params }: Props) {
  const { id } = use(params);
  const { data, loading } = useQuery<GetOrderByIdResponse>(GET_ORDER_BY_ID, {
    variables: { id },
  });

  const paymentMethodMap: Record<string, string> = {
    ONLINE: "پرداخت آنلاین",
    ON_DELIVERY: "پرداخت در محل",
    WALLET: "پرداخت با کیف پول",
  };

  if (loading) return <DotSpinner />;

  return (
    <div className="mx-auto px-4 py-6 text-xs md:text-base">
      <div className="flex items-center gap-1 border-b-2 border-b-neutral-400 pb-4 text-neutral-800">
        <MdOutlineKeyboardArrowRight size={25} />
        <h1 className="text-2xl font-semibold">اطلاعات سفارش</h1>
      </div>

      <div className="grid grid-cols-1 gap-4 border-b border-neutral-300 py-6 sm:grid-cols-2">
        <div className="flex items-center gap-2">
          <FiHash className="text-blue-500" />
          <span className="text-neutral-700">کد سفارش:</span>
          <span className="font-medium">{data?.getOrderById.id}</span>
        </div>
        <div className="flex items-center gap-2">
          <FiCalendar className="text-green-600" />
          <span className="text-neutral-700">تاریخ ثبت:</span>
          <span className="font-medium">{formatJalaliDate(data?.getOrderById.createdAt as number)}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 border-b border-neutral-300 py-6 sm:grid-cols-2">
        <div className="flex items-center gap-2">
          <FiUser className="text-purple-500" />
          <span className="text-neutral-700">تحویل گیرنده:</span>
          <span className="font-medium">{data?.getOrderById.user.name}</span>
        </div>
        <div className="flex items-center gap-2">
          <FiPhone className="text-pink-500" />
          <span className="text-neutral-700">شماره موبایل:</span>
          <span className="font-medium">{data?.getOrderById.user.phone || "تعیین نشده"}</span>
        </div>
      </div>

      <div className="flex items-start gap-2 border-b border-neutral-300 py-6">
        <FiMapPin className="mt-1 text-red-500" />
        <div>
          <p className="mb-1 font-medium text-neutral-700">آدرس:</p>
          <p className="leading-relaxed">
            {data?.getOrderById.address.fullAddress}
            {` - کدپستی: ${data?.getOrderById.address.zipCode}`}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 py-6 sm:grid-cols-3">
        <div className="flex items-center gap-2">
          <FiCreditCard className="text-yellow-600" />
          <span className="text-neutral-700">روش پرداخت:</span>
          <span className="font-medium">{paymentMethodMap[data?.getOrderById.paymentMethod as keyof typeof paymentMethodMap] || "نامشخص"}</span>
        </div>
        <div className="flex items-center gap-2">
          <FiTruck className="text-cyan-600" />
          <span className="text-neutral-700">هزینه ارسال:</span>
          <span className="font-medium">{data?.getOrderById.shippingCost} تومان</span>
        </div>
        <div className="flex items-center gap-2">
          <FiCreditCard className="text-emerald-600" />
          <span className="text-neutral-700">مبلغ کل:</span>
          <span className="font-medium">{data?.getOrderById.totalPrice} تومان</span>
        </div>
      </div>
      <div>{data?.getOrderById.items.map((item, index) => <OrderItemCard item={item} key={`${item.id}-${index}`} />)}</div>
    </div>
  );
}

export default OrderDetailsPage;
