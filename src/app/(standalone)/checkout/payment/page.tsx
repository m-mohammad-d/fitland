"use client";

import PaymentGateway from "@/components/checkout/PaymentGateway";
import { CREATE_ORDER_MUTATION } from "@/graphql/mutations/OrderMutation";
import { useCart } from "@/store/useCart";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useState } from "react";

function CheckoutPayment() {
  const { checkout, items, getTotal, clearCart, clearCheckout, getFinalTotal } =
    useCart();
  const router = useRouter();
  const [orderError, setOrderError] = useState("");

  const finalTotalPrice = getFinalTotal();

  const [createOrder] = useMutation(CREATE_ORDER_MUTATION, {
    onCompleted: () => {
      toast.success("سفارش با موفقیت ثبت شد");
      router.push(`/checkout/success`);
      clearCart();
      clearCheckout();
    },
    onError: (error) => {
      setOrderError(error.message);
      toast.error("خطا در ثبت سفارش");
    },
  });

  const handleSubmit = () => {
    const orderInput = {
      items: items.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        priceAtPurchase: item.price,
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

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <PaymentGateway
        onPaymentSuccess={handleSubmit}
        amount={finalTotalPrice}
      />
      {orderError && <p className="text-red-500 mt-4 text-sm">{orderError}</p>}
    </div>
  );
}

export default CheckoutPayment;
