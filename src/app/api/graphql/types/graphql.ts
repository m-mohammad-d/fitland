import { AuthPayload } from "@/lib/Auth";
import { NextRequest } from "next/server";

export interface GraphQLContext {
  req: NextRequest;
  user: AuthPayload | null;
}

export type DailySales = {
  date: string;
  amount: number;
};

export type SalesStats = {
  totalSales: number;
  salesByDay: DailySales[];
};

export type DailyOrders = {
  date: string;
  count: number;
};

export type StatusOrders = {
  status: string;
  count: number;
};

export type OrdersStats = {
  totalOrders: number;
  ordersByDay: DailyOrders[];
  ordersByStatus: StatusOrders[];
};

export type DailyUsers = {
  date: string;
  count: number;
};

export type NewUsersStats = {
  totalNewUsers: number;
  usersByDay: DailyUsers[];
};
