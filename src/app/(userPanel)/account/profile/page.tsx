import { GET_ME } from "@/graphql/queries/userQueries";
import { graphQLClient } from "@/lib/graphqlClient";
import { GetUserResponse } from "@/types/User";
import Link from "next/link";
import { CiEdit } from "react-icons/ci";

async function ProfilePage() {
  const client = await graphQLClient();
  const GetUserResponseData = await client.request<GetUserResponse>(GET_ME);


  const userInfo = [
    { label: "نام و نام خانوادگی", value: GetUserResponseData.getMe?.name || "تعیین نشده" },
    { label: "شماره تماس", value: GetUserResponseData.getMe?.phone || "تعیین نشده" },
    { label: "کد ملی", value: GetUserResponseData.getMe?.nationalCode || "تعیین نشده" },
    { label: "جنسیت", value: GetUserResponseData.getMe?.gender || "تعیین نشده" },
    { label: "ایمیل", value: GetUserResponseData.getMe?.email || "تعیین نشده" },
  ];

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
            <p className="text-gray-500">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProfilePage;
