export type DailySales = {
  date: string;
  total: number;
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
