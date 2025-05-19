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
  discount: number;
  createdAt: number;
  updatedAt: number;
  colors?: {
    name: string;
    hex: string;
  }[];
  sizes: string[];
  category: Category;
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
