import BenefitsSection from "@/components/home/BenefitsSection";
import Hero from "@/components/home/Hero";
import MainOffers from "@/components/home/MainOffer";
import ProductHighlight from "@/components/products/ProductHighlight";
import { GET_PRODUCTS } from "@/graphql/queries/productQueries";
import { graphQLFetch } from "@/lib/graphqlFetch";
import { GetProductsResponse } from "@/types/Products";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [discountedProductsResponse, newProductsResponse] = await Promise.all([
    graphQLFetch<GetProductsResponse>(process.env.NEXT_PUBLIC_BACKEND_URL || "", GET_PRODUCTS.loc?.source.body as string, {
      sortBy: "price",
      pageSize: 8,
    }),
    graphQLFetch<GetProductsResponse>(process.env.NEXT_PUBLIC_BACKEND_URL || "", GET_PRODUCTS.loc?.source.body as string, {
      sortBy: "createdAt",
      pageSize: 8,
    }),
  ]);

  const discountedProducts = discountedProductsResponse?.data?.products?.items;
  const newProducts = newProductsResponse?.data?.products?.items;

  return (
    <div>
      <Hero />
      <MainOffers
        offers={[
          {
            image: "/images/nike-shirt.webp",
            title: "جدید ترین تخفیفات فصل برند نایک",
            brand: "نایک",
          },
          {
            image: "/images/puma-shirt.webp",
            title: "جدید ترین تخفیفات فصل برند پوما",
            brand: "پوما",
          },
        ]}
      />
      <ProductHighlight title="بیشترین تخفیف" products={discountedProducts} sliderId="discount" />
      <ProductHighlight title="جدیدترین محصولات" products={newProducts} sliderId="new" />
      <MainOffers
        offers={[
          {
            image: "/images/adidas-shirt.webp",
            title: "جدیدترین محصولات آدیداس",
            brand: "آدیداس",
          },
          {
            image: "/images/reebok-shirt.webp",
            title: "جدیدترین محصولات ریباک",
            brand: "ریباک",
          },
        ]}
      />
      <BenefitsSection />
    </div>
  );
}
