"use client";
import { Address } from "@/types/Address";
import AddressCard from "./AddressCard";
import { useCart } from "@/store/useCart";

interface AddressListProps {
  addresses: Address[];
}

function AddressList({ addresses }: AddressListProps) {
  const { checkout, setCheckoutField } = useCart();

  function handleSelectAddress(id: string) {
    if (checkout.addressId === id) {
      setCheckoutField("addressId", "");
    } else {
      setCheckoutField("addressId", id);
    }
  }

  return (
    <div className="space-y-4">
      {addresses?.map((address) => <AddressCard address={address} key={address.id} isSelected={address.id === checkout.addressId} onSelect={() => handleSelectAddress(address.id)} />)}
    </div>
  );
}

export default AddressList;
