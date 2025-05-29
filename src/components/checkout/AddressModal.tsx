"use client";
import { BiPlus } from "react-icons/bi";
import { useState } from "react";
import dynamic from "next/dynamic";
import Modal from "@/components/ui/Modal";
import CreateAddressForm from "@/components/checkout/CreateAddressForm";
import { useMutation } from "@apollo/client";
import { ADD_ADDRESS } from "@/graphql/mutations/AddressMutation";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const AddressPicker = dynamic(() => import("@/components/checkout/AddressPicker"), { ssr: false });
interface AddressFormData {
  fullName: string;
  phone: string;
  plaque: string;
  unit?: string | undefined;
  zipCode: string;
  details?: string | undefined;
}
const AddressModal: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [showAddressForm, setShowAddressForm] = useState(false);
  const router = useRouter();

  const [addAddress] = useMutation(ADD_ADDRESS, {
    onCompleted: () => {
      toast.success("ادرس با موفقیت اضافه شد");
      router.refresh();
      handleCloseModal();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  const handleOpenModal = () => setModalOpen(true);

  const handleCloseModal = () => {
    setModalOpen(false);
    setShowAddressForm(false);
    setSelectedAddress("");
  };

  const handleLocationSelect = (address: string) => {
    setSelectedAddress(address);
    setShowAddressForm(true);
  };

  const handleSubmitAddress = async (formData: AddressFormData) => {
    const { fullName, phone, plaque, unit, zipCode, details } = formData;

    await addAddress({
      variables: {
        fullName,
        phone,
        fullAddress: selectedAddress,
        plaque,
        unit,
        zipCode,
        details,
      },
    });
  };

  return (
    <div>
      <button onClick={handleOpenModal} className="text-primary-600 hover:text-primary-800 flex items-center p-2 transition duration-200">
        <BiPlus className="mr-2" />
        ثبت آدرس جدید
      </button>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xl font-bold">{showAddressForm ? "تکمیل اطلاعات آدرس" : "ثبت آدرس جدید"}</h3>
        </div>

        {showAddressForm ? <CreateAddressForm onSubmit={handleSubmitAddress} defaultAddress={selectedAddress} /> : <AddressPicker onLocationSelect={handleLocationSelect} />}
      </Modal>
    </div>
  );
};

export default AddressModal;
