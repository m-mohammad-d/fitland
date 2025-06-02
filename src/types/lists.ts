export interface List {
  id: string;
  title: string;
  products: ListProduct[];
  createdAt: string;
}

export interface ListProduct {
  id: string;
  product: Product;
  addedAt: string;
}

export interface Product {
  id: string;
  name: string;
  images: string[];
  price: number;
  discountedPrice?: number;
}

export interface ListProduct {
  id: string;
  product: Product;
}

export interface GetUserListsQuery {
  getUserLists: List[];
}
