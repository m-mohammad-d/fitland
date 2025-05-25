import { gql } from "@apollo/client";
import type { SalesStats, OrdersStats, NewUsersStats } from "@/types/Stats";

export const GET_SALES_STATS = gql`
  query GetSalesStats($days: Int!) {
    getSalesStats(days: $days) {
      totalSales
      salesByDay {
        date
        total
      }
    }
  }
`;

export const GET_ORDERS_STATS = gql`
  query GetOrdersStats($days: Int!) {
    getOrdersStats(days: $days) {
      totalOrders
      ordersByDay {
        date
        count
      }
      ordersByStatus {
        status
        count
      }
    }
  }
`;

export const GET_NEW_USERS_STATS = gql`
  query GetNewUsersStats($days: Int!) {
    getNewUsersStats(days: $days) {
      totalNewUsers
      usersByDay {
        date
        count
      }
    }
  }
`;

export type GetSalesStatsResponse = {
  getSalesStats: SalesStats;
};

export type GetOrdersStatsResponse = {
  getOrdersStats: OrdersStats;
};

export type GetNewUsersStatsResponse = {
  getNewUsersStats: NewUsersStats;
};
