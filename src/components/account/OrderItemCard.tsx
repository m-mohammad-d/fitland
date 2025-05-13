import { OrderItem } from "@/types/Order";
import Image from "next/image";
import Link from "next/link";
import { BiComment } from "react-icons/bi";
import { FiShoppingBag } from "react-icons/fi";

export default function OrderItemCard({ item }: { item: OrderItem }) {
  return (
    <div key={item.id} className="my-5 flex flex-col items-center gap-4 rounded-2xl border border-neutral-400 bg-white p-5 shadow-sm transition-all duration-200 hover:shadow-md sm:flex-row">
      <div className="group relative h-40 w-full overflow-hidden rounded-xl sm:w-40">
        <Image src={item.product.images[0]} alt={item.product.name} fill className="object-cover transition-transform duration-300 group-hover:scale-105" />
      </div>

      <div className="flex w-full flex-1 items-start justify-between gap-2 text-sm sm:text-base">
        <div className="flex flex-col gap-2">
          <h2 className="line-clamp-1 flex items-center gap-2 font-semibold text-neutral-800">
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

        <Link href={`/product/${item.product.id}`} className="text-primary-600 flex items-center gap-1 text-sm whitespace-nowrap hover:underline">
          <BiComment size={18} />
          ثبت دیدگاه
        </Link>
      </div>
    </div>
  );
}
