import { Metadata } from "next";
import "./globals.css";
import ApolloClientProvider from "@/provider/ApolloClientProvider";
import { Toaster } from "react-hot-toast";
import { BASE_URL } from "@/lib/Config";
import NextTopLoader from "nextjs-toploader";

export const metadata: Metadata = {
  title: {
    default: "فروشگاه فیت‌لند | FitLand",
    template: "%s | FitLand",
  },
  description: "فروشگاه آنلاین لباس ورزشی با بهترین کیفیت و قیمت مناسب.",
  metadataBase: new URL(BASE_URL),
  openGraph: {
    type: "website",
    locale: "fa_IR",
    url: BASE_URL,
    title: "فروشگاه فیت‌لند | FitLand",
    description: "خرید لباس ورزشی شیک، با کیفیت و اقتصادی فقط از فیت‌لند.",
    siteName: "فیت‌لند",
  },
  twitter: {
    card: "summary_large_image",
    title: "فروشگاه فیت‌لند | FitLand",
    description: "لباس ورزشی مناسب سلیقه تو!",
    site: "@fitland",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
  robots: {
    index: true,
    follow: true,
  },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <NextTopLoader color="#fa541c" shadow="0 0 10px #417F56,0 0 5px #fa541c"/>
        <ApolloClientProvider>{children}</ApolloClientProvider>
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
