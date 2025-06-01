"use client";

import { FiDollarSign, FiShoppingBag, FiPackage, FiUsers, FiPlus, FiTag, FiTruck, FiBarChart2 } from "react-icons/fi";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { useQuery } from "@apollo/client";
import { GET_SALES_STATS, GET_ORDERS_STATS, GET_NEW_USERS_STATS, GetNewUsersStatsResponse, GetOrdersStatsResponse, GetSalesStatsResponse } from "@/graphql/queries/statsQueries";
import { DailySales } from "@/types/Stats";
import { separateThousands } from "@/lib/formatNumber";
import { GET_PRODUCTS } from "@/graphql/queries/productQueries";
import { ApoloGetProductsResponse } from "@/types/Products";
import OrdersTable from "@/components/dashboard/OrdersTable";
import { GET_ALL_ORDERS } from "@/graphql/queries/orderQueries";
import { ApoloGetAllOrdersResponse } from "@/types/Order";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function DashboardPage() {
  const { data: salesData, loading: salesLoading } = useQuery<GetSalesStatsResponse>(GET_SALES_STATS, {
    variables: { days: 7 },
  });

  const { data: ordersData, loading: ordersLoading } = useQuery<GetOrdersStatsResponse>(GET_ORDERS_STATS, {
    variables: { days: 7 },
  });

  const { data: usersData, loading: usersLoading } = useQuery<GetNewUsersStatsResponse>(GET_NEW_USERS_STATS, {
    variables: { days: 30 },
  });
  const { data: productData, loading: productLoading } = useQuery<ApoloGetProductsResponse>(GET_PRODUCTS, {
    variables: { days: 30 },
  });
  const { data: OrderResponse, loading: orderLoading } = useQuery<ApoloGetAllOrdersResponse>(GET_ALL_ORDERS);
  const isLoading = orderLoading || salesLoading || ordersLoading || usersLoading || productLoading;
  const statsData = [
    {
      title: "فروش ماه",
      value: separateThousands(salesData?.getSalesStats.totalSales || 0),
      change: "+۵.۲٪",
      icon: FiDollarSign,
      color: "bg-blue-500",
    },
    {
      title: "سفارشات این ماه",
      value: separateThousands(ordersData?.getOrdersStats.totalOrders || 0),
      change: "+۱۲٪",
      icon: FiShoppingBag,
      color: "bg-green-500",
    },
    {
      title: "محصولات فعال",
      value: productData?.products.totalCount,
      change: "+۲.۱٪",
      icon: FiPackage,
      color: "bg-purple-500",
    },
    {
      title: "کاربران جدید (ماه)",
      value: separateThousands(usersData?.getNewUsersStats.totalNewUsers || 0),
      change: "+۸.۴٪",
      icon: FiUsers,
      color: "bg-orange-500",
    },
  ];

  const chartData = {
    labels: salesData?.getSalesStats.salesByDay.map((sale: DailySales) => sale.date) || [],
    datasets: [
      {
        label: "فروش",
        data: salesData?.getSalesStats.salesByDay.map((sale: DailySales) => sale.total) || [],
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const quickActions = [
    {
      title: "افزودن محصول جدید",
      icon: FiPlus,
      color: "bg-blue-500",
      href: "/dashboard/products/new",
    },
    {
      title: "ایجاد کد تخفیف",
      icon: FiTag,
      color: "bg-green-500",
      href: "/dashboard/discounts/new",
    },
    {
      title: "افزودن زمان ارسال",
      icon: FiTruck,
      color: "bg-purple-500",
      href: "/dashboard/shipping/new",
    },
    {
      title: "مشاهده گزارش کامل",
      icon: FiBarChart2,
      color: "bg-orange-500",
      href: "/dashboard/reports",
    },
  ];

  if (isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="text-lg text-gray-600">در حال بارگذاری...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statsData.map((stat, index) => (
          <div key={index} className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="mt-2 text-2xl font-semibold text-gray-900">{stat.value}</p>
                <p className="mt-1 text-sm text-green-600">{stat.change}</p>
              </div>
              <div className={`rounded-full p-3 ${stat.color}`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Sales Chart */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">نمودار فروش</h2>
        <div className="h-[300px]">
          <Line
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: false,
                },
              },
              scales: {
                y: {
                  beginAtZero: true,
                  grid: {
                    display: true,
                  },
                },
                x: {
                  grid: {
                    display: false,
                  },
                },
              },
            }}
          />
        </div>
      </div>

      <OrdersTable orders={OrderResponse?.getAllOrders || []} />

      {/* Quick Actions */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {quickActions.map((action, index) => (
          <a key={index} href={action.href} className="group flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md">
            <div className={`rounded-full p-3 ${action.color}`}>
              <action.icon className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900 group-hover:text-blue-600">{action.title}</h3>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
