export interface Category {
  name: string;
  __typename: "Category";
}

export interface Category {
  id: string;
  name: string;
}

export interface ApolloGetCategorysResponse {
  categories: Category[];
}
export interface GraphQLFetchGetCategorysResponse {
  data: {
    categories: Category[];
  };
}
