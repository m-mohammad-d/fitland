"use client";
import Image from "next/image";
import Link from "next/link";
import SearchBar from "../ui/SearchBar";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { IoBagHandleOutline } from "react-icons/io5";
import { LuUser, LuMenu } from "react-icons/lu";
import { AiOutlineClose } from "react-icons/ai";
import { FaFire, FaTags, FaBoxOpen } from "react-icons/fa";
import { useQuery } from "@apollo/client";
import { GET_ME } from "@/graphql/queries/userQueries";
import { ApolloGetUserResponse } from "@/types/User";
import { useCart } from "@/store/useCart";

const menuItemsWithIcons = [
  {
    name: "پرفروش‌ترین‌ها",
    icon: <FaFire size={16} className="text-primary" />,
    href: "/products?sortBy=stockDesc",
  },
  {
    name: "تخفیفات ویژه",
    icon: <FaTags size={16} className="text-primary" />,
    href: "/products?sortBy=discountDesc",
  },
  {
    name: "جدیدترین محصولات",
    icon: <FaBoxOpen size={16} className="text-primary" />,
    href: "/products?sortBy=createdAtDesc",
  },
];

const menuItemsWithoutIcons = [
  { name: "تماس با ما", href: "/contact-us" },
  { name: "درباره ما", href: "/about-us" },
  { name: "سوالات متداول", href: "/faq" },
];

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { data } = useQuery<ApolloGetUserResponse>(GET_ME);
  const { getTotalQuantity } = useCart();

  const isLoggedIn = Boolean(data?.getMe);
  const isAdmin = data?.getMe?.role === "ADMIN";
  const cartCount = mounted ? getTotalQuantity() : 0;

  useEffect(() => {
    setMounted(true);
  }, []);

  const renderAuthButton = () => {
    if (!isLoggedIn) {
      return (
        <Link href="/login" className="hidden items-center gap-2 rounded-lg bg-white px-4 py-2 text-neutral-800 shadow-md transition lg:flex">
          ورود | ثبت‌نام
          <LuUser size={20} />
        </Link>
      );
    }

    if (isAdmin) {
      return (
        <Link href="/dashboard" className="hidden items-center gap-2 rounded-lg bg-white px-4 py-2 text-neutral-800 shadow-md transition lg:flex">
          پنل ادمین
          <LuUser size={20} />
        </Link>
      );
    }

    return (
      <Link href="/account/profile" className="hidden items-center gap-2 rounded-lg bg-white px-4 py-2 text-neutral-800 shadow-md transition lg:flex">
        حساب کاربری
        <LuUser size={20} />
      </Link>
    );
  };

  const renderMobileAuthButton = () => {
    if (!isLoggedIn) {
      return (
        <Link href="/auth/login" className="bg-primary mt-4 flex w-full items-center gap-2 rounded-lg px-4 py-2 text-left text-white shadow-md">
          <LuUser size={20} />
          ورود | ثبت‌نام
        </Link>
      );
    }

    if (isAdmin) {
      return (
        <Link href="/admin/dashboard" className="bg-primary mt-4 flex w-full items-center gap-2 rounded-lg px-4 py-2 text-left text-white shadow-md">
          <LuUser size={20} />
          پنل ادمین
        </Link>
      );
    }

    return (
      <Link href="/account/profile" className="bg-primary mt-4 flex w-full items-center gap-2 rounded-lg px-4 py-2 text-left text-white shadow-md">
        <LuUser size={20} />
        حساب کاربری
      </Link>
    );
  };

  return (
    <>
      <header className="container mx-auto mt-5 flex items-center justify-between px-4 lg:px-8">
        <div>
          <Link href="/">
            <Image src="/logo.svg" alt="logo" width={120} height={40} />
          </Link>
          <p className="hidden text-neutral-600 lg:block">فروشگاه لوازم ورزشی فیت لند</p>
        </div>

        <div className="hidden flex-1 justify-center lg:flex">
          <SearchBar onSearch={(query) => console.log(query)} />
        </div>

        <div className="flex items-center gap-3">
          <motion.div whileTap={{ scale: 0.9 }}>
            {renderAuthButton()}
          </motion.div>

          <motion.div whileTap={{ scale: 0.9 }} className="relative">
            <Link href="/cart" className="bg-primary hover:bg-primary-600 flex items-center rounded-xl px-4 py-3 text-white shadow transition">
              <IoBagHandleOutline size={20} />
              {cartCount > 0 && <span className="bg-secondary absolute -top-2 -left-2 flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold text-white">{cartCount}</span>}
            </Link>
          </motion.div>

          <button className="rounded-lg bg-gray-200 p-2 lg:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label="باز کردن منو">
            <LuMenu size={24} />
          </button>
        </div>
      </header>

      <div className="container mx-auto mt-4 hidden px-4 lg:block">
        <nav className="flex items-center justify-between rounded-xl bg-neutral-100 px-4 py-3 shadow-md">
          <div className="flex gap-4">
            {menuItemsWithoutIcons.map((item) => (
              <motion.div whileTap={{ scale: 0.95 }} key={item.name}>
                <Link href={item.href} className="rounded-lg px-4 py-2 text-sm text-black transition hover:bg-gray-200 lg:text-base">
                  {item.name}
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="flex gap-4">
            {menuItemsWithIcons.map((item) => (
              <motion.div whileTap={{ scale: 0.95 }} key={item.name}>
                <Link href={item.href} className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm text-black transition hover:bg-gray-200 lg:text-base">
                  {item.icon}
                  {item.name}
                </Link>
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
          <button className="self-end rounded-full bg-gray-300 p-2" onClick={() => setMenuOpen(false)} aria-label="بستن منو">
            <AiOutlineClose size={24} />
          </button>
          <div>
            <h3 className="mb-2 text-lg font-bold text-gray-700">صفحات</h3>
            <div className="flex flex-col gap-2">
              {menuItemsWithoutIcons.map((item) => (
                <Link key={item.name} href={item.href} className="rounded-lg px-4 py-2 text-sm text-black transition hover:bg-gray-200">
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h3 className="mb-2 text-lg font-bold text-gray-700">دسته‌بندی‌ها</h3>
            <div className="flex flex-col gap-2">
              {menuItemsWithIcons.map((item) => (
                <Link key={item.name} href={item.href} className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm text-black transition hover:bg-gray-200">
                  {item.icon}
                  {item.name}
                </Link>
              ))}
            </div>

            {renderMobileAuthButton()}
          </div>
        </motion.div>
      )}
    </>
  );
}

export default Header;
