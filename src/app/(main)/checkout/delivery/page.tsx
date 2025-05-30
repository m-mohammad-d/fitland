import DeliveryDays from "@/components/checkout/DeliveryDays";
import OrderProgressBar from "@/components/checkout/OrderProgressBar";
import CheckoutContinueButton from "@/components/checkout/CheckoutContinueButton";
import { getWorkingDays } from "@/lib/getWorkingDays";
import { Metadata } from "next/types";

export const metadata: Metadata = {
  title: "روش ارسال",
  description: "روش ارسال مناسب را برای سفارش خود انتخاب کنید.",
  openGraph: {
    title: "انتخاب روش ارسال | FitLand",
    description: "ارسال سریع یا عادی؟ روش مورد نظر خود را انتخاب کنید.",
  },
  twitter: {
    title: "ارسال سفارش",
    description: "روش ارسال دلخواه‌تان را انتخاب نمایید.",
  },
};

function DeliveryDatePage() {
  const workingDays = getWorkingDays();

  const workingDaysWithShippingPrice = workingDays.map((workingDay, index) => {
    let shippingPrice = 50000;
    if (index === 0) shippingPrice = 70000;
    if (index === 1) shippingPrice = 70000;

    return {
      ...workingDay,
      shippingPrice,
    };
  });

  return (
    <div className="container mx-auto my-12 px-4">
      <OrderProgressBar currentStep={2} />
      <div className="flex max-w-full flex-col gap-8 overflow-hidden md:flex-row md:items-start">
        <div className="min-w-0 flex-1">
          <h2 className="mt-6 mb-8 text-2xl font-bold text-neutral-800">انتخاب تاریخ تحویل</h2>
          <DeliveryDays workingDays={workingDaysWithShippingPrice} />
        </div>

        <div className="shrink-0 md:w-64 lg:w-96">
          <div className="bg-background rounded-xl border border-neutral-100 p-6 shadow-lg">
            <h2 className="mb-6 text-xl font-semibold">توجه به زمان تحویل</h2>
            <div className="space-y-4 text-sm text-neutral-600">
              <p>زمان تحویل انتخابی شما نهایی بوده و امکان تغییر آن پس از ثبت سفارش وجود ندارد.</p>
              <p>لطفاً با دقت تاریخ و زمان مورد نظر خود را انتخاب نمایید.</p>
              <div className="rounded-lg bg-yellow-50 p-3 text-yellow-600">در صورت عدم حضور در زمان تحویل، مسئولیت آن بر عهده خریدار خواهد بود.</div>
            </div>

            <div className="pt-6">
              <CheckoutContinueButton
                href="/checkout/payment-method"
                text="تایید زمان و ادامه به پرداخت"
                validationField="deliveryDate"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeliveryDatePage;
