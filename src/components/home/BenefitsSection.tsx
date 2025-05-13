import { BiSolidHomeCircle } from "react-icons/bi";
import { FaPaypal } from "react-icons/fa";
import { FaTruckFast } from "react-icons/fa6";

export default function BenefitsSection() {
  return (
    <div className="bg-secondary-0">
      <div className="mx-auto flex h-full w-full max-w-[1100px] flex-col items-center justify-between py-8 md:h-60 md:flex-row">
        <div className="flex flex-wrap justify-center gap-6">
          <div className="flex w-48 flex-col items-center rounded-2xl bg-white p-4 shadow-md">
            <FaTruckFast className="text-secondary-300" size={30} />
            <p className="mt-2 text-sm text-gray-700">پرداخت درب منزل</p>
          </div>
          <div className="flex w-48 flex-col items-center rounded-2xl bg-white p-4 shadow-md">
            <FaPaypal className="text-secondary-300" size={30} />
            <p className="mt-2 text-sm text-gray-700">پرداخت قسطی</p>
          </div>
          <div className="flex w-48 flex-col items-center rounded-2xl bg-white p-4 shadow-md">
            <BiSolidHomeCircle className="text-secondary-300" size={30} />
            <p className="mt-2 text-sm text-gray-700">ارسال سریع</p>
          </div>
        </div>
        <h2 className="my-6 text-center text-lg font-semibold text-gray-800">با بیش از ده سال سابقه فروش لوازم ورزشی و لباس‌های ورزشی</h2>
      </div>
    </div>
  );
}
