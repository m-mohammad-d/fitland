import { cookies } from "next/headers";
export async function graphQLFetch<T>(
  url: string,
  query: string,
  variables = {}
): Promise<T> {
  try {
    const cookieStore = await cookies();

    const allCookies = cookieStore
      .getAll()
      .map(({ name, value }) => `${name}=${value}`)
      .join("; ");
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", Cookie: allCookies },

      body: JSON.stringify({ query, variables }),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.error("Error in GraphQL fetch:", error);
    throw new Error("Failed to fetch GraphQL data");
  }
}
