"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CiSearch } from "react-icons/ci";
import { IoIosTrendingUp } from "react-icons/io";
import { BsClockHistory } from "react-icons/bs";
import { useQuery } from "@apollo/client";
import { GET_PRODUCTS } from "@/graphql/queries/productQueries";
import SearchResults from "./SearchResults";
import Link from "next/link";
import { useRouter } from "next/navigation";

const RECENT_SEARCHES_KEY = "recent-searches";
const MAX_RECENT_SEARCHES = 3;
const MAX_DISPLAYED_PRODUCTS = 3;

export default function SearchBar({ onSearch }: { onSearch: (query: string) => void }) {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const popularSearches = ["کفش فوتبال", "کفش پیاده روی", "جوراب ورزشی"];
  const searchRef = useRef<HTMLDivElement>(null);

  const { data , loading} = useQuery(GET_PRODUCTS, {
    skip: query.length < 3,
    variables: {
      filters: {
        search: query,
      },
    },
  });

  useEffect(() => {
    const savedSearches = localStorage.getItem(RECENT_SEARCHES_KEY);
    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches));
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const saveRecentSearch = (search: string) => {
    const newSearches = [search, ...recentSearches.filter((s) => s !== search)].slice(0, MAX_RECENT_SEARCHES);
    setRecentSearches(newSearches);
    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(newSearches));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  const handleFocus = () => {
    setIsOpen(true);
  };

  const handleItemClick = (item: string) => {
    setQuery(item);
    saveRecentSearch(item);
    onSearch(item);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && query.trim()) {
      saveRecentSearch(query.trim());
      setIsOpen(false);
      router.push(`/products?search=${encodeURIComponent(query.trim())}`);
    }
  };

  const renderSearchSection = (title: string, icon: React.ReactNode, items: string[]) => (
    <div>
      <div className="mb-3 flex items-center gap-2">
        {icon}
        <p className="text-sm text-neutral-500">{title}</p>
      </div>
      <div className="flex flex-wrap gap-2">
        {items.map((item, index) => (
          <span key={index} className="cursor-pointer rounded-full bg-neutral-200 px-3 py-1 text-sm transition-colors duration-200 hover:bg-neutral-600" onClick={() => handleItemClick(item)}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );

  return (
    <div ref={searchRef} className="relative mx-auto w-full max-w-lg">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="relative">
        <CiSearch className="text-primary absolute top-1/2 right-3 -translate-y-1/2" size={20} />
        <input
          type="text"
          value={query}
          onChange={handleChange}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          placeholder="جستجو کنید..."
          className="w-full rounded-lg border border-gray-300 py-2 pr-10 pl-4 shadow-sm transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="search-dropdown"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-10 mt-2 w-full rounded-lg border border-gray-300 bg-white p-3 shadow-lg"
          >
            {query.length < 3 ? (
              <>
                {recentSearches.length > 0 && (
                  <>
                    {renderSearchSection("جستجوهای اخیر", <BsClockHistory className="text-neutral-500" />, recentSearches)}
                    <hr className="my-2" />
                  </>
                )}
                {renderSearchSection("جستجوهای پرطرفدار", <IoIosTrendingUp className="text-neutral-500" />, popularSearches)}
              </>
            ) : loading ? (
              <div className="flex justify-center items-center py-8">
                <span className="inline-block h-6 w-6 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-.125em]"></span>
              </div>
            ) : (
              <>
                <SearchResults products={data?.products.items.slice(0, MAX_DISPLAYED_PRODUCTS) || []} onProductClick={() => setIsOpen(false)} />
                {data?.products.items.length > MAX_DISPLAYED_PRODUCTS && (
                  <div className="mt-4 text-center">
                    <Link
                      href={`/products?search=${encodeURIComponent(query)}`}
                      onClick={() => setIsOpen(false)}
                      className="bg-primary hover:bg-primary-dark inline-block rounded-lg px-4 py-2 text-white transition-colors duration-200"
                    >
                      مشاهده همه نتایج ({data.products.items.length})
                    </Link>
                  </div>
                )}
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
