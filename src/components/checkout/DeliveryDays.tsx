"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useCart } from "@/store/useCart";

interface DeliveryDay {
  shippingPrice: number;
  day: string;
  date: string;
}

interface DeliveryDaysProps {
  workingDays: DeliveryDay[];
}

function DeliveryDays({ workingDays }: DeliveryDaysProps) {
  const { checkout, setCheckoutField } = useCart();

  return (
    <div className="px-4 py-6">
      <Swiper
        slidesPerView={2.3}
        spaceBetween={10}
        breakpoints={{
          640: {
            slidesPerView: 2.5,
          },
          768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 4,
          },
          1280: {
            slidesPerView: 5,
          },
        }}
      >
        {workingDays.map((day) => (
          <SwiperSlide key={day.date}>
            <div
              className={`
                flex flex-col items-center p-4 sm:p-6 rounded-xl h-full min-h-[180px] 
                border-2 border-neutral-200 hover:border-primary-400 transition-colors
                bg-white shadow-sm hover:shadow-md
                ${
                  checkout.deliveryDate === day.date
                    ? "ring-2 ring-primary-400 border-primary-400"
                    : ""
                }
                w-full sm:w-28 md:w-32 lg:w-36
              `}
              onClick={() => {
                setCheckoutField("deliveryDate", day.date);
                setCheckoutField("shippingCost", day.shippingPrice);
              }}
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-bold text-lg text-secondary-700">
                    {day.day}
                  </h4>
                  <p className="text-neutral-600 text-sm">{day.date}</p>
                </div>
              </div>

              <div className="mt-auto text-center">
                <p className="text-neutral-500 text-sm">هزینه ارسال:</p>
                <p className="font-bold text-xl text-primary-600">
                  {day.shippingPrice.toLocaleString("fa-IR")} تومان
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default DeliveryDays;
