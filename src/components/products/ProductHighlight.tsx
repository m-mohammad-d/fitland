import React from "react";
import ProductCard from "./ProductCard";
import { Product } from "@/types/Products";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { cn } from "@/utils/utils";
import {
  MdKeyboardArrowRight,
  MdOutlineKeyboardArrowLeft,
} from "react-icons/md";

interface ProductHighlightProps {
  title: string;
  className?: string;
  products: Product[] | undefined;
}

const ProductHighlight: React.FC<ProductHighlightProps> = ({
  title,
  className,
  products,
}) => {
  return (
    <div
      className={cn(
        "rounded-lg mt-16 md:mt-20 p-4 md:p-8 relative shadow-md",
        className
      )}
    >
      <h2 className="text-lg md:text-xl text-secondary font-semibold text-center w-fit absolute -top-4 md:-top-5 rounded-bl-2xl rounded-br-2xl md:rounded-bl-3xl md:rounded-br-3xl bg-white left-1/2 transform -translate-x-1/2 px-3 md:px-6 py-1 md:py- mb-4 md:mb-8">
        {title}
      </h2>
      <div className="mx-auto relative container mt-10 px-2 md:px-6 py-3 md:py-6">
        <button
          id="next-btn"
          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-transparent shadow-md p-2 rounded-full text-secondary"
        >
          <MdKeyboardArrowRight size={20} />
        </button>
        <button
          id="prev-btn"
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-transparent shadow-md p-2 rounded-full text-secondary"
        >
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
            <div className="text-center py-8 text-gray-500">
              No products to display
            </div>
          )}
        </Swiper>
      </div>
    </div>
  );
};

export default ProductHighlight;
