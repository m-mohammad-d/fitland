import { Product } from "@/types/Products";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Link href={`product/${product.id}`}>
      <div className="my-4 max-w-xs space-y-4 overflow-hidden rounded-2xl border border-neutral-200 bg-white px-4 py-6 shadow-lg">
        <div className="flex items-center justify-between"></div>

        <Image src={product.images[0]} alt={product.name} height={160} width={160} className="mt-2 h-40 w-full object-cover" />
        <div className="mt-4 text-center">
          <h2 className="font-semibold text-gray-900">{product.name}</h2>
          <p className="mt-1 text-gray-700">{product.price.toLocaleString()} تومان</p>
          <p className="mt-1 text-sm text-gray-500">
            از سایز {product.sizes} تا {product.sizes}
          </p>

          <div className="mt-3 flex justify-center gap-2">
            {product.colors?.map((color, index) => <span key={index} className="h-5 w-5 rounded-full border border-gray-300" style={{ backgroundColor: color.hex }}></span>)}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
