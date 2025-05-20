"use client";
import { useState } from "react";
import CommentCard from "./CommentCard";
import { Comment } from "@/types/Comment";
import { Drawer } from "../ui/Drawer";
import Button from "../ui/Button";
import AddComment from "./AddComment";
import Image from "next/image";
import { FaStar, FaThumbsUp } from "react-icons/fa";

interface ProductCommentListProps {
  comments: Comment[];
  productId: string;
}
type SortOption = "newest" | "highest" | "lowest";
function ProductCommentList({ comments, productId }: ProductCommentListProps) {
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [showSortDrawer, setShowSortDrawer] = useState(false);
  const [showCreateComment, setShowCreateComment] = useState(false);

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
    <div className="container mx-auto mt-12 border-t border-neutral-400 px-4 py-8">
      <div className="mb-6 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <h2 className="text-2xl font-bold text-gray-800">نظرات مشتریان</h2>

        <div className="w-full md:w-auto">
          <div className="hidden items-center gap-1 rounded-lg bg-gray-100 p-1 md:flex">
            {sortOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setSortBy(option.value as SortOption)}
                className={`rounded-md px-4 py-2 text-sm transition-colors ${sortBy === option.value ? "text-primary-600 bg-white shadow-sm" : "text-gray-600 hover:text-gray-800"}`}
              >
                {option.label}
              </button>
            ))}
          </div>

          <button onClick={() => setShowSortDrawer(true)} className="flex w-full items-center justify-between rounded-lg border border-gray-300 px-4 py-2 text-gray-700 md:hidden">
            <span>مرتب‌سازی: {sortOptions.find((o) => o.value === sortBy)?.label}</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>

      <div className="mb-8 rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-8">
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {comments.slice(0, 3).map((comment, index) => (
                  <div key={index} className="relative h-8 w-8 overflow-hidden rounded-full border-2 border-white">
                    {comment.user?.photo ? (
                      <Image src={comment.user.photo} alt={comment.user.name} fill className="object-cover" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-neutral-200 text-neutral-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-900">{comments.length} نظر</span>
                <span className="text-xs text-gray-500">از {new Set(comments.map((c) => c.user?.id)).size} کاربر</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <FaStar className="text-yellow-400" />
                <span className="text-sm font-medium text-gray-900">{Math.round(comments.reduce((acc, curr) => acc + curr.rating, 0) / comments.length || 0)}</span>
              </div>
              <div className="h-4 w-px bg-gray-200"></div>
              <div className="flex items-center gap-2">
                <FaThumbsUp className="text-green-500" />
                <span className="text-sm text-gray-600">{comments.reduce((acc, curr) => acc + (curr.likes || 0), 0)} پسند</span>
              </div>
            </div>
          </div>

          <Button onClick={() => setShowCreateComment(true)} className="bg-primary-600 hover:bg-primary-700 flex items-center gap-2 px-6 py-2.5 text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            ثبت نظر جدید
          </Button>
        </div>
      </div>

      <div className="flex justify-between">
        {sortedComments.length === 0 ? (
          <div className="rounded-xl bg-white p-8 text-center text-gray-500 shadow-sm">هنوز نظری برای این محصول ثبت نشده است.</div>
        ) : (
          <div className="flex-1 space-y-4">
            {sortedComments.map((comment) => (
              <CommentCard key={comment.id} comment={comment} />
            ))}
          </div>
        )}
      </div>

      <Drawer isOpen={showSortDrawer} onClose={() => setShowSortDrawer(false)} title="مرتب‌سازی نظرات">
        <div className="space-y-2">
          {sortOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                setSortBy(option.value as SortOption);
                setShowSortDrawer(false);
              }}
              className={`w-full rounded-lg px-4 py-3 text-right transition-colors ${sortBy === option.value ? "bg-primary-50 text-primary-600" : "text-gray-700 hover:bg-gray-100"}`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </Drawer>
      <AddComment onClose={() => setShowCreateComment(false)} isOpen={showCreateComment} productId={productId} />
    </div>
  );
}

export default ProductCommentList;
