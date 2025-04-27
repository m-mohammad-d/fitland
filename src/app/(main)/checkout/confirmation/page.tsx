"use client";

import { useCart } from "@/store/useCart";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_ORDER_MUTATION } from "@/graphql/mutations/OrderMutation";
import { useRouter } from "next/navigation";

function CheckoutConfirmation() {
  const { checkout, items } = useCart();
  const [orderError, setOrderError] = useState<string | null>(null);
  const router = useRouter();

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
      totalPrice: checkout.totalPrice || 0,
    };

    createOrder({ variables: { input: orderInput } });
  };

  return (
    <div className="container mx-auto my-12 px-4">
      <h2 className="text-2xl text-neutral-800 mt-6 font-bold mb-8">
        تایید سفارش
      </h2>

      <div className="bg-background p-6 rounded-xl shadow-lg border border-neutral-100">
        {orderError && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-600 p-3 mb-4">
            {orderError}
          </div>
        )}

        <div className="space-y-4 text-neutral-600 text-sm">
          <h3 className="text-xl font-semibold mb-4">اطلاعات سفارش</h3>
          <p>
            <strong>آدرس تحویل:</strong> {checkout.addressId}
          </p>
          <p>
            <strong>تاریخ تحویل:</strong> {checkout.deliveryDate}
          </p>
          <p>
            <strong>روش پرداخت:</strong> {checkout.paymentMethod}
          </p>
          <p>
            <strong>هزینه ارسال:</strong> {checkout.shippingCost} تومان
          </p>
          <p>
            <strong>مالیات:</strong> {checkout.tax} تومان
          </p>
          <p>
            <strong>کد تخفیف:</strong> {checkout.discountCode || "ندارد"}
          </p>
          <p>
            <strong>مجموع هزینه:</strong> {checkout.totalPrice} تومان
          </p>
        </div>

        <div className="mt-6">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`w-full inline-block text-center py-3 px-4 rounded-lg ${
              loading
                ? "bg-neutral-400 text-neutral-600 cursor-not-allowed"
                : "bg-primary-600 hover:bg-primary-700 text-white"
            } transition-colors font-medium shadow-md hover:shadow-lg`}
          >
            {loading ? "در حال ثبت سفارش..." : "تایید سفارش"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CheckoutConfirmation;
