import { Gender, Role } from "@prisma/client";

export type User = {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  nationalCode?: string | null;
  gender?: Gender | null;
  photo?: string | null;
  role: Role;
  lastLogin?: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

export interface GetUserResponse {
  getMe: User;
}
