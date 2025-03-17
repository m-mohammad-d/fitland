"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CiSearch } from "react-icons/ci";
import { IoIosTrendingUp } from "react-icons/io";
import { BsClockHistory } from "react-icons/bs";

export default function SearchBar({
  onSearch,
}: {
  onSearch: (query: string) => void;
}) {
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
    <div className="relative w-full max-w-lg mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="relative"
      >
        <CiSearch
          className="absolute right-3 top-1/2 -translate-y-1/2 text-primary"
          size={20}
        />
        <input
          type="text"
          value={query}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder="جستجو کنید..."
          className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="absolute w-full bg-white border border-gray-300 rounded-lg shadow-lg mt-2 p-3 z-10"
          >
            <div>
              <div className="flex items-center gap-2 mb-3">
                <BsClockHistory className="text-neutral-500" />
                <p className="text-neutral-500 text-sm ">جستجوهای اخیر</p>
              </div>{" "}
              <div className="flex flex-wrap gap-2">
                {recentSearches.map((item, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 text-sm bg-neutral-200 rounded-full cursor-pointer hover:bg-neutral-600"
                    onMouseDown={() => setQuery(item)}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <hr className="my-2" />

            <div>
              <div className="flex items-center gap-2 mb-3">
                <IoIosTrendingUp className="text-neutral-500" />
                <p className="text-neutral-500 text-sm ">جستجوهای پرطرفدار</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((item, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 text-sm bg-secondary-10 text-secondary rounded-full cursor-pointer hover:bg-secondary-50 transition duration-300"
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
