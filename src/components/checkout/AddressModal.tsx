"use client";
import { BiPlus } from "react-icons/bi";
import { useState } from "react";
import CreateAddressForm from "./CreateAddressForm";

const AddressModal: React.FC = ({}) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  return (
    <div>
      <button
        onClick={handleOpenModal}
        className="flex items-center p-2 text-primary-600 transition duration-200"
      >
        <BiPlus className="mr-2" />
        ثبت آدرس جدید
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-96 shadow-lg relative">
            <h3 className="text-2xl font-semibold mb-4">ثبت آدرس جدید</h3>

            <CreateAddressForm onClose={handleCloseModal} />

            <button
              onClick={handleCloseModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              <BiPlus className="rotate-45" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddressModal;
