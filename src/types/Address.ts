export interface Address {
  id: string;
  userId: string;
  fullName: string;
  phone: string;
  fullAddress: string;
  plaque: string;
  unit?: string;
  zipCode: string;
  details?: string;
  createdAt: string;
  updatedAt: string;
  __typename: "Address";
}

export interface GetAddressesResponse {
  data: {
    getUserAddress: Address[];
  };
}

export interface ApoloGetAddressByIdResponse {
  getAddressById : Address
}