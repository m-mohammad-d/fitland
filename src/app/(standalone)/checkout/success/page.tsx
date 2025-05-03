import Celebration from "@/components/ui/Celebration";

function checkoutSuccessPage() {
  return (
    <div>
      <Celebration
        title="سفارش شما با موفقیت ثبت شد 🎉"
        message="از خرید شما متشکریم! جزئیات سفارش را می‌توانید در صفحه سفارشات مشاهده کنید."
        redirectText="مشاهده سفارش"
        redirectTo="/account/orders"
      />
    </div>
  );
}

export default checkoutSuccessPage;
