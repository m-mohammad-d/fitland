"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CiSearch } from "react-icons/ci";
import { IoIosTrendingUp } from "react-icons/io";
import { BsClockHistory } from "react-icons/bs";

export default function SearchBar({ onSearch }: { onSearch: (query: string) => void }) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const recentSearches = ["کفش نایک", "پیراهن ورزشی", "شلوار یوگا"];
  const popularSearches = ["لباس بدنسازی", "کفش فوتبال", "هدبند ورزشی"];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  const handleFocus = () => {
    setIsOpen(true);
  };

  const handleBlur = () => {
    if (!query) setIsOpen(false);
  };

  return (
    <div className="relative mx-auto w-full max-w-lg">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="relative">
        <CiSearch className="text-primary absolute top-1/2 right-3 -translate-y-1/2" size={20} />
        <input
          type="text"
          value={query}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder="جستجو کنید..."
          className="w-full rounded-lg border border-gray-300 py-2 pr-10 pl-4 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="absolute z-10 mt-2 w-full rounded-lg border border-gray-300 bg-white p-3 shadow-lg"
          >
            <div>
              <div className="mb-3 flex items-center gap-2">
                <BsClockHistory className="text-neutral-500" />
                <p className="text-sm text-neutral-500">جستجوهای اخیر</p>
              </div>{" "}
              <div className="flex flex-wrap gap-2">
                {recentSearches.map((item, index) => (
                  <span key={index} className="cursor-pointer rounded-full bg-neutral-200 px-3 py-1 text-sm hover:bg-neutral-600" onMouseDown={() => setQuery(item)}>
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <hr className="my-2" />

            <div>
              <div className="mb-3 flex items-center gap-2">
                <IoIosTrendingUp className="text-neutral-500" />
                <p className="text-sm text-neutral-500">جستجوهای پرطرفدار</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((item, index) => (
                  <span
                    key={index}
                    className="bg-secondary-10 text-secondary hover:bg-secondary-50 cursor-pointer rounded-full px-3 py-1 text-sm transition duration-300"
                    onMouseDown={() => setQuery(item)}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
