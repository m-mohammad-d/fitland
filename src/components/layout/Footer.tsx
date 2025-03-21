"use client";
import { useState } from "react";
import Image from "next/image";
import {
  FaInstagram,
  FaTelegramPlane,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";
import { FiChevronDown } from "react-icons/fi";

const sections = [
  {
    title: "محبوب‌ترین‌ها",
    items: ["لباس مردانه", "کفش فوتبال", "دوچرخه", "لباس زنانه"],
  },
  {
    title: "خدمات مشتریان",
    items: [
      "سوالات متداول",
      "حریم خصوصی",
      "گزارش ایراد در سایت",
      "شرایط بازگرداندن محصول",
    ],
  },
  {
    title: "راهنمای خرید",
    items: [
      "راهنمای ثبت سفارش",
      "شیوه‌های پرداخت",
      "نحوه ارسال سفارش‌ها",
      "نحوه پیگیری محصول",
    ],
  },
  {
    title: "اطلاعات تماس",
    items: [
      "تهران - تجریش - خیابان سلوار",
      "۰۲۱-۳۴۵۶۴۷۸۹",
      "info@fitland.com",
      "شنبه تا چهارشنبه ۹ تا ۱۷",
    ],
  },
];

export default function Footer() {
  const [openSection, setOpenSection] = useState<number | null>(null);

  const toggleSection = (index: number) => {
    setOpenSection(openSection === index ? null : index);
  };

  return (
    <footer className="bg-secondary-700 text-white py-10 px-5 md:px-20">
      <div className="container mx-auto space-y-10">
        <div className="flex flex-col md:flex-row md:justify-between items-center gap-8">
          <div className="grid md:grid-cols-4 gap-8 w-full">
            {sections.map((section, index) => (
              <div key={index}>
                <h3
                  className="text-lg font-bold flex justify-between items-center cursor-pointer md:cursor-auto md:mb-4"
                  onClick={() => toggleSection(index)}
                >
                  {section.title}
                  <FiChevronDown
                    className={`md:hidden hover:text-primary transition ${
                      openSection === index ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </h3>
                <ul
                  className={`space-y-2 text-gray-300 overflow-hidden transition-all md:block ${
                    openSection === index ? "block" : "hidden"
                  }`}
                >
                  {section.items.map((item, i) => (
                    <li key={i} className="hover:text-primary transition">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="flex space-x-4 text-2xl">
            <FaInstagram className="cursor-pointer" />
            <FaTelegramPlane className="cursor-pointer" />
            <FaWhatsapp className="cursor-pointer" />
            <FaYoutube className="cursor-pointer" />
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:justify-between items-center gap-8">
          <div className="md:w-1/2 text-center md:text-right">
            <h2 className="text-xl font-bold">فروشگاه اینترنتی فیت‌لند</h2>
            <p className="text-gray-300 mt-2 text-sm">
              فروشگاه لوازم ورزشی فیت‌لند در سال 1403 کار خود را به صورت حرفه ای
              آغاز کرد و با هدف ارائه جدیدترین محصولات ورزشی از قبیل لوازم
              فوتبال، فوتسال، والیبال، بسکتبال، تنیس و... همچنین پوشاک ورزشی و
              تجهیزات سفر، از برند های معتبر دنیا در محیطی کاربرپسند، قابل
              اطمینان و با مجربترین مشاوران و کارشناسان ورزشی فعالیت می کند.
              فروشگاه فیت‌لند دارای نماد اعتماد از وزارت صنعت معدن و تجارت می
              باشد و تمامی محصولات خود را با 7 روز ضمانت بازگشت همراه با گارانتی
              اصالت و سلامت فیزیکی، با سریع ترین روش های ارسال به سراسر ایران در
              اختیار مشتریان خود قرار می دهد.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-4">
            <div className="flex space-x-4">
              <Image
                src="/images/E-Namad.png"
                alt="ای نماد"
                width={80}
                height={80}
              />
              <Image
                src="/images/nationalRegistrationMark.png"
                alt="نشان ملی ثبت"
                width={80}
                height={80}
              />
              <Image
                src="/images/authorizedBusinessUnion.png"
                alt="اتحادیه کشوری کسب و کار های مجاز"
                width={80}
                height={80}
              />
            </div>
            <p className="text-orange-400 text-sm">یک هفته ضمانت بازگشت ✍</p>
          </div>
        </div>

        <div className="border-t border-gray-500 flex items-center justify-between pt-4 text-gray-400 text-sm">
          <p>
            تمامی حقوق مادی و معنوی این وب‌سایت برای مجموعه فیت‌لند محفوظ
            می‌باشد.
          </p>
          <p className="mt-1">طراحی شده توسط m-mohammad-d</p>
        </div>
      </div>
    </footer>
  );
}
