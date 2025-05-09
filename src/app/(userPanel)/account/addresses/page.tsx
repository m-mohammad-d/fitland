import AddressList from "@/components/checkout/AddressList";
import AddressModal from "@/components/checkout/AddressModal";
import { GET_USER_ADDRESS } from "@/graphql/queries/addressQueries";
import { graphQLFetch } from "@/lib/graphqlFetch";
import { GetAddressesResponse } from "@/types/Address";

async function UserAddressList() {
  const res = await graphQLFetch<GetAddressesResponse>(
    process.env.NEXT_PUBLIC_BACKEND_URL || "",
    GET_USER_ADDRESS.loc?.source.body as string
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl my-4 text-neutral-800">ادرس ها</h1>
      <AddressList addresses={res?.data?.getUserAddress} />
      <AddressModal />
    </div>
  );
}

export default UserAddressList;
