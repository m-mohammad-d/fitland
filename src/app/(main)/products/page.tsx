import ProductsPageContent from "@/components/products/ProductsPageContent";
import FilterProvider from "@/provider/FilterProvider";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "لیست محصولات",
  description: "مرور کامل محصولات ورزشی فیت‌لند. از کفش و تیشرت تا شلوار و تجهیزات بدنسازی.",
  openGraph: {
    title: "لیست محصولات | FitLand",
    description: "با تنوع بالا و قیمت مناسب، فیت‌لند انتخاب اول ورزشکارهاست.",
  },
  twitter: {
    title: "لیست محصولات",
    description: "محصولات ورزشی متنوع فقط در فروشگاه فیت‌لند.",
  },
};
export default function ProductsPage() {
  return (
    <FilterProvider>
      <ProductsPageContent />
    </FilterProvider>
  );
}
