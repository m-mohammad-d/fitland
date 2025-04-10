import UpdateProfileForm from "@/components/account/UpdateProfileForm";
import { GET_ME } from "@/graphql/queries/userQueries";
import { graphQLClient } from "@/lib/graphqlClient";
import { GetUserResponse } from "@/types/User";

async function EditProfilePage() {
  const client = await graphQLClient();
  const GetUserResponseData = await client.request<GetUserResponse>(GET_ME);
  const user = GetUserResponseData.getMe;

  return (
    <div>
      <UpdateProfileForm user={user} />
    </div>
  );
}

export default EditProfilePage;
