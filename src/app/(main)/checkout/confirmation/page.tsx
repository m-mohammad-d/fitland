import { Metadata } from "next";
import CheckoutConfirmationClient from "./CheckoutConfirmationClient";

export const metadata: Metadata = {
  title: "تایید نهایی سفارش",
  description: "جزئیات سفارش خود را بررسی کرده و تایید نهایی را انجام دهید.",
  openGraph: {
    title: "تایید نهایی | FitLand",
    description: "همه چیز آماده است! سفارش خود را نهایی کنید.",
  },
  twitter: {
    title: "تایید سفارش",
    description: "بررسی نهایی سفارش قبل از پرداخت.",
  },
};

export default function CheckoutConfirmationPage() {
  return <CheckoutConfirmationClient />;
}
