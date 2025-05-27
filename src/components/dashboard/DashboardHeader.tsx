"use client";

import { FiBell, FiUser, FiChevronDown } from "react-icons/fi";
import LogoutButton from "@/components/auth/LogoutButton";
import { useQuery } from "@apollo/client";
import { GET_ME } from "@/graphql/queries/userQueries";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import SidebarToggle from "./SidebarToggle";

export default function DashboardHeader() {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { data: userData } = useQuery(GET_ME);
  const user = userData?.getMe;

  return (
    <header className="sticky top-0 z-10 border-b border-gray-200 bg-white shadow-sm">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-4">
          <SidebarToggle />
          <h1 className="text-lg font-semibold text-gray-800 md:text-xl">پنل مدیریت</h1>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          {/* Notifications */}
          <button className="hover:text-primary-600 relative rounded-full p-2 text-gray-600 hover:bg-gray-100">
            <FiBell className="h-5 w-5" />
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
          </button>

          {/* User Menu */}
          <div className="relative">
            <button onClick={() => setShowUserMenu(!showUserMenu)} className="flex items-center gap-2 rounded-full bg-gray-100 px-2 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 md:px-3">
              <div className="relative h-8 w-8 overflow-hidden rounded-full">
                <Image src={user?.photo || "/images/default-avatar.webp"} alt={user?.name || "User"} fill className="object-cover" />
              </div>
              <div className="hidden md:block">
                <div className="text-sm font-medium">{user?.name || "کاربر"}</div>
                <div className="text-xs text-gray-500">{user?.email}</div>
              </div>
              <FiChevronDown className={`h-4 w-4 transition-transform ${showUserMenu ? "rotate-180" : ""}`} />
            </button>

            {/* User Dropdown Menu */}
            {showUserMenu && (
              <div className="absolute left-0 mt-2 w-48 rounded-lg border border-gray-200 bg-white py-2 shadow-lg">
                <Link href="/dashboard/profile" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  <FiUser className="h-4 w-4" />
                  <span>پروفایل</span>
                </Link>
                <div className="my-1 border-t border-gray-200"></div>
                <div className="px-4 py-2">
                  <LogoutButton variant="text" className="w-full justify-start" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
