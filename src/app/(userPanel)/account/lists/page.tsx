import { Metadata } from "next";
import ListsPageClient from "./ListsPageClient";

export const metadata: Metadata = {
  title: "فهرست‌های من",
  description: "لیستی از فهرست‌هایی که تاکنون ایجاد کرده‌اید را در اینجا ببینید و مدیریت کنید.",
  openGraph: {
    title: "فهرست‌های من | FitLand",
    description: "در این بخش می‌توانید فهرست‌های خود را مدیریت کرده و به آن‌ها دسترسی داشته باشید.",
  },
  twitter: {
    title: "فهرست‌های من",
    description: "فهرست‌های قبلی و فعال خود را در اینجا مشاهده و بررسی کنید.",
  },
};
export default function ListsPage() {
  return <ListsPageClient />;
}
