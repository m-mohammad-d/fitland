import type { Metadata } from "next";
import "./globals.css";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import PromoBar from "@/components/layout/PromoBar";
import Header from "@/components/layout/Header";
import ApolloClientProvider from "@/provider/ApolloClientProvider";
import Footer from "@/components/layout/Footer";
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
      <body className="flex flex-col min-h-screen">
        <PromoBar />
        <Header />
        <main className="flex-1">
          <NuqsAdapter>
            <ApolloClientProvider>{children}</ApolloClientProvider>
          </NuqsAdapter>
        </main>
        <Footer />
      </body>
    </html>
  );
}
