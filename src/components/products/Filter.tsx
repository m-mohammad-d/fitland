"use client";
import { useState, useCallback, useEffect } from "react";
import { useFilters } from "@/provider/FilterProvider";
import { useQuery } from "@apollo/client";
import { GET_CATEGORIES } from "@/graphql/queries/categoryQueries";
import { ApolloGetCategorysResponse } from "@/types/Category";
import { FiXCircle, FiCheck, FiChevronDown, FiChevronUp } from "react-icons/fi";
import { useDebounce } from "@/hooks/useDebounce";
import { Brands } from "@/constants/Brands";
import { colors } from "@/constants/Colors";
import { Sizes } from "@/constants/Sizes";
import { cn } from "@/lib/utils";

type FilterKey = "category" | "brand" | "colors" | "sizes";

const Filter = () => {
  const { filters, updateFilters, activeSections, setActiveSections, resetFilters } = useFilters();
  const { data } = useQuery<ApolloGetCategorysResponse>(GET_CATEGORIES);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [priceInputs, setPriceInputs] = useState({
    minPrice: filters.minPrice || 0,
    maxPrice: filters.maxPrice || 10000000,
  });

  const debouncedMinPrice = useDebounce(priceInputs.minPrice, 500);
  const debouncedMaxPrice = useDebounce(priceInputs.maxPrice, 500);

  useEffect(() => {
    const updates: Partial<typeof filters> = {};
    let hasUpdates = false;

    if (debouncedMinPrice !== filters.minPrice) {
      updates.minPrice = debouncedMinPrice;
      hasUpdates = true;
    }

    if (debouncedMaxPrice !== filters.maxPrice) {
      updates.maxPrice = debouncedMaxPrice;
      hasUpdates = true;
    }

    if (hasUpdates) {
      if (!isMounted) {
        setIsMounted(true);
      } else {
        updateFilters(updates);
      }
    }
  }, [debouncedMinPrice, debouncedMaxPrice]);

  const toggleSection = useCallback((section: string) => {
    setActiveSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  }, []);

  const handleSelection = useCallback(
    (value: string, key: FilterKey) => {
      const currentValues = filters[key] || [];
      const newValues = currentValues.includes(value) ? currentValues.filter((item) => item !== value) : [...currentValues, value];

      updateFilters({
        [key]: newValues,
      });
    },
    [filters, updateFilters],
  );

  const handlePriceChange = (type: "min" | "max", value: number) => {
    const newValue = Math.max(0, Math.min(10000000, value));
    setPriceInputs((prev) => ({
      ...prev,
      [`${type}Price`]: newValue,
    }));
  };

  return (
    <div className="w-full space-y-4 rounded-xl border border-neutral-400 bg-white p-4 shadow-lg md:p-6 lg:w-80">
      <div className="flex items-center justify-between border-b border-gray-100 pb-4">
        <h3 className="text-xl font-bold text-gray-900">فیلتر محصولات</h3>
        <button onClick={resetFilters} className="flex items-center gap-1 text-sm text-red-500 transition-colors hover:text-red-600">
          <FiXCircle className="text-base" />
          حذف همه فیلترها
        </button>
      </div>

      {/* Brand Filter */}
      <div className="border-b border-gray-100 pb-4">
        <button onClick={() => toggleSection("brand")} className="flex w-full items-center justify-between py-2">
          <h4 className="font-semibold text-gray-800">برند</h4>
          {activeSections.brand ? <FiChevronUp className="text-gray-500" /> : <FiChevronDown className="text-gray-500" />}
        </button>
        {activeSections.brand && (
          <div className="mt-3 grid grid-cols-3 gap-2">
            {Brands.map((brand) => (
              <button
                key={brand}
                onClick={() => handleSelection(brand, "brand")}
                className={cn(
                  "flex items-center justify-center gap-1 rounded-lg border px-2 py-1.5",
                  "text-xs transition-all duration-200 md:text-sm",
                  filters.brand?.includes(brand) ? "border-blue-600 bg-blue-600 text-white shadow-md" : "border-gray-200 bg-gray-50 hover:border-gray-300 hover:bg-gray-100",
                )}
              >
                {filters.brand?.includes(brand) && <FiCheck className="text-xs" />}
                {brand}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Category Filter */}
      <div className="border-b border-gray-100 pb-4">
        <button onClick={() => toggleSection("category")} className="flex w-full items-center justify-between py-2">
          <h4 className="font-semibold text-gray-800">دسته‌بندی</h4>
          {activeSections.category ? <FiChevronUp className="text-gray-500" /> : <FiChevronDown className="text-gray-500" />}
        </button>
        {activeSections.category && (
          <div className="mt-3 grid grid-cols-2 gap-2">
            {data?.categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleSelection(cat.id, "category")}
                className={cn(
                  "flex items-center gap-1 rounded-lg border px-2 py-1.5",
                  "text-xs transition-all duration-200 md:text-sm",
                  filters.category?.includes(cat.id) ? "border-blue-600 bg-blue-600 text-white shadow-md" : "border-gray-200 bg-gray-50 hover:border-gray-300 hover:bg-gray-100",
                )}
              >
                {filters.category?.includes(cat.id) && <FiCheck className="text-xs" />}
                {cat.name}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Color Filter */}
      <div className="border-b border-gray-100 pb-4">
        <button onClick={() => toggleSection("colors")} className="flex w-full items-center justify-between py-2">
          <h4 className="font-semibold text-gray-800">رنگ‌ها</h4>
          {activeSections.colors ? <FiChevronUp className="text-gray-500" /> : <FiChevronDown className="text-gray-500" />}
        </button>
        {activeSections.colors && (
          <div className="mt-3 grid grid-cols-6 gap-2">
            {colors.map((color) => (
              <button
                key={color.name}
                onClick={() => handleSelection(color.name, "colors")}
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full border-2 transition-all duration-200",
                  "hover:scale-110 hover:shadow-md",
                  filters.colors?.includes(color.name) ? "scale-110 border-blue-600 shadow-md" : "border-gray-200",
                )}
                style={{ backgroundColor: color.hex }}
                title={color.name}
              >
                {filters.colors?.includes(color.name) && <FiCheck className="text-xs text-white" />}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Size Filter */}
      <div className="border-b border-gray-100 pb-4">
        <button onClick={() => toggleSection("sizes")} className="flex w-full items-center justify-between py-2">
          <h4 className="font-semibold text-gray-800">سایزها</h4>
          {activeSections.sizes ? <FiChevronUp className="text-gray-500" /> : <FiChevronDown className="text-gray-500" />}
        </button>
        {activeSections.sizes && (
          <div className="mt-3 grid grid-cols-4 gap-2">
            {Sizes.map((size) => (
              <button
                key={size}
                onClick={() => handleSelection(size, "sizes")}
                className={cn(
                  "flex items-center justify-center rounded-lg border px-2 py-1.5",
                  "text-xs transition-all duration-200 md:text-sm",
                  filters.sizes?.includes(size) ? "border-blue-600 bg-blue-600 text-white shadow-md" : "border-gray-200 bg-gray-50 hover:border-gray-300 hover:bg-gray-100",
                )}
              >
                {filters.sizes?.includes(size) && <FiCheck className="text-xs" />}
                {size}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Availability Filter */}
      <div className="border-b border-gray-100 pb-4">
        <button onClick={() => toggleSection("availability")} className="flex w-full items-center justify-between py-2">
          <h4 className="font-semibold text-gray-800">موجودی</h4>
          {activeSections.availability ? <FiChevronUp className="text-gray-500" /> : <FiChevronDown className="text-gray-500" />}
        </button>
        {activeSections.availability && (
          <div className="mt-3">
            <label className="flex cursor-pointer items-center justify-between rounded-lg p-2 hover:bg-gray-50">
              <span className="text-sm text-gray-700">فقط محصولات موجود</span>
              <input
                type="checkbox"
                checked={filters.availableOnly || false}
                onChange={() => updateFilters({ availableOnly: !filters.availableOnly })}
                className="h-4 w-4 rounded text-blue-600 focus:ring-blue-500"
              />
            </label>
          </div>
        )}
      </div>

      {/* Price Range Filter */}
      <div className="pb-2">
        <button onClick={() => toggleSection("price")} className="flex w-full items-center justify-between py-2">
          <h4 className="font-semibold text-gray-800">محدوده قیمت</h4>
          {activeSections.price ? <FiChevronUp className="text-gray-500" /> : <FiChevronDown className="text-gray-500" />}
        </button>
        {activeSections.price && (
          <div className="mt-3 space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <label className="mb-1 block text-xs text-gray-500">حداقل</label>
                <div className="relative">
                  <span className="absolute top-1/2 left-2 -translate-y-1/2 transform text-xs text-gray-400">تومان</span>
                  <input
                    type="number"
                    value={priceInputs.minPrice}
                    min="0"
                    max="10000000"
                    onChange={(e) => handlePriceChange("min", Number(e.target.value))}
                    className="w-full rounded-lg border p-2 pl-10 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="flex-1">
                <label className="mb-1 block text-xs text-gray-500">حداکثر</label>
                <div className="relative">
                  <span className="absolute top-1/2 left-2 -translate-y-1/2 transform text-xs text-gray-400">تومان</span>
                  <input
                    type="number"
                    value={priceInputs.maxPrice}
                    min="0"
                    max="10000000"
                    onChange={(e) => handlePriceChange("max", Number(e.target.value))}
                    className="w-full rounded-lg border p-2 pl-10 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-gray-100">
              <div className="h-full bg-blue-500" style={{ width: "100%" }}></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Filter;
