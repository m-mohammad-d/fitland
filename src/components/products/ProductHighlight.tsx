"use client";

import React from "react";
import ProductCard from "./ProductCard";
import { Product } from "@/types/Products";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { MdKeyboardArrowRight, MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { cn } from "@/lib/utils";

interface ProductHighlightProps {
  title: string;
  className?: string;
  products: Product[] | undefined;
}

const ProductHighlight: React.FC<ProductHighlightProps> = ({ title, className, products }) => {
  if (!products || products.length === 0) return null;

  return (
    <section className={cn("w-full py-8", className)}>
      <div className="container mx-auto px-4">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
          <div className="flex gap-2">
            <button className="swiper-button-prev-custom rounded-full bg-gray-100 p-2 hover:bg-gray-200">
              <MdOutlineKeyboardArrowLeft size={24} />
            </button>
            <button className="swiper-button-next-custom rounded-full bg-gray-100 p-2 hover:bg-gray-200">
              <MdKeyboardArrowRight size={24} />
            </button>
          </div>
        </div>

        <Swiper
          spaceBetween={16}
          slidesPerView={1.2}
          breakpoints={{
            640: { slidesPerView: 2.2 },
            768: { slidesPerView: 3.2 },
            1024: { slidesPerView: 4.2 },
          }}
          navigation={{
            nextEl: ".swiper-button-next-custom",
            prevEl: ".swiper-button-prev-custom",
          }}
          modules={[Navigation]}
        >
          {products.map((product) => (
            <SwiperSlide key={product.id}>
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default ProductHighlight;
