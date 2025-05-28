import Link from "next/link";
import { FiShoppingBag } from "react-icons/fi";

export default function EmptyState() {
  return (
    <div className="rounded-xl border border-gray-100 bg-white py-12 text-center shadow-sm">
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-50">
        <FiShoppingBag className="h-8 w-8 text-gray-400" />
      </div>
      <p className="text-lg text-gray-500">هنوز سفارشی ثبت نکرده‌اید</p>
      <Link
        href="/products"
        className="mt-4 inline-flex items-center gap-2 rounded-lg bg-primary-50 px-4 py-2 text-sm font-medium text-primary-600 transition-colors hover:bg-primary-100"
      >
        مشاهده محصولات
      </Link>
    </div>
  );
} 