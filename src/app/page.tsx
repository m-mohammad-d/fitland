"use client";
import Hero from "@/components/home/Hero";
import MainOffers from "@/components/home/MainOffer";
import ProductHighlight from "@/components/products/ProductHighlight";
import Banner from "@/components/ui/Banner";
import { GET_PRODUCTS } from "@/graphql/queries/productQueries";
import { GetProductsResponse } from "@/types/Products";
import { useQuery } from "@apollo/client";

export default function Home() {
  const {
    loading: loadingDiscountedProducts,
    error: errorDiscountedProducts,
    data: discountedProductsData,
  } = useQuery<GetProductsResponse>(GET_PRODUCTS, {
    variables: {
      sortBy: "discount",
      order: "DESC",
      limit: 8,
    },
  });

  const {
    loading: loadingNewProducts,
    error: errorNewProducts,
    data: newProductsData,
  } = useQuery<GetProductsResponse>(GET_PRODUCTS, {
    variables: {
      sortBy: "createdAt",
      order: "DESC",
      limit: 8,
    },
  });

  if (loadingDiscountedProducts || loadingNewProducts) return <p>Loading...</p>;
  if (errorDiscountedProducts)
    return <p>Error: {errorDiscountedProducts.message}</p>;
  if (errorNewProducts) return <p>Error: {errorNewProducts.message}</p>;

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
        products={discountedProductsData?.products}
        className="bg-primary-50"
      />
      <ProductHighlight
        title="جدیدترین محصولات"
        products={newProductsData?.products}
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
    </div>
  );
}
