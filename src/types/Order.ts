import { Address } from "./Address";
import { Product } from "./Products";
import { User } from "./User";

export interface UserOrderProduct {
  id: string;
  name: string;
  images: string[];
}

export interface UserOrderItem {
  product: UserOrderProduct;
}

export interface UserOrder {
  id: string;
  createdAt: string;
  totalPrice: number;
  items: UserOrderItem[];
}

export interface GetUserOrdersResponse {
  data: {
    getUserOrders: UserOrder[];
  };
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  color?: string;
  size?: string;
  quantity: number;
  priceAtPurchase: number;
  product: Product;
}

export interface Order {
  id: string;
  user: User;
  address: Address;
  items: OrderItem[];
  discountCodeId?: string;
  deliveryDate: string;
  paymentMethod: "CASH" | "ONLINE" | string;
  shippingCost: number;
  tax: number;
  totalPrice: number;
  status: "PENDING" | "DELIVERED" | "CANCELED" | string;
  createdAt: number;
}

export interface GetOrderByIdResponse {
  getOrderById: Order;
}
