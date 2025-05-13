"use client";
import Link from "next/link";
import { useState, ChangeEvent } from "react";
import { useUpload } from "@/hooks/useUpload";
import { BsPlus, BsHeart, BsGeoAlt, BsChatDots, BsBoxArrowRight, BsPerson, BsClockHistory } from "react-icons/bs";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ME } from "@/graphql/queries/userQueries";
import { ApolloGetUserResponse } from "@/types/User";
import { UPDATE_USER } from "@/graphql/mutations/UserMutations";
import { BiWallet } from "react-icons/bi";

const NAV_ITEMS = [
  {
    path: "/account/wallet",
    icon: <BiWallet />,
    label: "کیف پول",
  },
  {
    path: "/account/profile",
    icon: <BsPerson />,
    label: "حساب کاربری",
  },
  {
    path: "/account/orders",
    icon: <BsClockHistory />,
    label: "تاریخچه سفارشات",
  },
  {
    path: "/account/favorites",
    icon: <BsHeart />,
    label: "علاقه‌مندی‌ها",
  },
  {
    path: "/account/addresses",
    icon: <BsGeoAlt />,
    label: "آدرس‌ها",
  },
  {
    path: "/account/reviews",
    icon: <BsChatDots />,
    label: "دیدگاه‌ها و نظرات",
  },
];

const DEFAULT_PROFILE_IMAGE = "/userLogo.jpg";

export default function AccountSidebar() {
  const { uploadFile, isUploading } = useUpload();
  const { data: userData } = useQuery<ApolloGetUserResponse>(GET_ME);
  const [updateUser] = useMutation(UPDATE_USER);

  const [profileImagePreview, setProfileImagePreview] = useState<string>("");
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);

  const currentUser = userData?.getMe;
  const profileImageSrc = profileImagePreview || currentUser?.photo || DEFAULT_PROFILE_IMAGE;

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setProfileImagePreview(URL.createObjectURL(file));
    setSelectedImageFile(file);
  };

  const handleUploadProfileImage = async () => {
    if (!selectedImageFile || !currentUser?.id) return;

    try {
      const uploadResult = await uploadFile(selectedImageFile);

      await updateUser({
        variables: {
          id: currentUser.id,
          photo: uploadResult.url,
        },
      });
      setSelectedImageFile(null);
    } catch (error) {
      console.error("Error uploading profile image:", error);
    }
  };

  return (
    <aside className="w-full rounded-lg bg-white p-4 shadow-sm md:w-64">
      <div className="flex flex-col items-center pb-4">
        <div className="relative">
          <img src={profileImageSrc} alt="Profile" className="h-24 w-24 rounded-full border object-cover" />
          <button
            onClick={() => document.getElementById("profileImageInput")?.click()}
            className="bg-primary hover:bg-primary-500 absolute right-1 bottom-1 flex h-7 w-7 items-center justify-center rounded-full border text-white shadow"
            aria-label="Change profile picture"
          >
            <BsPlus />
          </button>
          <input type="file" id="profileImageInput" accept="image/*" onChange={handleImageChange} className="hidden" />
        </div>

        {selectedImageFile && (
          <button onClick={handleUploadProfileImage} className="mt-2 rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600" disabled={isUploading}>
            {isUploading ? "در حال آپلود..." : "ذخیره عکس"}
          </button>
        )}

        <h2 className="mt-3 text-lg font-semibold">{currentUser?.name}</h2>
        <p className="text-sm text-gray-600">{currentUser?.email}</p>
      </div>

      <nav className="mt-5">
        <ul className="space-y-3">
          {NAV_ITEMS.map(({ path, icon, label }) => (
            <li key={path}>
              <Link href={path} className="flex items-center rounded-md px-4 py-2 text-gray-700 transition hover:bg-gray-100">
                <span className="ml-3 text-lg">{icon}</span>
                <span className="text-sm">{label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-6 pt-4">
        <button className="flex w-full items-center justify-center rounded-md px-4 py-2 text-red-600 transition hover:bg-red-100">
          <BsBoxArrowRight className="ml-2 text-lg" />
          <span className="text-sm">خروج</span>
        </button>
      </div>
    </aside>
  );
}
