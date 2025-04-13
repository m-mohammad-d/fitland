"use client";

import { use } from "react";
import { useQuery } from "@apollo/client";
import { notFound } from "next/navigation";
import ProductDescription from "@/components/products/ProductDescription";
import ProductGallery from "@/components/products/ProductImageGallery";
import ProductInfo from "@/components/products/ProductInfo";
import { GET_PRODUCT_BY_ID } from "@/graphql/queries/productQueries";

interface Props {
  params: Promise<{ id: string }>;
}

export default function ProductDetailsPage({ params }: Props) {
  const { id } = use(params);

  const { data, loading, error } = useQuery(GET_PRODUCT_BY_ID, {
    variables: { id },
  });

  if (loading)
    return <div className="text-center mt-10">در حال بارگذاری...</div>;
  if (error || !data?.product) return notFound();

  const product = data.product;

  return (
    <div className=" container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ProductGallery images={product.images} />
        <ProductInfo product={product} />
      </div>
      <div className="my-12 border-t border-neutral-500 w-full"></div>

      <ProductDescription description={product.description} />
    </div>
  );
}
