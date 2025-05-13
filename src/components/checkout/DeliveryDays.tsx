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
              className={`hover:border-primary-400 flex h-full min-h-[180px] flex-col items-center rounded-xl border-2 border-neutral-200 bg-white p-4 shadow-sm transition-colors hover:shadow-md sm:p-6 ${
                checkout.deliveryDate === day.date ? "ring-primary-400 border-primary-400 ring-2" : ""
              } w-full sm:w-28 md:w-32 lg:w-36`}
              onClick={() => {
                setCheckoutField("deliveryDate", day.date);
                setCheckoutField("shippingCost", day.shippingPrice);
              }}
            >
              <div className="mb-3 flex items-start justify-between">
                <div>
                  <h4 className="text-secondary-700 text-lg font-bold">{day.day}</h4>
                  <p className="text-sm text-neutral-600">{day.date}</p>
                </div>
              </div>

              <div className="mt-auto text-center">
                <p className="text-sm text-neutral-500">هزینه ارسال:</p>
                <p className="text-primary-600 text-xl font-bold">{day.shippingPrice.toLocaleString("fa-IR")} تومان</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default DeliveryDays;
