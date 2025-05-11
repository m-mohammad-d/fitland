"use client";

import { use } from "react";
import { useQuery } from "@apollo/client";
import { notFound } from "next/navigation";
import ProductDescription from "@/components/products/ProductDescription";
import ProductGallery from "@/components/products/ProductImageGallery";
import ProductInfo from "@/components/products/ProductInfo";
import { GET_PRODUCT_BY_ID } from "@/graphql/queries/productQueries";
import DotSpinner from "@/components/ui/DotSpinner";
import ProductCommentList from "@/components/products/ProductCommentList";
import { GET_PRODUCT_COMMENTS } from "@/graphql/queries/commentQueries";
import { GetProductCommentsResponse } from "@/types/Comment";

interface Props {
  params: Promise<{ id: string }>;
}

export default function ProductDetailsPage({ params }: Props) {
  const { id } = use(params);

  const {
    data: productData,
    loading: productLoading,
    error: productError,
  } = useQuery(GET_PRODUCT_BY_ID, {
    variables: { id },
  });

  const { data: commentData, loading: commentLoading } =
    useQuery<GetProductCommentsResponse>(GET_PRODUCT_COMMENTS, {
      variables: { id },
    });

  if (productLoading || commentLoading) return <DotSpinner />;
  if (productError || !productData?.product) return notFound();

  const product = productData.product;
  const comments = commentData?.getProductComments ?? [];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ProductGallery images={product.images} />
        <ProductInfo product={product} />
      </div>

      <div className="my-12 border-t border-neutral-500 w-full"></div>

      <ProductDescription description={product.description} />
      <ProductCommentList comments={comments} productId={product.id} />
    </div>
  );
}
