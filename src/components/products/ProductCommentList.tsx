"use client";
import { useState } from "react";
import CommentCard from "./CommentCard";
import { Comment } from "@/types/Comment";
import { Drawer } from "../ui/Drawer";

interface ProductCommentListProps {
  comments: Comment[];
}

function ProductCommentList({ comments }: ProductCommentListProps) {
  const [sortBy, setSortBy] = useState<"newest" | "highest" | "lowest">(
    "newest"
  );
  const [showSortDrawer, setShowSortDrawer] = useState(false);

  const sortedComments = [...comments].sort((a, b) => {
    if (sortBy === "newest") {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    } else if (sortBy === "highest") {
      return b.rating - a.rating;
    } else {
      return a.rating - b.rating;
    }
  });

  const sortOptions = [
    { value: "newest", label: "جدیدترین" },
    { value: "highest", label: "بالاترین امتیاز" },
    { value: "lowest", label: "پایین‌ترین امتیاز" },
  ];

  return (
    <div className="container mx-auto px-4 py-8 border-t border-neutral-400 mt-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold text-gray-800">نظرات مشتریان</h2>

        <div className="w-full md:w-auto">
          <div className="hidden md:flex items-center gap-1 bg-gray-100 p-1 rounded-lg">
            {sortOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setSortBy(option.value as any)}
                className={`px-4 py-2 text-sm rounded-md transition-colors ${
                  sortBy === option.value
                    ? "bg-white text-primary-600 shadow-sm"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => setShowSortDrawer(true)}
            className="md:hidden w-full flex items-center justify-between px-4 py-2 border border-gray-300 rounded-lg text-gray-700"
          >
            <span>
              مرتب‌سازی: {sortOptions.find((o) => o.value === sortBy)?.label}
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>

      {sortedComments.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-8 text-center text-gray-500">
          هنوز نظری برای این محصول ثبت نشده است.
        </div>
      ) : (
        <div className="space-y-4">
          {sortedComments.map((comment) => (
            <CommentCard key={comment.id} comment={comment} />
          ))}
        </div>
      )}

      <Drawer
        isOpen={showSortDrawer}
        onClose={() => setShowSortDrawer(false)}
        title="مرتب‌سازی نظرات"
      >
        <div className="space-y-2">
          {sortOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                setSortBy(option.value as any);
                setShowSortDrawer(false);
              }}
              className={`w-full text-right px-4 py-3 rounded-lg transition-colors ${
                sortBy === option.value
                  ? "bg-primary-50 text-primary-600"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </Drawer>
    </div>
  );
}

export default ProductCommentList;
