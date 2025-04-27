"use client";

import { useCart } from "@/store/useCart";
import Link from "next/link";
import { useState } from "react";
import { FaCreditCard, FaWallet, FaCashRegister } from "react-icons/fa";
import { cn } from "@/lib/utils";

const paymentMethods = [
  {
    id: "credit-card",
    name: "کارت اعتباری",
    description: "پرداخت از طریق کارت بانکی عضو شبکه شتاب.",
    icon: <FaCreditCard size={32} />,
    value: "ONLINE",
  },
  {
    id: "wallet",
    name: "کیف پول آنلاین",
    description: "پرداخت از طریق کیف پول‌های دیجیتال.",
    icon: <FaWallet size={32} />,
    value: "WALLET",
  },
  {
    id: "cash-on-delivery",
    name: "پرداخت در محل",
    description: "پرداخت به صورت نقدی هنگام تحویل سفارش.",
    icon: <FaCashRegister size={32} />,
    value: "ON_DELIVERY",
  },
];

function PaymentMethods() {
  const { setCheckoutField, checkout } = useCart();

  const [selectedMethod, setSelectedMethod] = useState<
    "ONLINE" | "ON_DELIVERY" | "WALLET" | null
  >(checkout.paymentMethod || null);

  const handleSelectPaymentMethod = (
    id: string,
    value: "ONLINE" | "ON_DELIVERY" | "WALLET"
  ) => {
    setSelectedMethod(value);
    setCheckoutField("paymentMethod", value);
  };

  return (
    <div>
      <div className="space-y-4">
        {paymentMethods.map((method) => (
          <div
            key={method.id}
            className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ease-in-out ${
              selectedMethod === method.value
                ? "border-primary-600 bg-primary-50 shadow-lg"
                : "border-neutral-300 hover:border-primary-400"
            }`}
            onClick={() =>
              handleSelectPaymentMethod(
                method.id,
                method.value as "ONLINE" | "ON_DELIVERY" | "WALLET"
              )
            }
          >
            <div className="flex items-center space-x-4">
              <div className="text-primary-600">{method.icon}</div>
              <div>
                <h3 className="text-lg font-semibold text-neutral-800">
                  {method.name}
                </h3>
                <p className="text-sm text-neutral-600">{method.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-6">
        <Link
          href={selectedMethod ? "/checkout/confirmation" : {}}
          className={cn(
            "w-full inline-block text-center bg-primary-600 hover:bg-primary-700 text-white py-3 px-4 rounded-lg transition-colors font-medium shadow-md hover:shadow-lg",
            selectedMethod || "bg-neutral-500 hover:bg-neutral-600"
          )}
        >
          تایید روش پرداخت و تکمیل سفارش
        </Link>
      </div>
    </div>
  );
}

export default PaymentMethods;
