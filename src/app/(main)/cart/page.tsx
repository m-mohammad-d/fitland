import CartClient from "./CartClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "سبد خرید",
  description: "محصولات انتخابی شما در یک جا. آماده پرداخت هستید؟",
  openGraph: {
    title: "سبد خرید | FitLand",
    description: "محصولات مورد علاقه‌تان را مرور و نهایی کنید.",
  },
  twitter: {
    title: "سبد خرید",
    description: "محصولات انتخابی‌تان را برای پرداخت بررسی کنید.",
  },
};

export default function CartPage() {
  return <CartClient />;
}
