import { create } from "zustand";
import { persist } from "zustand/middleware";

type CartItem = {
  productId: string;
  name: string;
  image: string;
  color: string;
  size: string;
  quantity: number;
  price: number;
  discountedPrice?: number;
};

type CheckoutInfo = {
  addressId?: string;
  deliveryDate?: string;
  paymentMethod?: "ONLINE" | "ON_DELIVERY" | "WALLET";
  shippingCost?: number;
  tax?: number;
  discountCode?: string;
  discountAmount?: number;
};

type CartState = {
  items: CartItem[];
  checkout: CheckoutInfo;
  setCheckoutField: <K extends keyof CheckoutInfo>(key: K, value: CheckoutInfo[K]) => void;
  clearCheckout: () => void;

  addItem: (item: CartItem) => void;
  removeItem: (productId: string, color: string, size: string) => void;
  updateQuantity: (productId: string, color: string, size: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getOriginalTotal: () => number;
  getTotalDiscount: () => number;
  getTotalQuantity: () => number;
  getFinalTotal: () => number;
};
export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      checkout: { tax: 40000 },

      setCheckoutField: (key, value) => {
        set({ checkout: { ...get().checkout, [key]: value } });
      },
      getFinalTotal: () => {
        const { getTotal, checkout } = get();
        const baseTotal = getTotal();
        const discount = checkout.discountAmount ?? 0;
        const shipping = checkout.shippingCost ?? 0;
        const tax = checkout.tax ?? 0;
        return baseTotal - discount + shipping + tax;
      },
      clearCheckout: () => {
        set({ checkout: {} });
      },

      addItem: (item) => {
        const existing = get().items.find((i) => i.productId === item.productId && i.color === item.color && i.size === item.size);
        if (existing) {
          set({
            items: get().items.map((i) => (i.productId === item.productId && i.color === item.color && i.size === item.size ? { ...i, quantity: i.quantity + item.quantity } : i)),
          });
        } else {
          set({ items: [...get().items, item] });
        }
      },

      removeItem: (productId, color, size) => {
        set({
          items: get().items.filter((i) => !(i.productId === productId && i.color === color && i.size === size)),
        });
      },

      updateQuantity: (productId, color, size, quantity) => {
        set({
          items: get().items.map((i) => (i.productId === productId && i.color === color && i.size === size ? { ...i, quantity } : i)),
        });
      },

      clearCart: () => {
        set({ items: [] });
      },

      getTotalQuantity: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      },

      getTotal: () => {
        return get().items.reduce((acc, item) => acc + (item.discountedPrice ?? item.price) * item.quantity, 0);
      },

      getOriginalTotal: () => {
        return get().items.reduce((acc, item) => acc + item.price * item.quantity, 0);
      },

      getTotalDiscount: () => {
        return get().items.reduce((acc, item) => {
          const discount = (item.price - (item.discountedPrice ?? item.price)) * item.quantity;
          return acc + discount;
        }, 0);
      },
    }),
    {
      name: "fitland-cart",
    },
  ),
);
