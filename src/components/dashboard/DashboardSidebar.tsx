"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiPackage, FiLayers, FiShoppingCart, FiUsers, FiCreditCard, FiTag, FiTruck, FiBarChart2, FiChevronDown, FiX, FiPlus, FiList } from "react-icons/fi";
import { useState } from "react";
import { useSidebar } from "@/provider/SidebarContext";

const navigation = [
  {
    name: "مدیریت محصولات",
    href: "/dashboard/products",
    icon: FiPackage,
    subItems: [
      { name: "ساخت محصول جدید", href: "/dashboard/products/new", icon: FiPlus },
      { name: "لیست محصولات", href: "/dashboard/products", icon: FiList },
    ],
  },
  {
    name: "مدیریت دسته‌بندی‌ها",
    href: "/dashboard/categories",
    icon: FiLayers,
    subItems: [
      { name: "ساخت دسته‌بندی جدید", href: "/dashboard/categories/new", icon: FiPlus },
      { name: "لیست دسته‌بندی‌ها", href: "/dashboard/categories", icon: FiList },
    ],
  },
  {
    name: "کد تخفیف",
    href: "/dashboard/discounts",
    icon: FiTag,
    subItems: [
      { name: "ساخت کد تخفیف جدید", href: "/dashboard/discounts/new", icon: FiPlus },
      { name: "لیست کد تخفیف‌ها", href: "/dashboard/discounts", icon: FiList },
    ],
  },
  {
    name: "کاربران",
    href: "/dashboard/users",
    icon: FiUsers,
  },
  {
    name: "سفارش‌ها",
    href: "/dashboard/orders",
    icon: FiShoppingCart,
  },
  {
    name: "کیف پول کاربران",
    href: "/dashboard/wallets",
    icon: FiCreditCard,
  },

  {
    name: "گزارش‌ها",
    href: "/dashboard/reports",
    icon: FiBarChart2,
  },
];

export default function DashboardSidebar() {
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const { isOpen, toggle } = useSidebar();

  const toggleItem = (href: string) => {
    setExpandedItems((prev) => (prev.includes(href) ? prev.filter((item) => item !== href) : [...prev, href]));
  };

  return (
    <>
      {isOpen && <div className="fixed inset-0 z-10 bg-black/50 md:hidden" onClick={toggle} />}

      <aside
        className={`fixed inset-y-0 left-0 z-20 w-64 transform border-r border-gray-200 bg-white transition-all duration-300 ease-in-out md:static ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b border-gray-200 px-4">
          <h2 className="text-primary-600 text-xl font-bold">FitLand</h2>
          <button onClick={toggle} className="rounded-full p-2 text-gray-500 hover:bg-gray-100 md:hidden">
            <FiX className="h-5 w-5" />
          </button>
        </div>

        <nav className="space-y-1 p-4">
          {navigation.map((item) => (
            <div key={item.name}>
              {item.subItems ? (
                <button
                  onClick={() => toggleItem(item.href)}
                  className={`group flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    pathname.startsWith(item.href) ? "bg-primary-50 text-primary-600" : "hover:text-primary-600 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </div>
                  <FiChevronDown className={`h-4 w-4 transition-transform ${expandedItems.includes(item.href) ? "rotate-180" : ""}`} />
                </button>
              ) : (
                <Link
                  href={item.href}
                  className={`group flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    pathname === item.href ? "bg-primary-50 text-primary-600" : "hover:text-primary-600 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </div>
                </Link>
              )}

              {item.subItems && expandedItems.includes(item.href) && (
                <div className="mt-1 space-y-1 pr-8">
                  {item.subItems.map((subItem) => (
                    <Link
                      key={subItem.name}
                      href={subItem.href}
                      className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                        pathname === subItem.href ? "bg-primary-50 text-primary-600" : "hover:text-primary-600 text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      <subItem.icon className="h-4 w-4" />
                      {subItem.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
}
