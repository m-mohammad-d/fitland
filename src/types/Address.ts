export interface Address {
  id: string;
  userId: string;
  province: string;
  city: string;
  zipCode: string;
  street: string;
  alley?: string;
  plaque?: string;
  unit?: string;
  createdAt: string;
  updatedAt: string;
  __typename: "Address";
}

export interface GetAddressesResponse {
  data: {
    getUserAddress: Address[];
  };
}
