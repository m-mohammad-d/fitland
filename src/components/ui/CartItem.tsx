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

const CartItem: React.FC<CartItemProps> = ({ image, title, color, size, price, discountPrice, quantity, onRemove, onIncrease, onDecrease }) => {
  return (
    <div className="bg-background relative mb-4 flex gap-6 rounded-xl p-5 shadow-md">
      <button onClick={onRemove} className="hover:text-primary-600 absolute top-3 right-3 cursor-pointer border-none bg-transparent text-neutral-600 transition-colors">
        <FaTimes className="h-5 w-5" />
      </button>

      <div className="relative h-32 w-32 overflow-hidden rounded-lg">
        <Image src={image} alt={title} fill className="object-cover" sizes="(max-width: 640px) 100vw, 50vw" />
      </div>

      <div className="flex-1 space-y-3">
        <h3 className="text-lg font-medium text-neutral-800">{title}</h3>

        <div className="flex gap-3 text-sm text-neutral-600">
          {color && <span>رنگ: {color}</span>}
          {size && <span>سایز: {size}</span>}
        </div>

        <div className="flex items-baseline gap-2">
          {discountPrice ? (
            <>
              <span className="text-primary-600 font-medium">{discountPrice.toLocaleString()} تومان</span>
              <span className="text-sm text-neutral-500 line-through">{price.toLocaleString()}</span>
            </>
          ) : (
            <span className="text-primary-600 font-medium">{price.toLocaleString()} تومان</span>
          )}
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center overflow-hidden rounded-lg border">
            <button onClick={onDecrease} className="hover:bg-primary-50 text-primary-600 p-2 transition-colors">
              <FaMinus className="h-4 w-4" />
            </button>
            <span className="min-w-[40px] px-4 text-center">{quantity}</span>
            <button onClick={onIncrease} className="hover:bg-primary-50 text-primary-600 p-2 transition-colors">
              <FaPlus className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
