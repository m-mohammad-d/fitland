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
};

type CartState = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => {
        const existing = get().items.find(
          (i) =>
            i.productId === item.productId &&
            i.color === item.color &&
            i.size === item.size
        );
        if (existing) {
          set({
            items: get().items.map((i) =>
              i.productId === item.productId &&
              i.color === item.color &&
              i.size === item.size
                ? { ...i, quantity: i.quantity + item.quantity }
                : i
            ),
          });
        } else {
          set({ items: [...get().items, item] });
        }
      },

      removeItem: (productId) => {
        set({
          items: get().items.filter((i) => i.productId !== productId),
        });
      },

      updateQuantity: (productId, quantity) => {
        set({
          items: get().items.map((i) =>
            i.productId === productId ? { ...i, quantity } : i
          ),
        });
      },

      clearCart: () => {
        set({ items: [] });
      },

      getTotal: () => {
        return get().items.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        );
      },
    }),
    {
      name: "fitland-cart",
    }
  )
);
