import Link from "next/link";
import { AiOutlineLike } from "react-icons/ai";
import { CiCalendarDate, CiShop } from "react-icons/ci";

function Hero() {
  return (
    <div>
      <div className="px-4 mt-6 flex items-center container mx-auto justify-between">
        <div className="w-full lg:w-1/2 text-center lg:text-start">
          <h3 className="text-base md:text-lg text-neutral-600 font-medium">
            راحت و مطمئن خرید کنید!
          </h3>
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-secondary mt-4 leading-snug">
            همراه تو در مسیر سلامتی
          </h1>
          <h2 className="text-xl md:text-2xl lg:text-3xl text-primary font-semibold mt-2">
            سهم بزرگ خودتان را امروز بگیرید!
          </h2>
          <p className="text-neutral-700 mt-4 text-sm md:text-base leading-relaxed max-w-lg mx-auto lg:mx-0">
            بزرگترین حراج فصل فیت لند! همین حالا شروع کن و محصولات رو با یه
            تخفیف شگفت‌انگیز بخر!
          </p>
          <Link
            href="/products"
            className="mt-6 inline-block bg-secondary text-white text-base md:text-lg font-medium py-3 px-6 rounded-lg shadow-md transition-all hover:bg-secondary-700 active:scale-95"
          >
            مشاهده محصولات
          </Link>
        </div>
        <div>
          <img src="/images/hero-section-image.png" alt="hero section image" />
        </div>
        <div className="hidden md:block">
          <div className="flex items-center gap-4 p-4 rounded-lg">
            <div className="w-14 h-14 flex items-center bg-secondary-10  justify-center bg-secondary-20 text-secondary rounded-lg">
              <CiShop size={32} />
            </div>

            <div>
              <p className="text-secondary text-xl font-bold">+۳۰۰</p>
              <p className="text-neutral-800 text-sm">محصولات متنوع</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 rounded-lg">
            <div className="w-14 h-14 flex items-center bg-secondary-10  justify-center bg-secondary-20 text-secondary rounded-lg">
              <AiOutlineLike size={32} />
            </div>

            <div>
              <p className="text-secondary text-xl font-bold">۹۵٪</p>
              <p className="text-neutral-800 text-sm">رضایت مشتری</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-lg">
            <div className="w-14 h-14 flex items-center bg-secondary-10  justify-center bg-secondary-20 text-secondary rounded-lg">
              <CiCalendarDate size={32} />
            </div>

            <div>
              <p className="text-secondary text-xl font-bold">4 روز</p>
              <p className="text-neutral-800 text-sm">از خرید تا دریافت</p>
            </div>
          </div>
        </div>
      </div>
      <img
        src="/images/hero-section-dot-patten.png"
        className="w-full hidden md:block"
        alt="hero-section-dot-patten"
      />
    </div>
  );
}

export default Hero;
