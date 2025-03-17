"use client";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";

export default function ApolloClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const client = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_BACKEND_URL,
    cache: new InMemoryCache(),
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
