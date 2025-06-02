import React from "react";
import BestSallersProduct from "./ProductCard";
import { Product } from "@/types/Products";

interface ProductGridProps {
  products: Product[] | undefined;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {

  return <div className="mx-4 grid grid-cols-1 gap-6 place-items-center sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">{products?.map((product) => <BestSallersProduct key={product.id} product={product} />)}</div>;
};

export default ProductGrid;
