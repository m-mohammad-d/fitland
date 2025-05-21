"use client";

import { useSidebar } from "@/provider/SidebarContext";
import { FiMenu, FiX } from "react-icons/fi";

export default function SidebarToggle() {
  const { isOpen, toggle } = useSidebar();

  return (
    <button onClick={toggle} className="p-1 text-gray-600 hover:text-gray-900 md:hidden" aria-label="Toggle sidebar">
      {isOpen ? <FiX className="h-5 w-5" /> : <FiMenu className="h-5 w-5" />}
    </button>
  );
}
