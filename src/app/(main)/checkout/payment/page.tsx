import PaymentMethods from "@/components/checkout/PaymentMethods";
import OrderProgressBar from "@/components/checkout/OrderProgressBar";
import DiscountCode from "@/components/checkout/DiscountCode";
function PaymentPage() {
  return (
    <div className="container mx-auto my-6 md:my-12 px-4 max-w-6xl">
      <OrderProgressBar currentStep={3} />

      <div className="grid md:grid-cols-[1fr_340px] gap-8 mt-8">
        <div className="space-y-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            روش پرداخت خود را انتخاب کنید
          </h1>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <DiscountCode />
            <PaymentMethods />
          </div>
        </div>

        <div className="order-first md:order-last">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <span className="text-emerald-600">•</span>
              نکات مهم پرداخت
            </h2>

            <div className="space-y-4 text-gray-600 text-sm">
              <p className="leading-relaxed">
                پس از انتخاب روش پرداخت و تایید نهایی، سفارش شما ثبت خواهد شد.
                لطفا از صحت اطلاعات پرداخت اطمینان حاصل فرمایید.
              </p>

              <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-amber-700">
                <p className="font-medium">توجه:</p>
                <p>
                  در صورت عدم موفقیت در پرداخت، سفارش به صورت قطعی ثبت نخواهد
                  شد.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentPage;
