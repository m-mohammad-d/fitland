import { BiSolidHomeCircle } from "react-icons/bi";
import { FaPaypal } from "react-icons/fa";
import { FaTruckFast } from "react-icons/fa6";

export default function BenefitsSection() {
  return (
    <div className="bg-secondary-0">
      <div className="max-w-[1100px] h-60 w-full mx-auto justify-between py-8 flex items-center">
        <div className="flex justify-center gap-6">
          <div className="bg-white p-4 rounded-2xl shadow-md flex flex-col items-center w-48">
            <FaTruckFast className="text-secondary-300" size={30} />
            <p className="mt-2 text-gray-700 text-sm">پرداخت درب منزل</p>
          </div>
          <div className="bg-white p-4 rounded-2xl shadow-md flex flex-col items-center w-48">
            <FaPaypal className="text-secondary-300" size={30} />
            <p className="mt-2 text-gray-700 text-sm">پرداخت قسطی</p>
          </div>
          <div className="bg-white p-4 rounded-2xl shadow-md flex flex-col items-center w-48">
            <BiSolidHomeCircle className="text-secondary-300" size={30} />
            <p className="mt-2 text-gray-700 text-sm">ارسال سریع</p>
          </div>
        </div>
        <h2 className="text-lg font-semibold text-gray-800 mb-6 text-center">
          با بیش از ده سال سابقه فروش لوازم ورزشی و لباس‌های ورزشی
        </h2>
      </div>
    </div>
  );
}
