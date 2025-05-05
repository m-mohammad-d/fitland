import { OrderItem } from "@/types/Order";
import Image from "next/image";
import Link from "next/link";
import { BiComment } from "react-icons/bi";
import { FiShoppingBag } from "react-icons/fi";

export default function OrderItemCard({ item }: { item: OrderItem }) {
  return (
    <div
      key={item.id}
      className="flex flex-col sm:flex-row my-5 items-center gap-4 p-5 bg-white rounded-2xl shadow-sm border border-neutral-400 hover:shadow-md transition-all duration-200"
    >
      <div className="w-full sm:w-40 h-40 relative rounded-xl overflow-hidden group">
        <Image
          src={item.product.images[0]}
          alt={item.product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="flex flex-1 justify-between items-start w-full text-sm sm:text-base gap-2">
        <div className="flex flex-col gap-2">
          <h2 className="font-semibold text-neutral-800 line-clamp-1 flex items-center gap-2">
            <FiShoppingBag className="text-primary" />
            {item.product.name}
          </h2>
          <p className="text-neutral-500">
            رنگ: {item.color || "نامشخص"} | سایز: {item.size || "نامشخص"}
          </p>
          <div className="flex items-center gap-6 text-sm text-neutral-700">
            <span>قیمت: {item.priceAtPurchase} تومان</span>
            <span>تعداد: {item.quantity}</span>
          </div>
        </div>

        <Link
          href={`/product/${item.product.id}`}
          className="text-primary-600 text-sm flex items-center gap-1 whitespace-nowrap hover:underline"
        >
          <BiComment size={18} />
          ثبت دیدگاه
        </Link>
      </div>
    </div>
  );
}
