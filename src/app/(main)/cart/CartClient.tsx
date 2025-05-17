"use client";
import CartItem from "@/components/ui/CartItem";
import { useCart } from "@/store/useCart";
import Link from "next/link";
import { RiShoppingBag3Line } from "react-icons/ri";

const CartClient = () => {
  const { items, removeItem, updateQuantity, getTotal, getOriginalTotal, getTotalQuantity, getTotalDiscount } = useCart();
  const total = getOriginalTotal();
  const discount = getTotalDiscount();
  const finalAmount = getTotal();

  return (
    <div className="mx-auto max-w-6xl p-4 md:p-8">
      <h1 className="mb-8 flex items-center gap-2 text-3xl font-bold">
        <RiShoppingBag3Line className="text-primary-600" />
        سبد خرید شما
      </h1>

      {items.length === 0 ? (
        <div className="py-16 text-center">
          <p className="mb-4 text-xl text-neutral-600">سبد خرید شما خالی است</p>
        </div>
      ) : (
        <div className="flex flex-col gap-8 md:flex-row">
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
                onRemove={() => removeItem(item.productId, item.color, item.size)}
                onIncrease={() => updateQuantity(item.productId, item.color, item.size, item.quantity + 1)}
                onDecrease={() => updateQuantity(item.productId, item.color, item.size, Math.max(1, item.quantity - 1))}
              />
            ))}
          </div>

          <div className="md:w-96">
            <div className="bg-background rounded-xl border border-neutral-100 p-6 shadow-lg">
              <h2 className="mb-6 text-xl font-semibold">خلاصه سفارش</h2>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-neutral-600">مجموع کالاها ({getTotalQuantity()}):</span>
                  <span className="font-medium">{total.toLocaleString()} تومان</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-neutral-600">صرفه‌جویی در خرید:</span>
                  <span className="text-success-500">{discount.toLocaleString()} تومان</span>
                </div>

                <div className="flex justify-between text-lg font-semibold">
                  <span>مبلغ قابل پرداخت:</span>
                  <span className="text-primary-600">{finalAmount.toLocaleString()} تومان</span>
                </div>
              </div>
              <div className="py-4">
                <Link href="/checkout/address" className="bg-primary-600 hover:bg-primary-700 mt-12 rounded-lg px-4 py-3 font-medium text-white shadow-md transition-colors hover:shadow-lg">
                  ادامه فرآیند خرید
                </Link>
              </div>
            </div>

            <div className="mt-4 rounded-lg p-4 text-sm text-neutral-600">
              <p>کالاهای موجود در سبد شما ثبت و رزرو نشده‌اند</p>
              <p className="mt-2">برای ثبت سفارش مراحل بعدی را تکمیل کنید</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartClient;
