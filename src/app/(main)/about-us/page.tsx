import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "درباره ما | فیت لند",
  description: "معرفی فیت لند و خدمات ما",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Hero Section */}
        <div className="mb-16 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-900">درباره فیت لند</h1>
          <p className="mx-auto max-w-3xl text-xl text-gray-600">ما در فیت لند به دنبال ایجاد تحولی بزرگ در صنعت تناسب اندام و سلامتی هستیم</p>
        </div>

        {/* Main Content */}
        <div className="mb-16 grid grid-cols-1 items-center gap-12 md:grid-cols-2">
          <div className="relative h-[400px] overflow-hidden rounded-lg">
            <Image src="/images/about-hero.webp" alt="فیت لند" fill className="object-cover" priority />
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl font-semibold text-gray-900">داستان ما</h2>
            <p className="leading-relaxed text-gray-600">
              فیت لند با هدف ایجاد پلتفرمی جامع برای علاقه‌مندان به تناسب اندام و سلامتی تأسیس شد. ما معتقدیم که هر فردی حق دارد به بهترین امکانات و خدمات ورزشی دسترسی داشته باشد.
            </p>
            <p className="leading-relaxed text-gray-600">با ترکیب تکنولوژی روز و تجربه متخصصان حوزه ورزش، ما در تلاش هستیم تا تجربه‌ای متفاوت و کاربردی را برای شما فراهم کنیم.</p>
          </div>
        </div>

        {/* Features Section */}
        <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
              <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-semibold">تکنولوژی پیشرفته</h3>
            <p className="text-gray-600">استفاده از آخرین تکنولوژی‌ها برای ارائه خدمات بهتر به کاربران</p>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-sm">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
              <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-semibold">تیم متخصص</h3>
            <p className="text-gray-600">همکاری با بهترین متخصصان حوزه ورزش و تناسب اندام</p>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-sm">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
              <svg className="h-6 w-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-semibold">کیفیت تضمین شده</h3>
            <p className="text-gray-600">ارائه خدمات با بالاترین استانداردهای کیفی</p>
          </div>
        </div>

        {/* Mission Section */}
        <div className="mb-16 rounded-lg bg-white p-8 shadow-sm">
          <h2 className="mb-6 text-center text-3xl font-semibold text-gray-900">ماموریت ما</h2>
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-4 leading-relaxed text-gray-600">
              ما در فیت لند متعهد به ایجاد محیطی امن، حرفه‌ای و کاربردی برای تمام علاقه‌مندان به ورزش و تناسب اندام هستیم. هدف ما این است که با ارائه خدمات با کیفیت و پشتیبانی مناسب، به شما در رسیدن
              به اهداف تناسب اندامتان کمک کنیم.
            </p>
            <p className="leading-relaxed text-gray-600">با ما همراه باشید تا در مسیر سلامتی و تناسب اندام، بهترین تجربه را داشته باشید.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
