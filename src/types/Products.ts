import { Comment } from "./Comment";
import { OrderItem } from "./Order";

export interface Category {
  name: string;
  __typename: "Category";
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  images: string[];
  colors: {
    hex: string;
    name: string;
  }[];
  sizes: string[];
  category: {
    id: string;
    name: string;
  };
  categoryId: string;
  brand: string;
  discount: number;
  discountedPrice: number;
  comments: Comment[];
  orderItems: OrderItem[];
  createdAt: string;
  updatedAt: string;
  __typename: "Product";
}

export interface GetProductsResponse {
  data: {
    products: {
      items: Product[];
      totalCount: number;
    };
  };
}

export interface ApoloGetProductsResponse {
  products: {
    items: Product[];
    totalCount: number;
  } & {
    __typename: string;
  };
}
