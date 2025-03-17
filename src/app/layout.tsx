import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "فیت لند | فروشگاه آنلاین لباس ورزشی",
  description:
    "خرید انواع لباس و پوشاک ورزشی با بهترین کیفیت و قیمت از فیت لند. ارسال سریع و تضمین کیفیت.",
  keywords: [
    "لباس ورزشی",
    "پوشاک ورزشی",
    "کفش ورزشی",
    "فیت لند",
    "خرید آنلاین لباس",
  ],
  creator: "فیت لند",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
