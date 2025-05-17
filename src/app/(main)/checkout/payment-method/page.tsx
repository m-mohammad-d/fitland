import PaymentMethods from "@/components/checkout/PaymentMethods";
import OrderProgressBar from "@/components/checkout/OrderProgressBar";
import DiscountCode from "@/components/checkout/DiscountCode";
import { Metadata } from "next/types";
export const metadata: Metadata = {
  title: "روش پرداخت",
  description: "یکی از روش‌های پرداخت را انتخاب کنید تا سفارش نهایی شود.",
  openGraph: {
    title: "پرداخت | FitLand",
    description: "پرداخت اینترنتی یا کیف پول؟ انتخاب با شماست.",
  },
  twitter: {
    title: "پرداخت سفارش",
    description: "روش دلخواه برای پرداخت سفارش خود را مشخص کنید.",
  },
};
function PaymentMethodPage() {
  return (
    <div className="container mx-auto my-6 max-w-6xl px-4 md:my-12">
      <OrderProgressBar currentStep={3} />

      <div className="mt-8 grid gap-8 md:grid-cols-[1fr_340px]">
        <div className="space-y-8">
          <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">روش پرداخت خود را انتخاب کنید</h1>

          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <DiscountCode />
            <PaymentMethods />
          </div>
        </div>

        <div className="order-first md:order-last">
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold">
              <span className="text-emerald-600">•</span>
              نکات مهم پرداخت
            </h2>

            <div className="space-y-4 text-sm text-gray-600">
              <p className="leading-relaxed">پس از انتخاب روش پرداخت و تایید نهایی، سفارش شما ثبت خواهد شد. لطفا از صحت اطلاعات پرداخت اطمینان حاصل فرمایید.</p>

              <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-amber-700">
                <p className="font-medium">توجه:</p>
                <p>در صورت عدم موفقیت در پرداخت، سفارش به صورت قطعی ثبت نخواهد شد.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentMethodPage;
