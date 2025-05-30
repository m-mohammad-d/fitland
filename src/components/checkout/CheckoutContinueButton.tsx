"use client";

import { useCart } from "@/store/useCart";
import Link from "next/link";

interface CheckoutContinueButtonProps {
  href: string;
  text: string;
  validationField: "addressId" | "deliveryDate";
}

export default function CheckoutContinueButton({ href, text, validationField }: CheckoutContinueButtonProps) {
  const { checkout } = useCart();


  return (
    <Link
      href={checkout[validationField] ? href : {}}
      className={`inline-block w-full rounded-lg px-4 py-3 text-center font-medium text-white shadow-md transition-colors hover:shadow-lg ${
        checkout[validationField] ? "bg-primary-600 hover:bg-primary-700" : "cursor-not-allowed bg-neutral-400"
      }`}
    >
      {text}
    </Link>
  );
}
