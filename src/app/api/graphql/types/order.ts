export type CreateOrderItemInput = {
  productId: string;
  color?: string | null;
  size?: string | null;
  quantity: number;
  priceAtPurchase: number;
};

export type CreateOrderInput = {
  addressId: string;
  deliveryDate: string;
  paymentMethod: "ONLINE" | "ON_DELIVERY" | "WALLET";
  shippingCost: number;
  tax: number;
  totalPrice: number;
  discountCode?: string;
  items: CreateOrderItemInput[];
};
