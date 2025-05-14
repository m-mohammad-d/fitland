import Image from "next/image";
import Link from "next/link";
import { AiOutlineLike } from "react-icons/ai";
import { CiCalendarDate, CiShop } from "react-icons/ci";

function Hero() {
  return (
    <div>
      <div className="container mx-auto mt-6 flex items-center justify-between px-4">
        <div className="w-full text-center lg:w-1/2 lg:text-start">
          <h3 className="text-base font-medium text-neutral-600 md:text-lg">راحت و مطمئن خرید کنید!</h3>
          <h1 className="text-secondary mt-4 text-2xl leading-snug font-bold md:text-4xl lg:text-5xl">همراه تو در مسیر سلامتی</h1>
          <h2 className="text-primary mt-2 text-xl font-semibold md:text-2xl lg:text-3xl">سهم بزرگ خودتان را امروز بگیرید!</h2>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-neutral-700 md:text-base lg:mx-0">بزرگترین حراج فصل فیت لند! همین حالا شروع کن و محصولات رو با یه تخفیف شگفت‌انگیز بخر!</p>
          <Link
            href="/products"
            className="bg-secondary hover:bg-secondary-700 mt-6 inline-block rounded-lg px-6 py-3 text-base font-medium text-white shadow-md transition-all active:scale-95 md:text-lg"
          >
            مشاهده محصولات
          </Link>
        </div>
        <div className="hidden md:block">
          <Image src="/images/hero-section-image.png" alt="hero section image" layout="responsive" width={1200} height={800} />
        </div>
        <div className="hidden md:block">
          <div className="flex items-center gap-4 rounded-lg p-4">
            <div className="bg-secondary-10 bg-secondary-20 text-secondary flex h-14 w-14 items-center justify-center rounded-lg">
              <CiShop size={32} />
            </div>

            <div>
              <p className="text-secondary text-xl font-bold">+۳۰۰</p>
              <p className="text-sm text-neutral-800">محصولات متنوع</p>
            </div>
          </div>
          <div className="flex items-center gap-4 rounded-lg p-4">
            <div className="bg-secondary-10 bg-secondary-20 text-secondary flex h-14 w-14 items-center justify-center rounded-lg">
              <AiOutlineLike size={32} />
            </div>

            <div>
              <p className="text-secondary text-xl font-bold">۹۵٪</p>
              <p className="text-sm text-neutral-800">رضایت مشتری</p>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-lg p-4">
            <div className="bg-secondary-10 bg-secondary-20 text-secondary flex h-14 w-14 items-center justify-center rounded-lg">
              <CiCalendarDate size={32} />
            </div>

            <div>
              <p className="text-secondary text-xl font-bold">4 روز</p>
              <p className="text-sm text-neutral-800">از خرید تا دریافت</p>
            </div>
          </div>
        </div>
      </div>
      <Image src="/images/hero-section-dot-patten.png" alt="hero-section-dot-patten" className="hidden w-full md:block" layout="responsive" width={1200} height={800} />{" "}
    </div>
  );
}

export default Hero;
