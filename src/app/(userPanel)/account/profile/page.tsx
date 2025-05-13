import { GET_ME } from "@/graphql/queries/userQueries";
import { graphQLFetch } from "@/lib/graphqlFetch";
import { GraphQLFetchGetUserResponse } from "@/types/User";
import Link from "next/link";
import { CiEdit } from "react-icons/ci";

async function ProfilePage() {
  const res = await graphQLFetch<GraphQLFetchGetUserResponse>(process.env.NEXT_PUBLIC_BACKEND_URL || "", GET_ME.loc?.source.body as string);

  const userInfo = [
    {
      label: "نام و نام خانوادگی",
      value: res.data.getMe?.name || "تعیین نشده",
    },
    {
      label: "شماره تماس",
      value: res.data.getMe?.phone || "تعیین نشده",
    },
    {
      label: "کد ملی",
      value: res.data.getMe?.nationalCode || "تعیین نشده",
    },
    {
      label: "جنسیت",
      value: res.data.getMe?.gender ? (res.data.getMe.gender === "MALE" ? "مرد" : "زن") : "تعیین نشده",
    },
    { label: "ایمیل", value: res.data.getMe?.email || "تعیین نشده" },
  ];

  return (
    <div className="flex flex-col gap-4 p-6">
      <div className="flex justify-end">
        <Link href="/account/profile/edit" className="text-primary">
          <CiEdit size={25} strokeWidth={0.7} />
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {userInfo.map((item, index) => (
          <div key={index} className="flex flex-col">
            <h3 className="font-semibold text-gray-700">{item.label}</h3>
            <p className="text-gray-500">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProfilePage;
