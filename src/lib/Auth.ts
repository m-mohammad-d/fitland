import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET!;

export interface AuthPayload {
  id: string;
  role: "USER" | "ADMIN";
}

export function getTokenFromCookie(cookieHeader: string | null): string | null {
  if (!cookieHeader) return null;

  const match = cookieHeader.match(/token=([^;]+)/);
  return match ? match[1] : null;
}

export function verifyToken(token: string): AuthPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as AuthPayload;
  } catch (error) {
    return null;
  }
}

export function getUserFromTokenHeader(cookieHeader: string | null): AuthPayload | null {
  const token = getTokenFromCookie(cookieHeader);
  if (!token) return null;

  const user = verifyToken(token);
  return user;
}

export function signToken(payload: AuthPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
}

export function setAuthCookie(res: NextResponse, token: string) {
  res.headers.set("Set-Cookie", `token=${token}; HttpOnly; Path=/; Max-Age=${60 * 60 * 24 * 30}; SameSite=Lax; Secure`);
}

export function clearAuthCookie(res: NextResponse) {
  res.headers.set("Set-Cookie", `token=; HttpOnly; Path=/; Max-Age=0; SameSite=Lax; Secure`);
}
