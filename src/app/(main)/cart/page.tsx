"use client";
import CartItem from "@/components/ui/CartItem";
import { useCart } from "@/store/useCart";
import { RiShoppingBag3Line } from "react-icons/ri";

const CartPage = () => {
  const {
    items,
    removeItem,
    updateQuantity,
    getTotal,
    getOriginalTotal,
    getTotalQuantity,
    getTotalDiscount,
  } = useCart();
  const total = getOriginalTotal();
  const discount = getTotalDiscount();
  const finalAmount = getTotal();

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-8 flex items-center gap-2">
        <RiShoppingBag3Line className="text-primary-600" />
        سبد خرید شما
      </h1>

      {items.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-xl text-neutral-600 mb-4">سبد خرید شما خالی است</p>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1 space-y-4">
            {items.map((item) => (
              <CartItem
                key={`${item.productId}-${item.color}-${item.size}`}
                image={item.image}
                title={item.name}
                color={item.color}
                size={item.size}
                price={item.price}
                quantity={item.quantity}
                onRemove={() =>
                  removeItem(item.productId, item.color, item.size)
                }
                onIncrease={() =>
                  updateQuantity(
                    item.productId,
                    item.color,
                    item.size,
                    item.quantity + 1
                  )
                }
                onDecrease={() =>
                  updateQuantity(
                    item.productId,
                    item.color,
                    item.size,
                    Math.max(1, item.quantity - 1)
                  )
                }
              />
            ))}
          </div>

          <div className="md:w-96">
            <div className="bg-background p-6 rounded-xl shadow-lg border border-neutral-100">
              <h2 className="text-xl font-semibold mb-6">خلاصه سفارش</h2>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-neutral-600">
                    مجموع کالاها ({getTotalQuantity()}):
                  </span>
                  <span className="font-medium">
                    {total.toLocaleString()} تومان
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-neutral-600">صرفه‌جویی در خرید:</span>
                  <span className="text-success-500">
                    {discount.toLocaleString()} تومان
                  </span>
                </div>

                <div className="flex justify-between text-lg font-semibold">
                  <span>مبلغ قابل پرداخت:</span>
                  <span className="text-primary-600">
                    {finalAmount.toLocaleString()} تومان
                  </span>
                </div>
              </div>

              <button
                className="w-full mt-8 bg-primary-600 hover:bg-primary-700 text-white py-3 rounded-lg 
                transition-colors font-medium shadow-md hover:shadow-lg"
              >
                ادامه فرآیند خرید
              </button>
            </div>

            <div className="mt-4 p-4 rounded-lg text-sm text-neutral-600">
              <p>کالاهای موجود در سبد شما ثبت و رزرو نشده‌اند</p>
              <p className="mt-2">برای ثبت سفارش مراحل بعدی را تکمیل کنید</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
