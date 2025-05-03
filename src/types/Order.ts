interface Product {
  id: string;
  images: string[];
  name: string;
}

interface OrderItem {
  product: Product;
}

interface UserOrder {
  id: string;
  createdAt: number;
  totalPrice: number;
  items: OrderItem[];
}
interface GetUserOrdersResponse {
  data: {
    getUserOrders: UserOrder[];
  };
}
