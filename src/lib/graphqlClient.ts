import { cookies } from "next/headers";
import { GraphQLClient } from "graphql-request";

export const graphQLClient = async () => {
  const cookieStore = await cookies();

  const allCookies = cookieStore
    .getAll()
    .map(({ name, value }) => `${name}=${value}`)
    .join("; ");

  const client = new GraphQLClient("http://localhost:3000/api/graphql", {
    headers: {
      Cookie: allCookies,
    },
  });

  return client;
};
