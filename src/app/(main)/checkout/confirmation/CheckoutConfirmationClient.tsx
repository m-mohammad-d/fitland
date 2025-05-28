"use client";

import { useCart } from "@/store/useCart";
import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_ORDER_MUTATION } from "@/graphql/mutations/OrderMutation";
import { useRouter } from "next/navigation";
import { AiOutlineHome, AiOutlineCalendar, AiOutlineCreditCard, AiOutlineTruck, AiOutlinePercentage, AiOutlineShoppingCart, AiOutlineWarning } from "react-icons/ai";
import { GET_ADDRESS_BY_ID } from "@/graphql/queries/addressQueries";
import DotSpinner from "@/components/ui/DotSpinner";
import { WALLET_WITHDRAW } from "@/graphql/mutations/WalletMutation";
import toast from "react-hot-toast";
import { ApoloGetAddressByIdResponse } from "@/types/Address";

function CheckoutConfirmationClient() {
  const { checkout, items, getTotal, clearCart, clearCheckout, getFinalTotal } = useCart();
  const [orderError, setOrderError] = useState<string | null>(null);
  const router = useRouter();

  const { data, loading: isLoadingAddress } = useQuery<ApoloGetAddressByIdResponse>(GET_ADDRESS_BY_ID, {
    variables: { id: checkout.addressId },
  });

  const finalTotalPrice = getFinalTotal();

  const orderInput = {
    items: items.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
      priceAtPurchase: item.price,
      color: item.color,
      size: item.size,
    })),
    addressId: checkout.addressId,
    discountCode: checkout.discountCode || "",
    deliveryDate: checkout.deliveryDate,
    paymentMethod: checkout.paymentMethod,
    shippingCost: checkout.shippingCost || 0,
    tax: checkout.tax || 0,
    totalPrice: getTotal(),
  };

  const [createOrder, { loading: isCreatingOrder }] = useMutation(CREATE_ORDER_MUTATION, {
    onCompleted: async () => {
      toast.success("سفارش با موفقیت ثبت شد");

      await router.push(`/checkout/success`);

      clearCart();

      clearCheckout();
    },
    onError: (error) => {
      setOrderError(error.message);
    },
  });

  const [walletWithdraw, { loading: isWithdrawing }] = useMutation(WALLET_WITHDRAW, {
    variables: { amount: finalTotalPrice },
    onCompleted: () => {
      createOrder({ variables: { input: orderInput } });
    },
    onError: (error) => {
      setOrderError(error.message || "پرداخت از کیف پول ناموفق بود.");
    },
  });

  const handleSubmit = () => {
    setOrderError(null);

    if (!checkout.addressId || !checkout.deliveryDate || !checkout.paymentMethod) {
      setOrderError("لطفاً تمام اطلاعات را پر کنید.");
      return;
    }

    switch (checkout.paymentMethod) {
      case "ON_DELIVERY":
        createOrder({ variables: { input: orderInput } });
        break;
      case "ONLINE":
        router.push("/checkout/payment");
        break;
      case "WALLET":
        walletWithdraw();
        break;
      default:
        setOrderError("روش پرداخت معتبر نیست.");
    }
  };

  const paymentMethodMap: Record<string, string> = {
    ONLINE: "پرداخت آنلاین",
    ON_DELIVERY: "پرداخت در محل",
    WALLET: "پرداخت با کیف پول",
  };

  if (isLoadingAddress) return <DotSpinner />;

  return (
    <div className="container mx-auto my-12 max-w-2xl px-4">
      <h2 className="mb-8 border-b pb-4 text-3xl font-extrabold text-neutral-800">تایید نهایی سفارش</h2>

      <div className="space-y-6 rounded-2xl border border-neutral-200 bg-white p-6 text-sm shadow-xl sm:text-base">
        {orderError && (
          <div className="flex items-center gap-2 rounded-md border border-red-400 bg-red-50 px-4 py-3 text-red-600">
            <AiOutlineWarning className="text-xl" />
            <span>{orderError}</span>
          </div>
        )}

        <div className="space-y-4 text-neutral-700">
          <div className="flex items-start gap-3">
            <AiOutlineHome className="text-primary-600 mt-1 text-xl" />
            <p>
              <strong>آدرس تحویل:</strong>{" "}
              {`${data?.getAddressById?.fullAddress}`}
            </p>
          </div>

          <div className="flex items-start gap-3">
            <AiOutlineCalendar className="text-primary-600 mt-1 text-xl" />
            <p>
              <strong>تاریخ تحویل:</strong> {checkout.deliveryDate}
            </p>
          </div>

          <div className="flex items-start gap-3">
            <AiOutlineCreditCard className="text-primary-600 mt-1 text-xl" />
            <p>
              <strong>روش پرداخت:</strong> {paymentMethodMap[checkout.paymentMethod as "ONLINE" | "WALLET" | "ON_DELIVERY"] || "نامشخص"}
            </p>
          </div>

          <div className="flex items-start gap-3">
            <AiOutlineTruck className="text-primary-600 mt-1 text-xl" />
            <p>
              <strong>هزینه ارسال:</strong> {`${checkout.shippingCost?.toLocaleString() || "۰"} تومان`}
            </p>
          </div>

          <div className="flex items-start gap-3">
            <AiOutlinePercentage className="text-primary-600 mt-1 text-xl" />
            <p>
              <strong>کد تخفیف:</strong> {checkout.discountCode || "ندارد"}
            </p>
          </div>

          <div className="flex items-start gap-3">
            <AiOutlineShoppingCart className="text-primary-600 mt-1 text-xl" />
            <p>
              <strong>تعداد اقلام:</strong> {items.length} مورد
            </p>
          </div>

          {checkout.tax !== undefined && (
            <div className="flex items-start gap-3">
              <AiOutlinePercentage className="text-primary-600 mt-1 text-xl" />
              <p>
                <strong>مالیات:</strong> {checkout.tax.toLocaleString()} تومان
              </p>
            </div>
          )}

          {checkout.discountAmount !== undefined && (
            <div className="flex items-start gap-3">
              <AiOutlinePercentage className="text-primary-600 mt-1 text-xl" />
              <p>
                <strong>تخفیف:</strong> {checkout.discountAmount.toLocaleString()} تومان
              </p>
            </div>
          )}

          <div className="flex items-start gap-3">
            <AiOutlineShoppingCart className="text-primary-600 mt-1 text-xl" />
            <p>
              <strong>جمع قابل پرداخت:</strong> {finalTotalPrice.toLocaleString()} تومان
            </p>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={isCreatingOrder || isWithdrawing}
          className={`mt-6 w-full rounded-xl py-3 text-lg font-semibold transition-colors ${
            isCreatingOrder || isWithdrawing ? "cursor-not-allowed bg-gray-300 text-gray-600" : "bg-primary-600 hover:bg-primary-700 text-white"
          }`}
        >
          {isCreatingOrder || isWithdrawing ? "در حال ثبت سفارش..." : "تایید سفارش"}
        </button>
      </div>
    </div>
  );
}

export default CheckoutConfirmationClient;
