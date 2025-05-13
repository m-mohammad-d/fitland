import AddressList from "@/components/checkout/AddressList";
import AddressModal from "@/components/checkout/AddressModal";
import { GET_USER_ADDRESS } from "@/graphql/queries/addressQueries";
import { graphQLFetch } from "@/lib/graphqlFetch";
import { GetAddressesResponse } from "@/types/Address";

async function UserAddressList() {
  const res = await graphQLFetch<GetAddressesResponse>(process.env.NEXT_PUBLIC_BACKEND_URL || "", GET_USER_ADDRESS.loc?.source.body as string);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="my-4 text-2xl text-neutral-800">ادرس ها</h1>
      <AddressList addresses={res?.data?.getUserAddress} />
      <AddressModal />
    </div>
  );
}

export default UserAddressList;
