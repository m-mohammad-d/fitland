import { useCart } from "@/store/useCart";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  FaCheck,
  FaMinus,
  FaPlus,
  FaShoppingCart,
  FaTimes,
} from "react-icons/fa";
import { HiOutlineArrowSmLeft } from "react-icons/hi";

interface Props {
  product: {
    id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    images: string[];
    discount?: number;
    discountedPrice?: number;
    colors: { name: string; hex: string }[];
    sizes: string[];
    category: { name: string };
  };
}

export default function ProductInfo({ product }: Props) {
  const { addItem, items, updateQuantity, removeItem } = useCart();
  const [selectedColor, setSelectedColor] = useState(
    product.colors[0]?.name || ""
  );
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || "");
  const [quantity, setQuantity] = useState(1);
  const [showModal, setShowModal] = useState(false);

  const cartItem = items.find(
    (item) =>
      item.productId === product.id &&
      item.color === selectedColor &&
      item.size === selectedSize
  );

  useEffect(() => {
    if (cartItem) {
      setQuantity(cartItem.quantity);
    } else {
      setQuantity(1);
    }
  }, [cartItem]);

  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) return;

    addItem({
      productId: product.id,
      name: product.name,
      image: product.images[0],
      color: selectedColor,
      size: selectedSize,
      quantity: quantity,
      price: product.discountedPrice || product.price,
    });

    setShowModal(true);
  };

  const handleUpdateQuantity = (newQty: number) => {
    if (newQty <= 0) {
      removeItem(cartItem?.productId as string);
    } else if (cartItem) {
      updateQuantity(cartItem.productId, newQty);
    }
  };

  return (
    <div className="space-y-6 p-6 bg-white rounded-xl shadow-sm border border-neutral-100 relative">
      {showModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-2xl shadow-xl max-w-md w-full animate-fade-in-up">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <FaCheck className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-neutral-800">
                محصول به سبد خرید اضافه شد
              </h3>
              <p className="text-neutral-600">
                {product.name} ({selectedSize}, {selectedColor})
              </p>
              <div className="flex gap-3 flex-col-reverse md:flex-row w-full mt-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-2 px-4 border border-neutral-200 rounded-lg font-medium hover:bg-neutral-50 transition-colors flex items-center justify-center gap-2"
                >
                  <FaTimes className="h-4 w-4" />
                  ادامه خرید
                </button>
                <Link
                  href="/cart"
                  className="flex-1 py-2 px-4 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center justify-center gap-2"
                >
                  <FaShoppingCart className="h-4 w-4" />
                  مشاهده سبد خرید
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="inline-flex items-center gap-1 px-3 py-1 bg-primary-50 text-primary-700 text-xs font-medium rounded-full">
        <span>{product.category.name}</span>
        <HiOutlineArrowSmLeft className="h-3 w-3" />
      </div>

      <h1 className="text-2xl md:text-3xl font-bold text-neutral-800">
        {product.name}
      </h1>

      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          {product.discount && (
            <span className="bg-error-100 text-error-800 text-xs px-2 py-1 rounded-full font-medium">
              {product.discount}% تخفیف
            </span>
          )}
          {product.stock > 0 ? (
            <span className="bg-success-100 text-success-800 text-xs px-2 py-1 rounded-full font-medium">
              موجود در انبار
            </span>
          ) : (
            <span className="bg-error-100 text-error-800 text-xs px-2 py-1 rounded-full font-medium">
              ناموجود
            </span>
          )}
        </div>

        <div className="flex items-center gap-3 mt-2">
          {product.discountedPrice ? (
            <>
              <span className="text-2xl font-bold text-secondary-700">
                {product.discountedPrice.toLocaleString()}
                <span className="text-sm font-normal mr-1">تومان</span>
              </span>
              <span className="text-lg text-neutral-500 line-through">
                {product.price.toLocaleString()}
              </span>
            </>
          ) : (
            <span className="text-2xl font-bold text-secondary-800">
              {product.price.toLocaleString()}
              <span className="text-sm font-normal mr-1">تومان</span>
            </span>
          )}
        </div>
      </div>

      <div className="border-t border-neutral-100 my-4"></div>

      {product.colors.length > 0 && (
        <div>
          <p className="text-sm font-medium text-neutral-700 mb-3">رنگ‌بندی</p>
          <div className="flex flex-wrap gap-3">
            {product.colors.map((color) => (
              <button
                key={color.name}
                onClick={() => setSelectedColor(color.name)}
                className={`w-10 h-10 rounded-full border-2 transition-all flex items-center justify-center ${
                  selectedColor === color.name
                    ? "ring-2 ring-offset-2 ring-primary-600 border-white"
                    : "border-transparent hover:border-neutral-200"
                }`}
                style={{ backgroundColor: color.hex }}
                title={color.name}
              >
                {selectedColor === color.name && (
                  <FaCheck className="h-4 w-4 text-white" />
                )}
              </button>
            ))}
          </div>
          {selectedColor && (
            <p className="text-xs text-neutral-500 mt-2">
              انتخاب شده: <span className="font-medium">{selectedColor}</span>
            </p>
          )}
        </div>
      )}

      {product.sizes.length > 0 && (
        <div>
          <p className="text-sm font-medium text-neutral-700 mb-3">سایز</p>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedSize === size
                    ? "bg-primary-600 text-white shadow-md"
                    : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="pt-4">
        <div className="flex items-center justify-between">
          <div className="text-sm text-neutral-500 flex items-center gap-1">
            {product.stock > 0 ? (
              <>
                <span className="w-2 h-2 rounded-full bg-success-500"></span>
                {product.stock} عدد در انبار
              </>
            ) : (
              <span className="text-error-500 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-error-500"></span>
                موجودی تمام شد
              </span>
            )}
          </div>

          {cartItem ? (
            <div className="flex items-center gap-2 bg-neutral-100 rounded-lg p-1">
              <button
                onClick={() => handleUpdateQuantity(quantity - 1)}
                className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-neutral-200 transition-colors"
              >
                <FaMinus className="h-3 w-3 text-neutral-700" />
              </button>
              <span className="text-base font-medium w-8 text-center">
                {quantity}
              </span>
              <button
                onClick={() => handleUpdateQuantity(quantity + 1)}
                disabled={quantity >= product.stock}
                className={`w-8 h-8 rounded-lg flex items-center justify-center hover:bg-neutral-200 transition-colors ${
                  quantity >= product.stock
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
              >
                <FaPlus className="h-3 w-3 text-neutral-700" />
              </button>
            </div>
          ) : (
            <button
              onClick={handleAddToCart}
              disabled={product.stock <= 0 || !selectedColor || !selectedSize}
              className={`px-6 py-3 rounded-lg font-medium transition-all flex items-center gap-2 ${
                product.stock > 0
                  ? "bg-primary-600 hover:bg-primary-700 text-white shadow-md hover:shadow-lg"
                  : "bg-neutral-200 text-neutral-500 cursor-not-allowed"
              } ${
                (!selectedColor || !selectedSize) &&
                "opacity-50 cursor-not-allowed"
              }`}
            >
              <FaShoppingCart className="h-4 w-4" />
              افزودن به سبد خرید
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
