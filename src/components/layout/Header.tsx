"use client";
import Image from "next/image";
import SearchBar from "../ui/SearchBar";
import { useState } from "react";
import { motion } from "framer-motion";
import { IoBagHandleOutline } from "react-icons/io5";
import { LuUser, LuMenu } from "react-icons/lu";
import { AiOutlineClose } from "react-icons/ai";
import { FaFire, FaTags, FaBoxOpen } from "react-icons/fa";

const menuItemsWithIcons = [
  {
    name: "پرفروش‌ترین‌ها",
    icon: <FaFire size={16} className="text-primary" />,
    href: "/bestsellers",
  },
  {
    name: "تخفیفات ویژه",
    icon: <FaTags size={16} className="text-primary" />,
    href: "/discounts",
  },
  {
    name: "جدیدترین محصولات",
    icon: <FaBoxOpen size={16} className="text-primary" />,
    href: "/new-arrivals",
  },
];

const menuItemsWithoutIcons = [
  { name: "شیکر و جاگ", href: "/shaker-jug" },
  { name: "لوازم ورزشی", href: "/sports-equipment" },
  { name: "بچگانه", href: "/kids" },
  { name: "زنانه", href: "/women" },
  { name: "مردانه", href: "/men" },
];

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const isLoggedIn = false;
  const cartCount = 3;

  return (
    <>
      <header className="container mx-auto mt-5 flex items-center justify-between px-4 lg:px-8">
        <div>
          <Image src="/logo.svg" alt="logo" width={120} height={40} />
          <p className="text-neutral-600 hidden lg:block">
            فروشگاه لوازم ورزشی فیت لند
          </p>
        </div>

        <div className="hidden lg:flex flex-1 justify-center">
          <SearchBar onSearch={(query) => console.log(query)} />
        </div>

        <div className="flex items-center gap-3">
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="hidden lg:flex items-center gap-2 px-4 py-2 bg-white text-neutral-800 rounded-lg shadow-md transition"
          >
            {isLoggedIn ? "حساب کاربری" : "ثبت‌نام | ورود"}
            <LuUser size={20} />
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.9 }}
            className="relative flex items-center px-4 py-3 bg-primary rounded-xl shadow hover:bg-primary-600 text-white transition"
          >
            <IoBagHandleOutline size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -left-2 bg-secondary text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </motion.button>

          <button
            className="lg:hidden p-2 rounded-lg bg-gray-200"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <LuMenu size={24} />
          </button>
        </div>
      </header>

      <div className="hidden lg:block container mx-auto mt-4 px-4">
        <nav className="bg-neutral-100 shadow-md py-3 px-4 rounded-xl flex justify-between items-center">
          <div className="flex gap-4">
            {menuItemsWithoutIcons.map((item) => (
              <motion.div whileTap={{ scale: 0.95 }} key={item.name}>
                <a
                  href={item.href}
                  className="px-4 py-2 text-sm lg:text-base rounded-lg transition text-black hover:bg-gray-200"
                >
                  {item.name}
                </a>
              </motion.div>
            ))}
          </div>

          <div className="flex gap-4">
            {menuItemsWithIcons.map((item) => (
              <motion.div whileTap={{ scale: 0.95 }} key={item.name}>
                <a
                  href={item.href}
                  className="flex items-center gap-2 px-4 py-2 text-sm lg:text-base rounded-lg transition text-black hover:bg-gray-200"
                >
                  {item.icon}
                  {item.name}
                </a>
              </motion.div>
            ))}
          </div>
        </nav>
      </div>
      <div className="lg:hidden container mx-auto px-4 mt-4">
        <SearchBar onSearch={(query) => console.log(query)} />
      </div>
      {menuOpen && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.3 }}
          className="fixed top-0 right-0 w-3/4 h-full bg-white shadow-lg p-6 z-50 flex flex-col gap-6"
        >
          <button
            className="self-end p-2 bg-gray-300 rounded-full"
            onClick={() => setMenuOpen(false)}
          >
            <AiOutlineClose size={24} />
          </button>

          <div>
            <h3 className="text-lg font-bold text-gray-700 mb-2">
              دسته‌بندی‌ها
            </h3>
            <div className="flex flex-col gap-2">
              {menuItemsWithIcons.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="flex items-center gap-2 px-4 py-2 text-sm rounded-lg transition text-black hover:bg-gray-200"
                >
                  {item.name}
                </a>
              ))}

              {menuItemsWithoutIcons.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="px-4 py-2 text-sm rounded-lg transition text-black hover:bg-gray-200"
                >
                  {item.name}
                </a>
              ))}
            </div>
            <button className="w-full text-left px-4 mt-4 py-2 bg-gray-100 rounded-lg shadow-md flex items-center gap-2">
              <LuUser size={20} />
              {isLoggedIn ? "حساب کاربری" : "ثبت‌نام | ورود"}
            </button>
          </div>
        </motion.div>
      )}
    </>
  );
}

export default Header;
