"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const messages = [
  "🚀 ارسال رایگان برای سفارش‌های بالای ۵۰۰ هزار تومان!",
  "🎉 حراج ویژه تا ۵۰٪ تخفیف فقط تا پایان هفته!",
  "🔥 جدیدترین مدل‌های لباس ورزشی همین حالا در دسترس!",
  "🏋️‍♂️ تجهیزات ورزشی با بالاترین کیفیت و قیمت مناسب!",
  "🎁 با ثبت‌نام در سایت ۲۰٪ تخفیف اولین خرید بگیرید!",
  "⚡ خرید کفش ورزشی با تخفیف‌های استثنایی!",
  "🏃‍♀️ بهترین لباس‌های دویدن برای ورزشکاران حرفه‌ای!",
  "🛒 تنوع بی‌نظیر لباس‌های ورزشی با تضمین اصالت!",
  "🎯 خرید سریع، ارسال مطمئن، کیفیت بی‌نظیر!",
  "💳 پرداخت امن و امکان مرجوعی کالا تا ۷ روز!",
];

export default function PromoBar() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, 3000); 
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-10 md:h-[50px] bg-secondary text-white flex justify-center items-center overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.p
          key={messages[index]}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="text-sm md:text-base font-medium"
        >
          {messages[index]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
