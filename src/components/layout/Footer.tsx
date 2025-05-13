"use client";
import { useState } from "react";
import Image from "next/image";
import { FaInstagram, FaTelegramPlane, FaWhatsapp, FaYoutube } from "react-icons/fa";
import { FiChevronDown } from "react-icons/fi";

const sections = [
  {
    title: "محبوب‌ترین‌ها",
    items: ["لباس مردانه", "کفش فوتبال", "دوچرخه", "لباس زنانه"],
  },
  {
    title: "خدمات مشتریان",
    items: ["سوالات متداول", "حریم خصوصی", "گزارش ایراد در سایت", "شرایط بازگرداندن محصول"],
  },
  {
    title: "راهنمای خرید",
    items: ["راهنمای ثبت سفارش", "شیوه‌های پرداخت", "نحوه ارسال سفارش‌ها", "نحوه پیگیری محصول"],
  },
  {
    title: "اطلاعات تماس",
    items: ["تهران - تجریش - خیابان سلوار", "۰۲۱-۳۴۵۶۴۷۸۹", "info@fitland.com", "شنبه تا چهارشنبه ۹ تا ۱۷"],
  },
];

export default function Footer() {
  const [openSection, setOpenSection] = useState<number | null>(null);

  const toggleSection = (index: number) => {
    setOpenSection(openSection === index ? null : index);
  };

  return (
    <footer className="bg-secondary-700 px-5 py-10 text-white md:px-20">
      <div className="container mx-auto space-y-10">
        <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between">
          <div className="grid w-full gap-8 md:grid-cols-4">
            {sections.map((section, index) => (
              <div key={index}>
                <h3 className="flex cursor-pointer items-center justify-between text-lg font-bold md:mb-4 md:cursor-auto" onClick={() => toggleSection(index)}>
                  {section.title}
                  <FiChevronDown className={`hover:text-primary transition md:hidden ${openSection === index ? "rotate-180" : "rotate-0"}`} />
                </h3>
                <ul className={`space-y-2 overflow-hidden text-gray-300 transition-all md:block ${openSection === index ? "block" : "hidden"}`}>
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

        <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between">
          <div className="text-center md:w-1/2 md:text-right">
            <h2 className="text-xl font-bold">فروشگاه اینترنتی فیت‌لند</h2>
            <p className="mt-2 text-sm text-gray-300">
              فروشگاه لوازم ورزشی فیت‌لند در سال 1403 کار خود را به صورت حرفه ای آغاز کرد و با هدف ارائه جدیدترین محصولات ورزشی از قبیل لوازم فوتبال، فوتسال، والیبال، بسکتبال، تنیس و... همچنین پوشاک
              ورزشی و تجهیزات سفر، از برند های معتبر دنیا در محیطی کاربرپسند، قابل اطمینان و با مجربترین مشاوران و کارشناسان ورزشی فعالیت می کند. فروشگاه فیت‌لند دارای نماد اعتماد از وزارت صنعت معدن و
              تجارت می باشد و تمامی محصولات خود را با 7 روز ضمانت بازگشت همراه با گارانتی اصالت و سلامت فیزیکی، با سریع ترین روش های ارسال به سراسر ایران در اختیار مشتریان خود قرار می دهد.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-4">
            <div className="flex space-x-4">
              <Image src="/images/E-Namad.png" alt="ای نماد" width={80} height={80} />
              <Image src="/images/nationalRegistrationMark.png" alt="نشان ملی ثبت" width={80} height={80} />
              <Image src="/images/authorizedBusinessUnion.png" alt="اتحادیه کشوری کسب و کار های مجاز" width={80} height={80} />
            </div>
            <p className="text-sm text-orange-400">یک هفته ضمانت بازگشت ✍</p>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-gray-500 pt-4 text-sm text-gray-400">
          <p>تمامی حقوق مادی و معنوی این وب‌سایت برای مجموعه فیت‌لند محفوظ می‌باشد.</p>
          <p className="mt-1">طراحی شده توسط m-mohammad-d</p>
        </div>
      </div>
    </footer>
  );
}
