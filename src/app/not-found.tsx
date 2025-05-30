import NotFoundIllustration from "@/components/ui/NotFoundIllustration";
import Link from "next/link";
import { AiOutlineHome, AiOutlineShopping } from "react-icons/ai";

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-8">
            <NotFoundIllustration />
          </div>

          <h1 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">صفحه مورد نظر یافت نشد</h1>
          <p className="mb-8 text-lg text-gray-600">متأسفانه صفحه‌ای که به دنبال آن هستید وجود ندارد یا به آدرس دیگری منتقل شده است.</p>

          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link href="/" className="bg-primary hover:bg-primary-600 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-medium text-white transition-colors duration-300">
              <AiOutlineHome size={20} />
              بازگشت به صفحه اصلی
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gray-100 px-6 py-3 font-medium text-gray-900 transition-colors duration-300 hover:bg-gray-200"
            >
              <AiOutlineShopping size={20} />
              مشاهده محصولات
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
