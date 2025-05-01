"use client";

import { useCart } from "@/store/useCart";
import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_ORDER_MUTATION } from "@/graphql/mutations/OrderMutation";
import { useRouter } from "next/navigation";
import {
  AiOutlineHome,
  AiOutlineCalendar,
  AiOutlineCreditCard,
  AiOutlineTruck,
  AiOutlinePercentage,
  AiOutlineShoppingCart,
  AiOutlineWarning,
} from "react-icons/ai";
import { GET_ADDRESS_BY_ID } from "@/graphql/queries/addressQueries";
import DotSpinner from "@/components/ui/DotSpinner";

function CheckoutConfirmation() {
  const { checkout, items, getTotal } = useCart();
  const [orderError, setOrderError] = useState<string | null>(null);
  const router = useRouter();
  const { data, loading: isLoadingAddress } = useQuery(GET_ADDRESS_BY_ID, {
    variables: { id: checkout.addressId },
  });
  const finalTotalPrice =
    getTotal() - (checkout.discountAmount || 0) + (checkout.tax || 0);

  const [createOrder, { loading }] = useMutation(CREATE_ORDER_MUTATION, {
    onCompleted: (data) => {
      router.push(`/order/${data.createOrder.id}`);
    },
    onError: (error) => {
      setOrderError(error.message);
    },
  });

  const handleSubmit = () => {
    if (
      !checkout.addressId ||
      !checkout.deliveryDate ||
      !checkout.paymentMethod
    ) {
      setOrderError("لطفاً تمام اطلاعات را پر کنید.");
      return;
    }

    const orderInput = {
      items: items.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
      })),
      addressId: checkout.addressId,
      discountCode: checkout.discountCode || "",
      deliveryDate: checkout.deliveryDate,
      paymentMethod: checkout.paymentMethod,
      shippingCost: checkout.shippingCost || 0,
      tax: checkout.tax || 0,
      totalPrice: getTotal(),
    };

    createOrder({ variables: { input: orderInput } });
  };

  const paymentMethodMap: Record<string, string> = {
    ONLINE: "پرداخت آنلاین",
    ON_DELIVERY: "پرداخت در محل",
    WALLET: "پرداخت با کیف پول",
  };
  if (isLoadingAddress) return <DotSpinner />;
  return (
    <div className="container mx-auto my-12 px-4 max-w-2xl">
      <h2 className="text-3xl text-neutral-800 font-extrabold mb-8 border-b pb-4">
        تایید نهایی سفارش
      </h2>

      <div className="bg-white p-6 rounded-2xl shadow-xl border border-neutral-200 space-y-6 text-sm sm:text-base">
        {orderError && (
          <div className="bg-red-50 border border-red-400 text-red-600 px-4 py-3 rounded-md flex items-center gap-2">
            <AiOutlineWarning className="text-xl" />
            <span>{orderError}</span>
          </div>
        )}

        <div className="space-y-4 text-neutral-700">
          <div className="flex items-start gap-3">
            <AiOutlineHome className="text-xl text-primary-600 mt-1" />
            <p>
              <strong>آدرس تحویل:</strong>
              {`${data.getAddressById.province}، ${data.getAddressById.city}، ${data.getAddressById.street}، ${data.getAddressById.alley}، پلاک ${data.getAddressById.plaque}،
              واحد ${data.getAddressById.unit}، 
      `}
            </p>
          </div>

          <div className="flex items-start gap-3">
            <AiOutlineCalendar className="text-xl text-primary-600 mt-1" />
            <p>
              <strong>تاریخ تحویل:</strong> {checkout.deliveryDate}
            </p>
          </div>

          <div className="flex items-start gap-3">
            <AiOutlineCreditCard className="text-xl text-primary-600 mt-1" />
            <p>
              <strong>روش پرداخت:</strong>
              {paymentMethodMap[
                checkout.paymentMethod as "ONLINE" | "ON_DELIVERY" | "WALLET"
              ] || "نامشخص"}
            </p>
          </div>

          <div className="flex items-start gap-3">
            <AiOutlineTruck className="text-xl text-primary-600 mt-1" />
            <p>
              <strong>هزینه ارسال:</strong>
              {checkout.shippingCost?.toLocaleString() || "۰"} تومان
            </p>
          </div>

          <div className="flex items-start gap-3">
            <AiOutlinePercentage className="text-xl text-primary-600 mt-1" />
            <p>
              <strong>کد تخفیف:</strong> {checkout.discountCode || "ندارد"}
            </p>
          </div>

          <div className="flex items-start gap-3">
            <AiOutlineShoppingCart className="text-xl text-primary-600 mt-1" />
            <p>
              <strong>تعداد اقلام:</strong> {items.length} مورد
            </p>
          </div>

          {checkout.tax !== undefined && (
            <div className="flex items-start gap-3">
              <AiOutlinePercentage className="text-xl text-primary-600 mt-1" />
              <p>
                <strong>مالیات:</strong> {checkout.tax?.toLocaleString() || 0}
                تومان
              </p>
            </div>
          )}

          {checkout.discountAmount !== undefined && (
            <div className="flex items-start gap-3">
              <AiOutlinePercentage className="text-xl text-primary-600 mt-1" />
              <p>
                <strong>تخفیف اعمال‌شده:</strong>
                {checkout.discountAmount?.toLocaleString() || 0} تومان
              </p>
            </div>
          )}

          <div className="flex items-start gap-3">
            <AiOutlineShoppingCart className="text-xl text-primary-600 mt-1" />
            <p>
              <strong>جمع قابل پرداخت:</strong>
              {finalTotalPrice.toLocaleString()} تومان
            </p>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`w-full py-3 mt-6 rounded-xl font-semibold text-lg transition-colors ${
            loading
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-primary-600 hover:bg-primary-700 text-white"
          }`}
        >
          {loading ? "در حال ثبت سفارش..." : "تایید سفارش"}
        </button>
      </div>
    </div>
  );
}

export default CheckoutConfirmation;
