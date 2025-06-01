import { Gender, Role } from "@prisma/client";

export type User = {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  nationalCode?: string | null;
  gender?: Gender | null;
  photo?: string | null;
  role: Role;
  lastLogin?: number | null;
  createdAt: number;
  updatedAt: number;
};
export type GetMeQuery = {
  data: {
    getMe: User;
  };
};
export type ApolloGetUserResponse = {
  getMe: User & {
    __typename: string;
  };
};

export type GraphQLFetchGetUserResponse = {
  data: {
    getMe: User;
  };
};

export type ApolloGetAllUsersResponse = {
  getAllUsers: User[];
};

export type GraphQLFetchGetAllUsersResponse = {
  data: {
    getAllUsers: User[];
  };
};
