import { AuthPayload } from "@/lib/Auth";
import { NextRequest } from "next/server";

export interface GraphQLContext {
  req: NextRequest;
  user: AuthPayload | null;
}
