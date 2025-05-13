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
          <p className="hidden text-neutral-600 lg:block">فروشگاه لوازم ورزشی فیت لند</p>
        </div>

        <div className="hidden flex-1 justify-center lg:flex">
          <SearchBar onSearch={(query) => console.log(query)} />
        </div>

        <div className="flex items-center gap-3">
          <motion.button whileTap={{ scale: 0.9 }} className="hidden items-center gap-2 rounded-lg bg-white px-4 py-2 text-neutral-800 shadow-md transition lg:flex">
            {isLoggedIn ? "حساب کاربری" : "ثبت‌نام | ورود"}
            <LuUser size={20} />
          </motion.button>

          <motion.button whileTap={{ scale: 0.9 }} className="bg-primary hover:bg-primary-600 relative flex items-center rounded-xl px-4 py-3 text-white shadow transition">
            <IoBagHandleOutline size={20} />
            {cartCount > 0 && <span className="bg-secondary absolute -top-2 -left-2 flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold text-white">{cartCount}</span>}
          </motion.button>

          <button className="rounded-lg bg-gray-200 p-2 lg:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            <LuMenu size={24} />
          </button>
        </div>
      </header>

      <div className="container mx-auto mt-4 hidden px-4 lg:block">
        <nav className="flex items-center justify-between rounded-xl bg-neutral-100 px-4 py-3 shadow-md">
          <div className="flex gap-4">
            {menuItemsWithoutIcons.map((item) => (
              <motion.div whileTap={{ scale: 0.95 }} key={item.name}>
                <a href={item.href} className="rounded-lg px-4 py-2 text-sm text-black transition hover:bg-gray-200 lg:text-base">
                  {item.name}
                </a>
              </motion.div>
            ))}
          </div>

          <div className="flex gap-4">
            {menuItemsWithIcons.map((item) => (
              <motion.div whileTap={{ scale: 0.95 }} key={item.name}>
                <a href={item.href} className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm text-black transition hover:bg-gray-200 lg:text-base">
                  {item.icon}
                  {item.name}
                </a>
              </motion.div>
            ))}
          </div>
        </nav>
      </div>
      <div className="container mx-auto mt-4 px-4 lg:hidden">
        <SearchBar onSearch={(query) => console.log(query)} />
      </div>
      {menuOpen && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.3 }}
          className="fixed top-0 right-0 z-50 flex h-full w-3/4 flex-col gap-6 bg-white p-6 shadow-lg"
        >
          <button className="self-end rounded-full bg-gray-300 p-2" onClick={() => setMenuOpen(false)}>
            <AiOutlineClose size={24} />
          </button>

          <div>
            <h3 className="mb-2 text-lg font-bold text-gray-700">دسته‌بندی‌ها</h3>
            <div className="flex flex-col gap-2">
              {menuItemsWithIcons.map((item) => (
                <a key={item.name} href={item.href} className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm text-black transition hover:bg-gray-200">
                  {item.name}
                </a>
              ))}

              {menuItemsWithoutIcons.map((item) => (
                <a key={item.name} href={item.href} className="rounded-lg px-4 py-2 text-sm text-black transition hover:bg-gray-200">
                  {item.name}
                </a>
              ))}
            </div>
            <button className="mt-4 flex w-full items-center gap-2 rounded-lg bg-gray-100 px-4 py-2 text-left shadow-md">
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
