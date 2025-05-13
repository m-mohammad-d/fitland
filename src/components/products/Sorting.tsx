"use client";
import { useState } from "react";
import { useFilters } from "@/provider/FilterProvider";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { Drawer } from "../ui/Drawer";

interface SortingProps {
  totalProducts: number;
}

const sortOptions = [
  { value: "stockDesc", label: "بیشترین موجودی", icon: <FiChevronUp /> },
  { value: "stock", label: "کمترین موجودی", icon: <FiChevronDown /> },
  { value: "discountDesc", label: "بیشترین تخفیف", icon: <FiChevronUp /> },
  { value: "discount", label: "کمترین تخفیف", icon: <FiChevronDown /> },
  { value: "priceDesc", label: "گران‌ترین", icon: <FiChevronUp /> },
  { value: "price", label: "ارزان‌ترین", icon: <FiChevronDown /> },
];

function Sorting({ totalProducts }: SortingProps) {
  const { sortBy, updateSortBy } = useFilters();
  const [showSortDrawer, setShowSortDrawer] = useState(false);

  return (
    <div className="mb-6 flex items-center justify-between">
      {/* Desktop Sorting */}
      <div className="hidden items-center gap-4 lg:flex">
        {sortOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => updateSortBy(option.value)}
            className={`flex items-center gap-1 rounded-lg px-3 py-1 text-sm ${sortBy === option.value ? "bg-primary-100 text-primary-600 font-medium" : "text-gray-700 hover:bg-gray-100"}`}
          >
            {option.icon}
            {option.label}
          </button>
        ))}
      </div>

      {/* Mobile View */}
      <div className="flex items-center gap-4 lg:hidden">
        {/* Sort Button */}
        <button onClick={() => setShowSortDrawer(true)} className="flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-2 text-sm">
          مرتب‌سازی
        </button>

        {/* Product Count */}
        <div className="text-sm text-gray-600">
          تعداد: <span className="font-bold">{totalProducts}</span>
        </div>
      </div>

      {/* Desktop Product Count */}
      <div className="hidden text-gray-600 lg:block">
        تعداد محصولات: <span className="font-bold">{totalProducts}</span>
      </div>

      {/* Mobile Sort Drawer */}
      <Drawer isOpen={showSortDrawer} onClose={() => setShowSortDrawer(false)} title="مرتب‌سازی بر اساس">
        <div className="space-y-3">
          {sortOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                updateSortBy(option.value);
                setShowSortDrawer(false);
              }}
              className={`flex w-full items-center justify-between rounded-lg px-4 py-3 ${
                sortBy === option.value ? "bg-primary-50 text-primary-600 border-primary-200 border" : "bg-gray-50 hover:bg-gray-100"
              }`}
            >
              <div className="flex items-center gap-2">
                {option.icon}
                {option.label}
              </div>
              {sortBy === option.value && <span className="text-primary-500">✓</span>}
            </button>
          ))}
        </div>
      </Drawer>
    </div>
  );
}

export default Sorting;
