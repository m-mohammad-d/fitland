import UpdateProfileForm from "@/components/account/UpdateProfileForm";
import { GET_ME } from "@/graphql/queries/userQueries";
import { graphQLFetch } from "@/lib/graphqlFetch";
import { GraphQLFetchGetUserResponse } from "@/types/User";

async function EditProfilePage() {
  const res = await graphQLFetch<GraphQLFetchGetUserResponse>(process.env.NEXT_PUBLIC_BACKEND_URL || "", GET_ME.loc?.source.body as string);

  return (
    <div>
      <UpdateProfileForm user={res.data.getMe} />
    </div>
  );
}

export default EditProfilePage;
