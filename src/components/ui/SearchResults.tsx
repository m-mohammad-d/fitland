import { Product } from "@/types/Products";
import Image from "next/image";
import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa";

interface SearchResultsProps {
  products: Product[];
  onProductClick: () => void;
}

export default function SearchResults({ products, onProductClick }: SearchResultsProps) {
  if (!products.length) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <FaShoppingCart className="mb-4 text-4xl text-gray-400" />
        <h3 className="text-xl font-semibold text-gray-800">محصولی یافت نشد</h3>
        <p className="mt-2 text-gray-600">متاسفانه محصولی با این مشخصات پیدا نشد</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {products.map((product) => (
        <Link 
          key={product.id} 
          href={`/product/${product.id}`}
          onClick={onProductClick}
        >
          <div className="flex gap-4 rounded-lg border border-gray-200 bg-white p-4 transition-all hover:shadow-md">
            <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg">
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
            
            <div className="flex flex-1 flex-col justify-between">
              <div>
                <h3 className="font-semibold text-gray-900">{product.name}</h3>
                <p className="mt-1 text-sm text-gray-500 line-clamp-2">{product.description}</p>
              </div>
              
              <div className="mt-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {product.colors?.map((color, index) => (
                    <span
                      key={index}
                      className="h-4 w-4 rounded-full border border-gray-300"
                      style={{ backgroundColor: color.hex }}
                    />
                  ))}
                </div>
                
                <div className="text-left">
                  {product.discount > 0 ? (
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-primary">
                        {product.discountedPrice?.toLocaleString()} تومان
                      </span>
                      <span className="text-sm text-gray-500 line-through">
                        {product.price.toLocaleString()}
                      </span>
                    </div>
                  ) : (
                    <span className="text-lg font-bold text-primary">
                      {product.price.toLocaleString()} تومان
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}