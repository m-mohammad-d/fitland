"use client";
import Link from "next/link";
import { useState, ChangeEvent } from "react";
import { useUpload } from "@/hooks/useUpload";
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
  const { uploadFile, uploading, imageUrl } = useUpload();
  const [profileImagePreview, setProfileImagePreview] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [userInfo] = useState({
    data: {
      user: { name: "نام کاربر", email: "user@example.com" },
    },
  });

  function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      setProfileImagePreview(URL.createObjectURL(file));
      setSelectedFile(file); 
    }
  }

  async function handleUpload() {
    if (selectedFile) {
      await uploadFile(selectedFile);
      setSelectedFile(null); 
    }
  }

  return (
    <aside className="bg-white shadow-sm p-4 rounded-lg md:w-64 w-full">
      <div className="flex flex-col items-center pb-4">
        <div className="relative">
          <img
            src={imageUrl || profileImagePreview || "/userLogo.jpg"}
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

        {selectedFile && (
          <button
            onClick={handleUpload}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            disabled={uploading}
          >
            {uploading ? "در حال آپلود..." : "ذخیره عکس"}
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
              icon: <BsPerson />, label: "حساب کاربری",
            },
            {
              href: "/account/orders",
              icon: <BsClockHistory />, label: "تاریخچه سفارشات",
            },
            {
              href: "/account/favorites",
              icon: <BsHeart />, label: "علاقه‌مندی‌ها",
            },
            {
              href: "/account/addresses",
              icon: <BsGeoAlt />, label: "آدرس‌ها",
            },
            {
              href: "/account/reviews",
              icon: <BsChatDots />, label: "دیدگاه‌ها و نظرات",
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