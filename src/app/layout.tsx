import { Metadata } from "next";
import "./globals.css";
import ApolloClientProvider from "@/provider/ApolloClientProvider";
import { Toaster } from "react-hot-toast";

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
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <ApolloClientProvider>{children}</ApolloClientProvider>
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
