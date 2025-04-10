"use client";
import { useTransition, useState, useCallback, useEffect } from "react";
import { useFilters } from "@/provider/FilterProvider";
import { useQuery } from "@apollo/client";
import { GET_CATEGORIES } from "@/graphql/queries/categoryQueries";
import { GetCategorysResponse } from "@/types/Category";
import { FiXCircle, FiCheck, FiChevronDown, FiChevronUp } from "react-icons/fi";
import { useDebounce } from "@/hooks/useDebounce";
import { Brands } from "@/lib/Brands";
import { colors } from "@/lib/Colors";
import { Sizes } from "@/lib/Sizes";
import { cn } from "@/lib/utils";

type FilterKey = "category" | "brand" | "colors" | "sizes";

const Filter = () => {
  const { filters, updateFilters, activeSections, setActiveSections } =
    useFilters();
  const { data, loading } = useQuery<GetCategorysResponse>(GET_CATEGORIES);
  const [isPending, startTransition] = useTransition();

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
      startTransition(() => {
        updateFilters(updates);
      });
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
      startTransition(() => {
        const currentValues = filters[key] || [];
        const newValues = currentValues.includes(value)
          ? currentValues.filter((item) => item !== value)
          : [...currentValues, value];

        updateFilters({
          [key]: newValues,
        });
      });
    },
    [filters, updateFilters]
  );

  const resetFilters = useCallback(() => {
    startTransition(() => {
      updateFilters({
        category: [],
        brand: [],
        colors: [],
        sizes: [],
        availableOnly: false,
        minPrice: undefined,
        maxPrice: undefined,
      });
      setPriceInputs({
        minPrice: 0,
        maxPrice: 10000000,
      });
    });
  }, [updateFilters]);

  const handlePriceChange = (type: "min" | "max", value: number) => {
    const newValue = Math.max(0, Math.min(10000000, value));
    setPriceInputs((prev) => ({
      ...prev,
      [`${type}Price`]: newValue,
    }));
  };

  return (
    <div className="p-4 md:p-6 border border-neutral-400 rounded-xl bg-white shadow-lg w-full lg:w-80 space-y-4">
      <div className="flex justify-between items-center pb-4 border-b border-gray-100">
        <h3 className="text-xl font-bold text-gray-900">فیلتر محصولات</h3>
        <button
          onClick={resetFilters}
          className="text-red-500 flex items-center gap-1 text-sm hover:text-red-600 transition-colors"
        >
          <FiXCircle className="text-base" />
          حذف همه فیلترها
        </button>
      </div>

      {/* Brand Filter */}
      <div className="border-b border-gray-100 pb-4">
        <button
          onClick={() => toggleSection("brand")}
          className="flex justify-between items-center w-full py-2"
        >
          <h4 className="font-semibold text-gray-800">برند</h4>
          {activeSections.brand ? (
            <FiChevronUp className="text-gray-500" />
          ) : (
            <FiChevronDown className="text-gray-500" />
          )}
        </button>
        {activeSections.brand && (
          <div className="grid grid-cols-3 gap-2 mt-3">
            {Brands.map((brand) => (
              <button
                key={brand}
                onClick={() => handleSelection(brand, "brand")}
                className={cn(
                  "px-2 py-1.5 rounded-lg border flex items-center justify-center gap-1",
                  "transition-all duration-200 text-xs md:text-sm",
                  filters.brand?.includes(brand)
                    ? "bg-blue-600 text-white border-blue-600 shadow-md"
                    : "bg-gray-50 border-gray-200 hover:bg-gray-100 hover:border-gray-300"
                )}
              >
                {filters.brand?.includes(brand) && (
                  <FiCheck className="text-xs" />
                )}
                {brand}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Category Filter */}
      <div className="border-b border-gray-100 pb-4">
        <button
          onClick={() => toggleSection("category")}
          className="flex justify-between items-center w-full py-2"
        >
          <h4 className="font-semibold text-gray-800">دسته‌بندی</h4>
          {activeSections.category ? (
            <FiChevronUp className="text-gray-500" />
          ) : (
            <FiChevronDown className="text-gray-500" />
          )}
        </button>
        {activeSections.category && (
          <div className="grid grid-cols-2 gap-2 mt-3">
            {data?.categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleSelection(cat.id, "category")}
                className={cn(
                  "px-2 py-1.5 rounded-lg border flex items-center gap-1",
                  "transition-all duration-200 text-xs md:text-sm",
                  filters.category?.includes(cat.id)
                    ? "bg-blue-600 text-white border-blue-600 shadow-md"
                    : "bg-gray-50 border-gray-200 hover:bg-gray-100 hover:border-gray-300"
                )}
              >
                {filters.category?.includes(cat.id) && (
                  <FiCheck className="text-xs" />
                )}
                {cat.name}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Color Filter */}
      <div className="border-b border-gray-100 pb-4">
        <button
          onClick={() => toggleSection("colors")}
          className="flex justify-between items-center w-full py-2"
        >
          <h4 className="font-semibold text-gray-800">رنگ‌ها</h4>
          {activeSections.colors ? (
            <FiChevronUp className="text-gray-500" />
          ) : (
            <FiChevronDown className="text-gray-500" />
          )}
        </button>
        {activeSections.colors && (
          <div className="grid grid-cols-6 gap-2 mt-3">
            {colors.map((color) => (
              <button
                key={color.name}
                onClick={() => handleSelection(color.name, "colors")}
                className={cn(
                  "w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-200",
                  "hover:scale-110 hover:shadow-md",
                  filters.colors?.includes(color.name)
                    ? "border-blue-600 scale-110 shadow-md"
                    : "border-gray-200"
                )}
                style={{ backgroundColor: color.hex }}
                title={color.name}
              >
                {filters.colors?.includes(color.name) && (
                  <FiCheck className="text-white text-xs" />
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Size Filter */}
      <div className="border-b border-gray-100 pb-4">
        <button
          onClick={() => toggleSection("sizes")}
          className="flex justify-between items-center w-full py-2"
        >
          <h4 className="font-semibold text-gray-800">سایزها</h4>
          {activeSections.sizes ? (
            <FiChevronUp className="text-gray-500" />
          ) : (
            <FiChevronDown className="text-gray-500" />
          )}
        </button>
        {activeSections.sizes && (
          <div className="grid grid-cols-4 gap-2 mt-3">
            {Sizes.map((size) => (
              <button
                key={size}
                onClick={() => handleSelection(size, "sizes")}
                className={cn(
                  "px-2 py-1.5 rounded-lg border flex items-center justify-center",
                  "transition-all duration-200 text-xs md:text-sm",
                  filters.sizes?.includes(size)
                    ? "bg-blue-600 text-white border-blue-600 shadow-md"
                    : "bg-gray-50 border-gray-200 hover:bg-gray-100 hover:border-gray-300"
                )}
              >
                {filters.sizes?.includes(size) && (
                  <FiCheck className="text-xs" />
                )}
                {size}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Availability Filter */}
      <div className="border-b border-gray-100 pb-4">
        <button
          onClick={() => toggleSection("availability")}
          className="flex justify-between items-center w-full py-2"
        >
          <h4 className="font-semibold text-gray-800">موجودی</h4>
          {activeSections.availability ? (
            <FiChevronUp className="text-gray-500" />
          ) : (
            <FiChevronDown className="text-gray-500" />
          )}
        </button>
        {activeSections.availability && (
          <div className="mt-3">
            <label className="flex items-center justify-between cursor-pointer p-2 rounded-lg hover:bg-gray-50">
              <span className="text-sm text-gray-700">فقط محصولات موجود</span>
              <input
                type="checkbox"
                checked={filters.availableOnly || false}
                onChange={() =>
                  startTransition(() =>
                    updateFilters({ availableOnly: !filters.availableOnly })
                  )
                }
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
            </label>
          </div>
        )}
      </div>

      {/* Price Range Filter */}
      <div className="pb-2">
        <button
          onClick={() => toggleSection("price")}
          className="flex justify-between items-center w-full py-2"
        >
          <h4 className="font-semibold text-gray-800">محدوده قیمت</h4>
          {activeSections.price ? (
            <FiChevronUp className="text-gray-500" />
          ) : (
            <FiChevronDown className="text-gray-500" />
          )}
        </button>
        {activeSections.price && (
          <div className="space-y-3 mt-3">
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <label className="text-xs text-gray-500 block mb-1">
                  حداقل
                </label>
                <div className="relative">
                  <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-xs text-gray-400">
                    تومان
                  </span>
                  <input
                    type="number"
                    value={priceInputs.minPrice}
                    min="0"
                    max="10000000"
                    onChange={(e) =>
                      handlePriceChange("min", Number(e.target.value))
                    }
                    className="w-full p-2 pl-10 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  />
                </div>
              </div>
              <div className="flex-1">
                <label className="text-xs text-gray-500 block mb-1">
                  حداکثر
                </label>
                <div className="relative">
                  <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-xs text-gray-400">
                    تومان
                  </span>
                  <input
                    type="number"
                    value={priceInputs.maxPrice}
                    min="0"
                    max="10000000"
                    onChange={(e) =>
                      handlePriceChange("max", Number(e.target.value))
                    }
                    className="w-full p-2 pl-10 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  />
                </div>
              </div>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500"
                style={{ width: "100%" }}
              ></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Filter;
