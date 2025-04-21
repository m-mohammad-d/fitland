import { FaMapMarkerAlt, FaCheck } from "react-icons/fa";
import { Address } from "@/types/Address";

interface AddressCardProps {
  address: Address;
  isSelected?: boolean;
  onSelect?: () => void;
}

function AddressCard({
  address,
  isSelected = false,
  onSelect,
}: AddressCardProps) {
  return (
    <div
      className={`relative p-4 rounded-lg border transition-all cursor-pointer ${
        isSelected
          ? "border-primary-400 bg-primary-50"
          : "border-neutral-300 hover:border-primary-300"
      }`}
      onClick={onSelect}
    >
      {isSelected && (
        <div className="absolute -top-2 -right-2 bg-primary-400 text-white rounded-full p-1">
          <FaCheck size={12} />
        </div>
      )}

      <div className="flex items-start gap-3">
        <div className="p-2 rounded-full bg-primary-100 text-primary-600">
          <FaMapMarkerAlt size={18} />
        </div>

        <div className="flex-1">
          <h3 className="font-medium text-neutral-800">
            {address.province}، {address.city}
          </h3>

          <p className="mt-1.5 text-neutral-700 text-sm">
            {[
              address.street,
              address.alley && `کوچه ${address.alley}`,
              address.plaque && `پلاک ${address.plaque}`,
              address.unit && `واحد ${address.unit}`,
            ]
              .filter(Boolean)
              .join("، ")}
          </p>

          <p className="mt-1 text-neutral-600 text-sm">
            کد پستی: {address.zipCode}
          </p>
        </div>
      </div>
    </div>
  );
}

export default AddressCard;
