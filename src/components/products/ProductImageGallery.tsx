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
      <div
        onClick={() => openModal(0)}
        className="relative aspect-video w-full rounded overflow-hidden cursor-pointer bg-gray-100"
      >
        {mainImage ? (
          <Image
            src={mainImage}
            alt="تصویر اصلی"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            بدون تصویر
          </div>
        )}
      </div>

      <div className="flex gap-2 items-center">
        {thumbnails.map((img, index) => (
          <div
            key={index + 1}
            onClick={() => openModal(index + 1)}
            className="relative w-20 h-20 rounded overflow-hidden bg-gray-100 cursor-pointer"
          >
            <Image
              src={img}
              alt={`تصویر ${index + 1}`}
              fill
              className="object-cover"
              sizes="80px"
            />
          </div>
        ))}

        {hasMore && (
          <div
            onClick={() => openModal(0)}
            className="w-20 h-20 flex items-center justify-center bg-gray-200 rounded cursor-pointer hover:bg-gray-300 text-sm text-gray-600"
          >
            +{images.length - 3}
          </div>
        )}
      </div>

      {isOpen &&
        createPortal(
          <div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
        
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 left-4 text-white text-3xl z-50"
            >
              <HiXMark />
            </button>

            <div
              ref={prevRef}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-2 bg-white rounded-full shadow-lg cursor-pointer"
            >
              <HiChevronRight className="w-6 h-6 text-black" />
            </div>
            <div
              ref={nextRef}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-2 bg-white rounded-full shadow-lg cursor-pointer"
            >
              <HiChevronLeft className="w-6 h-6 text-black" />
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
                // @ts-ignore
                swiper.params.navigation.prevEl = prevRef.current;
                // @ts-ignore
                swiper.params.navigation.nextEl = nextRef.current;
              }}
              onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
              className="w-full max-w-4xl"
            >
              {images.map((img, index) => (
                <SwiperSlide key={index}>
                  <div className="relative w-full h-[60vh] flex items-center justify-center">
                    <Image
                      src={img}
                      alt={`تصویر ${index}`}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 90vw, 70vw"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            <div className="absolute bottom-4 right-1/2 translate-x-1/2 flex gap-2 overflow-x-auto px-4">
              {images.map((img, index) => (
                <div
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`relative w-16 h-16 rounded border-2 cursor-pointer transition ${
                    index === activeIndex
                      ? "border-white"
                      : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`پیش‌نمایش ${index}`}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </div>
              ))}
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
