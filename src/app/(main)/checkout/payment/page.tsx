import PaymentMethods from "@/components/checkout/PaymentMethods";
import OrderProgressBar from "@/components/checkout/OrderProgressBar";
function PaymentPage() {
  return (
    <div className="container mx-auto my-12 px-4">
      <OrderProgressBar currentStep={3} />
      <div className="flex flex-col md:flex-row md:items-start gap-8 max-w-full overflow-hidden mt-8">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl text-neutral-800 mt-6 font-bold mb-8">
            انتخاب روش پرداخت
          </h2>
          <PaymentMethods />
        </div>

        <div className="md:w-64 lg:w-96 shrink-0">
          <div className="bg-background p-6 rounded-xl shadow-lg border border-neutral-100">
            <h2 className="text-xl font-semibold mb-6">توجه به روش پرداخت</h2>
            <div className="space-y-4 text-neutral-600 text-sm">
              <p>
                لطفاً یک روش پرداخت مناسب انتخاب نمایید. پس از تکمیل فرآیند
                پرداخت، سفارش شما نهایی خواهد شد.
              </p>
              <p>در صورتی که مشکلی در پرداخت به وجود آید، با ما تماس بگیرید.</p>
              <div className="text-yellow-600 bg-yellow-50 p-3 rounded-lg">
                در صورت عدم موفقیت در پرداخت، سفارش شما ثبت نخواهد شد.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentPage;
