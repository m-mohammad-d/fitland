import { NextRequest } from "next/server";
import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { ApolloServerPluginLandingPageLocalDefault, ApolloServerPluginLandingPageProductionDefault } from "@apollo/server/plugin/landingPage/default";
import fs from "fs";
import path from "path";
import { parse } from "graphql";
import resolvers from "./resolvers";
import { getUserFromTokenHeader } from "@/lib/Auth";
import { GraphQLContext } from "@/app/api/graphql/types/graphql";

const schemaPath = path.join(process.cwd(), "src/app/api/graphql/schema.graphql");
const schemaString = fs.readFileSync(schemaPath, "utf8");
const typeDefs = parse(schemaString);

const plugins =
  process.env.NODE_ENV === "production"
    ? [
        ApolloServerPluginLandingPageProductionDefault({
          embed: true,
          graphRef: "myGraph@prod",
        }),
      ]
    : [ApolloServerPluginLandingPageLocalDefault({ embed: true })];

const server = new ApolloServer<GraphQLContext>({
  typeDefs,
  resolvers,
  plugins,
});

const handler = startServerAndCreateNextHandler<NextRequest, GraphQLContext>(server, {
  context: async (req) => {
    const cookieHeader = req.headers.get("cookie");
    const user = getUserFromTokenHeader(cookieHeader);
    return { req, user };
  },
});

export async function GET(request: NextRequest) {
  return handler(request);
}

export async function POST(request: NextRequest) {
  return handler(request);
}
