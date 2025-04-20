import BenefitsSection from "@/components/home/BenefitsSection";
import Hero from "@/components/home/Hero";
import MainOffers from "@/components/home/MainOffer";
import ProductHighlight from "@/components/products/ProductHighlight";
import Banner from "@/components/ui/Banner";
import { GET_PRODUCTS } from "@/graphql/queries/productQueries";
import { graphQLFetch } from "@/lib/graphqlFetch";
import { GetProductsResponse } from "@/types/Products";

export default async function Home() {
  const [discountedProductsResponse, newProductsResponse] = await Promise.all([
    graphQLFetch<GetProductsResponse>(
      process.env.NEXT_PUBLIC_BACKEND_URL || "",
      GET_PRODUCTS.loc?.source.body as string,
      {
        sortBy: "price",
        pageSize: 8,
      }
    ),
    graphQLFetch<GetProductsResponse>(
      process.env.NEXT_PUBLIC_BACKEND_URL || "",
      GET_PRODUCTS.loc?.source.body as string,
      {
        sortBy: "createdAt",
        pageSize: 8,
      }
    ),
  ]);

  const discountedProducts = discountedProductsResponse.data.products;
  const newProducts = newProductsResponse.data.products;
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
