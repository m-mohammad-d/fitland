"use client";
import React from "react";
import ProductCard from "./ProductCard";
import { Product } from "@/types/Products";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { MdKeyboardArrowRight, MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { cn } from "@/lib/utils";

interface ProductHighlightProps {
  title: string;
  className?: string;
  products: Product[] | undefined;
}

const ProductHighlight: React.FC<ProductHighlightProps> = ({ title, className, products }) => {
  return (
    <div className={cn("relative mt-16 rounded-lg p-4 shadow-md md:mt-20 md:p-8", className)}>
      <h2 className="text-secondary md:py- absolute -top-4 left-1/2 mb-4 w-fit -translate-x-1/2 transform rounded-br-2xl rounded-bl-2xl bg-white px-3 py-1 text-center text-lg font-semibold md:-top-5 md:mb-8 md:rounded-br-3xl md:rounded-bl-3xl md:px-6 md:text-xl">
        {title}
      </h2>
      <div className="relative container mx-auto mt-10 px-2 py-3 md:px-6 md:py-6">
        <button id="next-btn" className="text-secondary absolute top-1/2 right-0 z-10 -translate-y-1/2 transform rounded-full bg-transparent p-2 shadow-md">
          <MdKeyboardArrowRight size={20} />
        </button>
        <button id="prev-btn" className="text-secondary absolute top-1/2 left-0 z-10 -translate-y-1/2 transform rounded-full bg-transparent p-2 shadow-md">
          <MdOutlineKeyboardArrowLeft size={20} />
        </button>

        <Swiper
          modules={[Navigation]}
          spaceBetween={10}
          slidesPerView={1.2}
          loop
          breakpoints={{
            480: { slidesPerView: 1.5, spaceBetween: 15 },
            640: { slidesPerView: 2, spaceBetween: 15 },
            768: { slidesPerView: 2.5, spaceBetween: 20 },
            1024: { slidesPerView: 3.5, spaceBetween: 20 },
            1280: { slidesPerView: 4, spaceBetween: 20 },
          }}
          pagination={{ clickable: true }}
          navigation={{
            prevEl: "#prev-btn",
            nextEl: "#next-btn",
          }}
          className="pb-6"
        >
          {products?.length ? (
            products.map((product) => (
              <SwiperSlide key={product.id}>
                <ProductCard product={product} />
              </SwiperSlide>
            ))
          ) : (
            <div className="py-8 text-center text-gray-500">No products to display</div>
          )}
        </Swiper>
      </div>
    </div>
  );
};

export default ProductHighlight;
