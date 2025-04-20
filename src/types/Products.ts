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
    name: string;
    hex: string;
  }[];
  sizes: string[];
  category: Category;
  __typename: "Product";
}

export interface GetProductsResponse {
  data: {
    products: Product[];
  };
}
