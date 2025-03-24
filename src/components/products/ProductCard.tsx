import { Product } from "@/types/Products";
import React from "react";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="max-w-xs bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 p-4">
      <div className="flex justify-between items-center"></div>

      <img
        src={product.images[0]}
        alt={product.name}
        className="w-full h-40 object-cover mt-2"
      />
      <div className="mt-4 text-center">
        <h2 className="text-gray-900 font-semibold">{product.name}</h2>
        <p className="text-gray-700 mt-1">
          {product.price.toLocaleString()} تومان
        </p>
        <p className="text-gray-500 text-sm mt-1">
          از سایز {product.sizes} تا {product.sizes}
        </p>

        <div className="flex justify-center gap-2 mt-3">
          {product.colors.map((color, index) => (
            <span
              key={index}
              className="w-5 h-5 rounded-full border border-gray-300"
              style={{ backgroundColor: color.hex }}
            ></span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
