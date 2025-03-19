"use client";
import Hero from "@/components/home/Hero";
import MainOffers from "@/components/home/MainOffer";
import ProductHighlight from "@/components/products/ProductHighlight";
import Banner from "@/components/ui/Banner";
import { GET_PRODUCTS } from "@/graphql/queries/productQueries";
import { GetProductsResponse } from "@/types/Products";
import { useQuery } from "@apollo/client";

export default function Home() {
  const { loading, error, data } = useQuery<GetProductsResponse>(GET_PRODUCTS, {
    variables: {
      sortBy: "DISCOUNT",
      order: "DESC",
      limit: 8,
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  console.log(data);

  return (
    <div>
      <Hero />
      <MainOffers />
      <Banner
        imageUrl="/images/Baner.png"
        mobileImageUrl="images/Baner-mobile.png"
      />
      <ProductHighlight title="بیشترین تخفیف" products={data?.products} className="bg-primary-50" />
    </div>
  );
}
