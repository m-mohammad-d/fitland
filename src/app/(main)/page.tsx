import BenefitsSection from "@/components/home/BenefitsSection";
import Hero from "@/components/home/Hero";
import MainOffers from "@/components/home/MainOffer";
import ProductHighlight from "@/components/products/ProductHighlight";
import Banner from "@/components/ui/Banner";
import { GET_PRODUCTS } from "@/graphql/queries/productQueries";
import graphQLClient from "@/lib/graphqlClient";
import { GetProductsResponse } from "@/types/Products";
import { Product } from "@prisma/client";

export default async function Home() {
  const [discountedProductsResponse, newProductsResponse] = await Promise.all([
    graphQLClient.request<GetProductsResponse>(GET_PRODUCTS, {
      sortBy: "createdAt",
      pageSize: 8,
    }),
    graphQLClient.request<GetProductsResponse>(GET_PRODUCTS, {
      sortBy: "createdAt",
      pageSize: 8,
    }),
  ]);

  const discountedProducts = discountedProductsResponse.products;
  const newProducts = newProductsResponse.products;
  return (
    <div>
      <Hero />
      <MainOffers
        offers={[
          {
            image: "images/nike-shirt.jpg",
            title: "جدید ترین تخفیفات فصل برند نایک",
            brand: "نایک",
          },
          {
            image: "images/puma-shirt.jpg",
            title: "جدید ترین تخفیفات فصل برند پوما",
            brand: "پوما",
          },
        ]}
      />{" "}
      <Banner
        imageUrl="/images/Baner.png"
        mobileImageUrl="images/Baner-mobile.png"
      />
      <ProductHighlight
        title="بیشترین تخفیف"
        products={discountedProducts}
        className="bg-primary-50"
      />
      <ProductHighlight
        title="جدیدترین محصولات"
        products={newProducts}
        className="bg-white"
      />
      <Banner
        imageUrl="/images/Baner-1.png"
        mobileImageUrl="images/Baner-1-mobile.png"
      />
      <MainOffers
        offers={[
          {
            image: "images/adidas-shirt.png",
            title: "جدیدترین محصولات آدیداس",
            brand: "آدیداس",
          },
          {
            image: "images/reebok-shirt.png",
            title: "جدیدترین محصولات ریباک",
            brand: "ریباک",
          },
        ]}
      />
      <BenefitsSection />

    </div>
  );
}
