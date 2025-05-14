"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Keyboard } from "swiper/modules";
import { HiChevronRight, HiChevronLeft, HiXMark } from "react-icons/hi2";
import "swiper/css";
import "swiper/css/navigation";

type Props = {
  images: string[];
};

export default function ProductImageGallery({ images }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const openModal = (index: number) => {
    setActiveIndex(index);
    setIsOpen(true);
  };

  const mainImage = images[0];
  const thumbnails = images.slice(1, 5);
  const hasMore = images.length > 4;

  return (
    <div className="space-y-4" dir="rtl">
      <div onClick={() => openModal(0)} className="relative aspect-video w-full cursor-pointer overflow-hidden rounded bg-gray-100">
        {mainImage ? (
          <Image src={mainImage} alt="تصویر اصلی" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-gray-400">بدون تصویر</div>
        )}
      </div>

      <div className="flex items-center gap-2">
        {thumbnails.map((img, index) => (
          <div key={index + 1} onClick={() => openModal(index + 1)} className="relative h-20 w-20 cursor-pointer overflow-hidden rounded bg-gray-100">
            <Image src={img} alt={`تصویر ${index + 1}`} fill className="object-cover" sizes="80px" />
          </div>
        ))}

        {hasMore && (
          <div onClick={() => openModal(0)} className="flex h-20 w-20 cursor-pointer items-center justify-center rounded bg-gray-200 text-sm text-gray-600 hover:bg-gray-300">
            +{images.length - 3}
          </div>
        )}
      </div>

      {isOpen &&
        createPortal(
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
            <button onClick={() => setIsOpen(false)} className="absolute top-4 left-4 z-50 text-3xl text-white">
              <HiXMark />
            </button>

            <div ref={prevRef} className="absolute top-1/2 right-4 z-50 -translate-y-1/2 cursor-pointer rounded-full bg-white p-2 shadow-lg">
              <HiChevronRight className="h-6 w-6 text-black" />
            </div>
            <div ref={nextRef} className="absolute top-1/2 left-4 z-50 -translate-y-1/2 cursor-pointer rounded-full bg-white p-2 shadow-lg">
              <HiChevronLeft className="h-6 w-6 text-black" />
            </div>

            <Swiper
              modules={[Navigation, Keyboard]}
              initialSlide={activeIndex}
              keyboard={{ enabled: true }}
              navigation={{
                prevEl: prevRef.current!,
                nextEl: nextRef.current!,
              }}
              onBeforeInit={(swiper) => {
                if (swiper.params.navigation) {
                  if (swiper.params.navigation !== true) {
                    swiper.params.navigation.prevEl = prevRef.current;
                    swiper.params.navigation.nextEl = nextRef.current;
                  }
                }
              }}
              onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
              className="w-full max-w-4xl"
            >
              {images.map((img, index) => (
                <SwiperSlide key={index}>
                  <div className="relative flex h-[60vh] w-full items-center justify-center">
                    <Image src={img} alt={`تصویر ${index}`} fill className="object-contain" sizes="(max-width: 768px) 90vw, 70vw" />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            <div className="absolute right-1/2 bottom-4 flex translate-x-1/2 gap-2 overflow-x-auto px-4">
              {images.map((img, index) => (
                <div
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`relative h-16 w-16 cursor-pointer rounded border-2 transition ${index === activeIndex ? "border-white" : "border-transparent opacity-60 hover:opacity-100"}`}
                >
                  <Image src={img} alt={`پیش‌نمایش ${index}`} fill className="object-cover" sizes="64px" />
                </div>
              ))}
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}
