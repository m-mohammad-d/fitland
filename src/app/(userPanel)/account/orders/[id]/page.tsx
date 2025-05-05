"use client";
import DotSpinner from "@/components/ui/DotSpinner";
import { GET_ORDER_BY_ID } from "@/graphql/queries/orderQueries";
import { formatJalaliDate } from "@/lib/Date";
import { GetOrderByIdResponse } from "@/types/Order";
import { useQuery } from "@apollo/client";
import { use } from "react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import {
  FiPhone,
  FiUser,
  FiMapPin,
  FiCalendar,
  FiTruck,
  FiCreditCard,
  FiHash,
} from "react-icons/fi";
import Image from "next/image";
import { colors } from "@/lib/Colors";
import Link from "next/link";
import { BiComment } from "react-icons/bi";
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
    <div className="px-4 py-6 mx-auto text-xs md:text-base">
      <div className="pb-4 border-b-2 text-neutral-800 flex items-center gap-1 border-b-neutral-400">
        <MdOutlineKeyboardArrowRight size={25} />
        <h1 className="text-2xl font-semibold">اطلاعات سفارش</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-6 border-b border-neutral-300">
        <div className="flex items-center gap-2">
          <FiHash className="text-blue-500" />
          <span className="text-neutral-700">کد سفارش:</span>
          <span className="font-medium">{data?.getOrderById.id}</span>
        </div>
        <div className="flex items-center gap-2">
          <FiCalendar className="text-green-600" />
          <span className="text-neutral-700">تاریخ ثبت:</span>
          <span className="font-medium">
            {formatJalaliDate(data?.getOrderById.createdAt as number)}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-6 border-b border-neutral-300">
        <div className="flex items-center gap-2">
          <FiUser className="text-purple-500" />
          <span className="text-neutral-700">تحویل گیرنده:</span>
          <span className="font-medium">{data?.getOrderById.user.name}</span>
        </div>
        <div className="flex items-center gap-2">
          <FiPhone className="text-pink-500" />
          <span className="text-neutral-700">شماره موبایل:</span>
          <span className="font-medium">
            {data?.getOrderById.user.phone || "تعیین نشده"}
          </span>
        </div>
      </div>

      <div className="flex items-start gap-2 py-6 border-b border-neutral-300">
        <FiMapPin className="mt-1 text-red-500" />
        <div>
          <p className="text-neutral-700 font-medium mb-1">آدرس:</p>
          <p className="leading-relaxed">
            {`${data?.getOrderById.address.province}، ${data?.getOrderById.address.city}، ${data?.getOrderById.address.street}`}
            {data?.getOrderById.address.alley
              ? `، کوچه ${data?.getOrderById.address.alley}`
              : ""}
            {`، پلاک ${data?.getOrderById.address.plaque}`}
            {data?.getOrderById.address.unit
              ? `، واحد ${data?.getOrderById.address.unit}`
              : ""}
            {` - کدپستی: ${data?.getOrderById.address.zipCode}`}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-6">
        <div className="flex items-center gap-2">
          <FiCreditCard className="text-yellow-600" />
          <span className="text-neutral-700">روش پرداخت:</span>
          <span className="font-medium">
            {paymentMethodMap[
              data?.getOrderById.paymentMethod as keyof typeof paymentMethodMap
            ] || "نامشخص"}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <FiTruck className="text-cyan-600" />
          <span className="text-neutral-700">هزینه ارسال:</span>
          <span className="font-medium">
            {data?.getOrderById.shippingCost} تومان
          </span>
        </div>
        <div className="flex items-center gap-2">
          <FiCreditCard className="text-emerald-600" />
          <span className="text-neutral-700">مبلغ کل:</span>
          <span className="font-medium">
            {data?.getOrderById.totalPrice} تومان
          </span>
        </div>
      </div>
      <div>
        {data?.getOrderById.items.map((item, index) => (
          <OrderItemCard item={item} key={`${item.id}-${index}`} />
        ))}
      </div>
    </div>
  );
}

export default OrderDetailsPage;
