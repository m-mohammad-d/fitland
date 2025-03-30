"use client";
import Link from "next/link";
import { ChangeEvent, MouseEvent, useState } from "react";
import {
  BsPlus,
  BsHeart,
  BsGeoAlt,
  BsChatDots,
  BsBoxArrowRight,
  BsPerson,
  BsClockHistory,
} from "react-icons/bs";

function AccountSidebar() {
  const [profileImagePreview, setProfileImagePreview] = useState<string>("");
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [userInfo] = useState({
    data: {
      user: { name: "نام کاربر", email: "user@example.com" },
    },
  });

  function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      setProfileImageFile(file);
      const reader = new FileReader();
      reader.onload = () => setProfileImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  }

  function handleSaveChanges(event: MouseEvent<HTMLButtonElement>) {
    setIsUpdating(true);
    setTimeout(() => setIsUpdating(false), 1000);
  }

  return (
    <aside className="bg-white shadow-sm p-4 rounded-lg md:w-64 w-full">
      <div className="flex flex-col items-center pb-4">
        <div className="relative">
          <img
            src={profileImagePreview || "/userLogo.jpg"}
            alt="Profile"
            className="h-24 w-24 rounded-full object-cover border"
          />
          <button
            onClick={() => document.getElementById("profileImage")?.click()}
            className="absolute bottom-1 right-1 flex h-7 w-7 items-center justify-center rounded-full bg-primary hover:bg-primary-500 text-white border shadow"
          >
            <BsPlus />
          </button>
          <input
            type="file"
            id="profileImage"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </div>

        {profileImageFile && (
          <button
            onClick={handleSaveChanges}
            disabled={isUpdating}
            className="mt-3 px-4 py-1.5 text-white bg-success-600 rounded-md text-sm hover:bg-success-700 disabled:opacity-50"
          >
            {isUpdating ? "در حال ذخیره..." : "ذخیره عکس"}
          </button>
        )}

        <h2 className="mt-3 text-lg font-semibold">
          {userInfo.data.user.name}
        </h2>
        <p className="text-sm text-gray-600">{userInfo.data.user.email}</p>
      </div>

      <nav className="mt-5">
        <ul className="space-y-3">
          {[
            {
              href: "/account/profile",
              icon: <BsPerson />,
              label: "حساب کاربری",
            },
            {
              href: "/account/orders",
              icon: <BsClockHistory />,
              label: "تاریخچه سفارشات",
            },
            {
              href: "/account/favorites",
              icon: <BsHeart />,
              label: "علاقه‌مندی‌ها",
            },
            {
              href: "/account/addresses",
              icon: <BsGeoAlt />,
              label: "آدرس‌ها",
            },
            {
              href: "/account/reviews",
              icon: <BsChatDots />,
              label: "دیدگاه‌ها و نظرات",
            },
          ].map(({ href, icon, label }) => (
            <li key={href}>
              <Link
                href={href}
                className="flex items-center py-2 px-4 text-gray-700 hover:bg-gray-100 rounded-md transition"
              >
                <span className="text-lg ml-3">{icon}</span>
                <span className="text-sm">{label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-6 pt-4">
        <button className="w-full flex items-center justify-center py-2 px-4 text-red-600 hover:bg-red-100 rounded-md transition">
          <BsBoxArrowRight className="ml-2 text-lg" />
          <span className="text-sm">خروج</span>
        </button>
      </div>
    </aside>
  );
}

export default AccountSidebar;
