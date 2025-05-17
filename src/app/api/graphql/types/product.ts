export type Filters = {
  minPrice?: number;
  maxPrice?: number;
  discount?: number;
  category?: string[];
  brand?: string[];
  colors?: string[];
  sizes?: string[];
  availableOnly?: boolean;
  search?: string;
};

export type ProductQueryArgs = {
  sortBy?: string;
  filters?: Filters;
  page?: number;
  pageSize?: number;
};

export type AddProductArgs = {
  name: string;
  description: string;
  price: number;
  stock: number;
  categoryId: string;
  images: string[];
  colors: { name: string }[];
  sizes: string[];
  discount?: number;
  discountCode?: string | null;
};
