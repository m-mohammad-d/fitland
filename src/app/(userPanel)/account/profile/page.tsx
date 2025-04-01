import Link from "next/link";
import { CiEdit } from "react-icons/ci";

const userInfo = [
  { label: "نام و نام خانوادگی", value: "" },
  { label: "شماره تماس", value: "" },
  { label: "کد ملی", value: "" },
  { label: "جنسیت", value: "" },
  { label: "ایمیل", value: "" },
];

function ProfilePage() {
  return (
    <div className="p-6 flex flex-col gap-4">
      <div className="flex justify-end">
        <Link href="/account/profile/edit" className="text-primary">
          <CiEdit size={25} strokeWidth={0.7} />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {userInfo.map((item, index) => (
          <div key={index} className="flex flex-col">
            <h3 className="text-gray-700 font-semibold">{item.label}</h3>
            <p className="text-gray-500">{item.value || "تعیین نشده"}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProfilePage;
