import DeliveryDays from "@/components/checkout/DeliveryDays";
import OrderProgressBar from "@/components/checkout/OrderProgressBar";
import { getWorkingDays } from "@/lib/getWorkingDays";
import Link from "next/link";

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
      <div className="flex flex-col md:flex-row md:items-start gap-8 max-w-full overflow-hidden">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl text-neutral-800 mt-6 font-bold mb-8">
            انتخاب تاریخ تحویل
          </h2>
          <DeliveryDays workingDays={workingDaysWithShippingPrice} />
        </div>

        <div className="md:w-64 lg:w-96 shrink-0">
          <div className="bg-background p-6 rounded-xl shadow-lg border border-neutral-100">
            <h2 className="text-xl font-semibold mb-6">توجه به زمان تحویل</h2>
            <div className="space-y-4 text-neutral-600 text-sm">
              <p>
                زمان تحویل انتخابی شما نهایی بوده و امکان تغییر آن پس از ثبت
                سفارش وجود ندارد.
              </p>
              <p>لطفاً با دقت تاریخ و زمان مورد نظر خود را انتخاب نمایید.</p>
              <div className="text-yellow-600 bg-yellow-50 p-3 rounded-lg">
                در صورت عدم حضور در زمان تحویل، مسئولیت آن بر عهده خریدار خواهد
                بود.
              </div>
            </div>

            <div className="pt-6">
              <Link
                href="/checkout/payment"
                className="w-full inline-block text-center bg-primary-600 hover:bg-primary-700 text-white py-3 px-4 rounded-lg transition-colors font-medium shadow-md hover:shadow-lg"
              >
                تایید زمان و ادامه به پرداخت
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeliveryDatePage;
