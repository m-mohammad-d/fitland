"use client";

import { FiLogOut } from "react-icons/fi";
import { useMutation } from "@apollo/client";
import { SIGN_OUT } from "@/graphql/mutations/AuthMutations";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

interface LogoutButtonProps {
  variant?: "default" | "text" | "icon";
  className?: string;
}

export default function LogoutButton({ variant = "default", className = "" }: LogoutButtonProps) {
  const router = useRouter();
  const [signOut, { loading }] = useMutation(SIGN_OUT, {
    onCompleted: () => {
      toast.success("با موفقیت خارج شدید");
      router.push("/login");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleLogout = () => {
    signOut();
  };

  const baseStyles = "flex items-center gap-2 transition-colors";
  const variantStyles = {
    default: "rounded-full bg-red-50 px-2 md:px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-100",
    text: "text-red-600 hover:text-red-700",
    icon: "rounded-full p-2 text-red-600 hover:bg-red-50",
  };

  return (
    <button onClick={handleLogout} disabled={loading} className={`${baseStyles} ${variantStyles[variant]} ${className}`}>
      <FiLogOut className="h-4 w-4" />
      {variant !== "icon" && <span className="text-sm md:text-base">خروج</span>}
    </button>
  );
}
