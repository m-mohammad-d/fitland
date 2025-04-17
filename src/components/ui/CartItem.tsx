import { FaPlus, FaMinus, FaTimes } from "react-icons/fa";
import Image from "next/image";

interface CartItemProps {
  image: string;
  title: string;
  color?: string;
  size?: string;
  price: number;
  discountPrice?: number;
  quantity: number;
  onRemove: () => void;
  onIncrease: () => void;
  onDecrease: () => void;
}

const CartItem: React.FC<CartItemProps> = ({
  image,
  title,
  color,
  size,
  price,
  discountPrice,
  quantity,
  onRemove,
  onIncrease,
  onDecrease,
}) => {
  return (
    <div className="flex gap-6 p-5 bg-background rounded-xl shadow-md relative mb-4">
      <button
        onClick={onRemove}
        className="absolute top-3 right-3 bg-transparent border-none cursor-pointer text-neutral-600 hover:text-primary-600 transition-colors"
      >
        <FaTimes className="w-5 h-5" />
      </button>

      <div className="w-32 h-32 relative overflow-hidden rounded-lg">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, 50vw"
        />
      </div>

      <div className="flex-1 space-y-3">
        <h3 className="text-lg font-medium text-neutral-800">{title}</h3>

        <div className="flex gap-3 text-sm text-neutral-600">
          {color && <span>رنگ: {color}</span>}
          {size && <span>سایز: {size}</span>}
        </div>

        <div className="flex gap-2 items-baseline">
          {discountPrice ? (
            <>
              <span className="text-primary-600 font-medium">
                {discountPrice.toLocaleString()} تومان
              </span>
              <span className="text-neutral-500 line-through text-sm">
                {price.toLocaleString()}
              </span>
            </>
          ) : (
            <span className="text-primary-600 font-medium">
              {price.toLocaleString()} تومان
            </span>
          )}
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center border rounded-lg overflow-hidden">
            <button
              onClick={onDecrease}
              className="p-2 hover:bg-primary-50 text-primary-600 transition-colors"
            >
              <FaMinus className="w-4 h-4" />
            </button>
            <span className="px-4 min-w-[40px] text-center">{quantity}</span>
            <button
              onClick={onIncrease}
              className="p-2 hover:bg-primary-50 text-primary-600 transition-colors"
            >
              <FaPlus className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
