import { GraphQLClient } from "graphql-request";

const GRAPHQL_ENDPOINT = process.env.NEXT_PUBLIC_BACKEND_URL!;

const graphQLClient = new GraphQLClient(GRAPHQL_ENDPOINT, {
  headers: {
    "Content-Type": "application/json",
  },
});

export default graphQLClient;
