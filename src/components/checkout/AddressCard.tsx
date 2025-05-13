import { FaMapMarkerAlt, FaCheck } from "react-icons/fa";
import { Address } from "@/types/Address";

interface AddressCardProps {
  address: Address;
  isSelected?: boolean;
  onSelect?: () => void;
}

function AddressCard({ address, isSelected = false, onSelect }: AddressCardProps) {
  return (
    <div
      className={`relative cursor-pointer rounded-lg border p-4 transition-all ${isSelected ? "border-primary-400 bg-primary-50" : "hover:border-primary-300 border-neutral-300"}`}
      onClick={onSelect}
    >
      {isSelected && (
        <div className="bg-primary-400 absolute -top-2 -right-2 rounded-full p-1 text-white">
          <FaCheck size={12} />
        </div>
      )}

      <div className="flex items-start gap-3">
        <div className="bg-primary-100 text-primary-600 rounded-full p-2">
          <FaMapMarkerAlt size={18} />
        </div>

        <div className="flex-1">
          <p className="mt-1.5 text-base text-neutral-700">{address.fullAddress}</p>

          <p className="mt-1.5 text-sm text-neutral-700">{[address.plaque && `پلاک ${address.plaque}`, address.unit && `واحد ${address.unit}`].filter(Boolean).join("، ")}</p>

          <p className="mt-1 text-sm text-neutral-600">کد پستی: {address.zipCode}</p>
        </div>
      </div>
    </div>
  );
}

export default AddressCard;
