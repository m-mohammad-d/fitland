import { NextRequest, NextResponse } from "next/server";
import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import fs from "fs";
import path from "path";
import { parse } from "graphql";
import resolvers from "./resolvers";

const schemaPath = path.join(process.cwd(), "src/app/api/graphql/schema.graphql");
const schemaString = fs.readFileSync(schemaPath, "utf8");
const typeDefs = parse(schemaString);

const server = new ApolloServer({ typeDefs, resolvers });
const handler = startServerAndCreateNextHandler<NextRequest>(server, {
  context: async (req) => ({ req }),
});
export { handler as GET, handler as POST };
