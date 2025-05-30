import { Metadata } from "next";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { BsFillTelephoneFill } from "react-icons/bs";

export const metadata: Metadata = {
  title: "تماس با ما",
  description: "راه‌های ارتباطی با فیت‌لند و پشتیبانی سریع و مؤثر مشتریان",
  openGraph: {
    title: "تماس با ما | FitLand",
    description: "در صورت داشتن هرگونه سوال یا نیاز به پشتیبانی، از طریق راه‌های ارتباطی با ما در تماس باشید.",
  },
  twitter: {
    title: "تماس با ما",
    description: "سریع‌ترین راه‌های ارتباط با پشتیبانی فیت‌لند برای راهنمایی در خرید و پیگیری سفارش‌ها.",
  },
};

export default function ContactPage() {
  return (
    <div className="mt-8 min-h-screen bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Hero Section */}
        <div className="mb-16 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-900">تماس با ما</h1>
          <p className="mx-auto max-w-3xl text-xl text-gray-600">ما آماده پاسخگویی به سوالات و پیشنهادات شما هستیم</p>
        </div>

        {/* Contact Information Cards */}
        <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg bg-white p-6 text-center shadow-sm">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
              <FaPhone className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="mb-2 text-lg font-semibold">تلفن تماس</h3>
            <p className="text-gray-600">۰۲۱-۱۲۳۴۵۶۷۸</p>
          </div>

          <div className="rounded-lg bg-white p-6 text-center shadow-sm">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
              <FaEnvelope className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="mb-2 text-lg font-semibold">ایمیل</h3>
            <p className="text-gray-600">info@fitland.com</p>
          </div>

          <div className="rounded-lg bg-white p-6 text-center shadow-sm">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
              <FaMapMarkerAlt className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="mb-2 text-lg font-semibold">آدرس</h3>
            <p className="text-gray-600"> تهران، بزرگراه شیخ فضل‌الله نوری، ورودی اختصاصی برج میلاد</p>
          </div>

          <div className="rounded-lg bg-white p-6 text-center shadow-sm">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100">
              <FaClock className="h-6 w-6 text-yellow-600" />
            </div>
            <h3 className="mb-2 text-lg font-semibold">ساعات کاری</h3>
            <p className="text-gray-600">شنبه تا پنجشنبه: ۹ صبح تا ۹ شب</p>
          </div>
        </div>

        {/* Map Section */}
        <div className="rounded-lg bg-white p-8 shadow-sm">
          <h2 className="mb-6 text-2xl font-semibold">موقعیت ما</h2>
          <div className="relative h-[400px] overflow-hidden rounded-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3239.335252395558!2d51.3729975152594!3d35.74479968018098!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f8e0638f601b1f1%3A0xf6c2a6070a2e7ae5!2sMilad%20Tower!5e0!3m2!1sen!2s!4v1688132456951"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <div className="mt-6 space-y-4">
            <div className="flex items-center space-x-3">
              <MdLocationOn className="text-primary h-6 w-6" />
              <p className="text-gray-600">ایران، تهران، بزرگراه شیخ فضل‌الله نوری، ورودی اختصاصی برج میلاد</p>
            </div>
            <div className="flex items-center space-x-3">
              <BsFillTelephoneFill className="text-primary h-6 w-6" />
              <p className="text-gray-600">۰۲۱-۱۲۳۴۵۶۷۸</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
