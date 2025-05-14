import { useCart } from "@/store/useCart";
import { useEffect, useState } from "react";
import Link from "next/link";
import { FaCheck, FaMinus, FaPlus, FaShoppingCart, FaTimes } from "react-icons/fa";
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
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || "");
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || "");
  const [quantity, setQuantity] = useState(1);
  const [showModal, setShowModal] = useState(false);

  const cartItem = items.find((item) => item.productId === product.id && item.color === selectedColor && item.size === selectedSize);

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
      price: product.price,
      discountedPrice: product.discountedPrice,
    });

    setShowModal(true);
  };

  const handleUpdateQuantity = (newQty: number) => {
    if (newQty <= 0) {
      removeItem(cartItem?.productId as string, cartItem?.color as string, cartItem?.size as string);
    } else if (cartItem) {
      updateQuantity(cartItem.productId, cartItem.color, cartItem.size, newQty);
    }
  };

  return (
    <div className="relative space-y-6 rounded-xl border border-neutral-100 bg-white p-6 shadow-sm">
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4 backdrop-blur-sm">
          <div className="animate-fade-in-up w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <FaCheck className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-neutral-800">محصول به سبد خرید اضافه شد</h3>
              <p className="text-neutral-600">
                {product.name} ({selectedSize}, {selectedColor})
              </p>
              <div className="mt-4 flex w-full flex-col-reverse gap-3 md:flex-row">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-neutral-200 px-4 py-2 font-medium transition-colors hover:bg-neutral-50"
                >
                  <FaTimes className="h-4 w-4" />
                  ادامه خرید
                </button>
                <Link href="/cart" className="bg-primary-600 hover:bg-primary-700 flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2 font-medium text-white transition-colors">
                  <FaShoppingCart className="h-4 w-4" />
                  مشاهده سبد خرید
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-primary-50 text-primary-700 inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium">
        <span>{product.category.name}</span>
        <HiOutlineArrowSmLeft className="h-3 w-3" />
      </div>

      <h1 className="text-2xl font-bold text-neutral-800 md:text-3xl">{product.name}</h1>

      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          {product.discount && <span className="bg-error-100 text-error-800 rounded-full px-2 py-1 text-xs font-medium">{product.discount}% تخفیف</span>}
          {product.stock > 0 ? (
            <span className="bg-success-100 text-success-800 rounded-full px-2 py-1 text-xs font-medium">موجود در انبار</span>
          ) : (
            <span className="bg-error-100 text-error-800 rounded-full px-2 py-1 text-xs font-medium">ناموجود</span>
          )}
        </div>

        <div className="mt-2 flex items-center gap-3">
          {product.discountedPrice ? (
            <>
              <span className="text-secondary-700 text-2xl font-bold">
                {product.discountedPrice.toLocaleString()}
                <span className="mr-1 text-sm font-normal">تومان</span>
              </span>
              <span className="text-lg text-neutral-500 line-through">{product.price.toLocaleString()}</span>
            </>
          ) : (
            <span className="text-secondary-800 text-2xl font-bold">
              {product.price.toLocaleString()}
              <span className="mr-1 text-sm font-normal">تومان</span>
            </span>
          )}
        </div>
      </div>

      <div className="my-4 border-t border-neutral-100"></div>

      {product.colors.length > 0 && (
        <div>
          <p className="mb-3 text-sm font-medium text-neutral-700">رنگ‌بندی</p>
          <div className="flex flex-wrap gap-3">
            {product.colors.map((color) => (
              <button
                key={color.name}
                onClick={() => setSelectedColor(color.name)}
                className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all ${
                  selectedColor === color.name ? "ring-primary-600 border-white ring-2 ring-offset-2" : "border-transparent hover:border-neutral-200"
                }`}
                style={{ backgroundColor: color.hex }}
                title={color.name}
              >
                {selectedColor === color.name && <FaCheck className="h-4 w-4 text-white" />}
              </button>
            ))}
          </div>
          {selectedColor && (
            <p className="mt-2 text-xs text-neutral-500">
              انتخاب شده: <span className="font-medium">{selectedColor}</span>
            </p>
          )}
        </div>
      )}

      {product.sizes.length > 0 && (
        <div>
          <p className="mb-3 text-sm font-medium text-neutral-700">سایز</p>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                  selectedSize === size ? "bg-primary-600 text-white shadow-md" : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
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
          <div className="flex items-center gap-1 text-sm text-neutral-500">
            {product.stock > 0 ? (
              <>
                <span className="bg-success-500 h-2 w-2 rounded-full"></span>
                {product.stock} عدد در انبار
              </>
            ) : (
              <span className="text-error-500 flex items-center gap-1">
                <span className="bg-error-500 h-2 w-2 rounded-full"></span>
                موجودی تمام شد
              </span>
            )}
          </div>

          {cartItem ? (
            <div className="flex items-center gap-2 rounded-lg bg-neutral-100 p-1">
              <button onClick={() => handleUpdateQuantity(quantity - 1)} className="flex h-8 w-8 items-center justify-center rounded-lg transition-colors hover:bg-neutral-200">
                <FaMinus className="h-3 w-3 text-neutral-700" />
              </button>
              <span className="w-8 text-center text-base font-medium">{quantity}</span>
              <button
                onClick={() => handleUpdateQuantity(quantity + 1)}
                disabled={quantity >= product.stock}
                className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors hover:bg-neutral-200 ${quantity >= product.stock ? "cursor-not-allowed opacity-50" : ""}`}
              >
                <FaPlus className="h-3 w-3 text-neutral-700" />
              </button>
            </div>
          ) : (
            <button
              onClick={handleAddToCart}
              disabled={product.stock <= 0 || !selectedColor || !selectedSize}
              className={`flex items-center gap-2 rounded-lg px-6 py-3 font-medium transition-all ${
                product.stock > 0 ? "bg-primary-600 hover:bg-primary-700 text-white shadow-md hover:shadow-lg" : "cursor-not-allowed bg-neutral-200 text-neutral-500"
              } ${(!selectedColor || !selectedSize) && "cursor-not-allowed opacity-50"}`}
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
