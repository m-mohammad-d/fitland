"use client";

import { useState } from "react";
import { useQuery } from "@apollo/client";
import { Line, Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend, Filler } from "chart.js";
import { GET_SALES_STATS, GET_ORDERS_STATS, GET_NEW_USERS_STATS } from "@/graphql/queries/statsQueries";
import moment from "jalali-moment";
import { FaUsers, FaShoppingCart, FaDollarSign, FaChartLine, FaBars } from "react-icons/fa";
import StatCard from "@/components/dashboard/StatCard";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend, Filler);

const timeRanges = [
  { label: "۷ روز", value: 7 },
  { label: "۳۰ روز", value: 30 },
  { label: "۹۰ روز", value: 90 },
];

const statusColors = {
  PENDING: "rgb(253, 186, 116)",
  SHIPPED: "rgb(96, 165, 250)",
  DELIVERED: "rgb(34, 197, 94)",
  CANCELED: "rgb(248, 113, 113)",
};

const statusLabels = {
  PROCESSING: "در حال پردازش",
  SHIPPED: "در حال ارسال",
  DELIVERED: "تحویل داده شده",
  CANCELED: "لغو شده",
};

export default function ReportsPage() {
  const [selectedDays, setSelectedDays] = useState(7);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { data: salesData, loading: salesLoading } = useQuery(GET_SALES_STATS, {
    variables: { days: selectedDays },
  });

  const { data: ordersData, loading: ordersLoading } = useQuery(GET_ORDERS_STATS, {
    variables: { days: selectedDays },
  });

  const { data: usersData, loading: usersLoading } = useQuery(GET_NEW_USERS_STATS, {
    variables: { days: selectedDays },
  });

  const isLoading = salesLoading || ordersLoading || usersLoading;

  const calculatePercentageChange = (current: number, previous: number) => {
    if (previous === 0) return 100;
    return ((current - previous) / previous) * 100;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("fa-IR", {
      style: "currency",
      currency: "IRR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatPersianDate = (date: string) => {
    return moment(date).locale("fa").format("D MMM");
  };

  const calculateAverageOrderValue = () => {
    if (!salesData?.getSalesStats.totalSales || !ordersData?.getOrdersStats.totalOrders) return 0;
    return salesData.getSalesStats.totalSales / ordersData.getOrdersStats.totalOrders;
  };

  const getTopPerformingDays = () => {
    if (!salesData?.getSalesStats.salesByDay) return [];
    return [...salesData.getSalesStats.salesByDay].sort((a, b) => b.total - a.total).slice(0, 5);
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          boxWidth: 12,
          padding: 15,
          font: {
            size: 12,
            family: "Vazirmatn",
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          font: {
            size: 11,
            family: "Vazirmatn",
          },
        },
      },
      x: {
        ticks: {
          font: {
            size: 11,
            family: "Vazirmatn",
          },
          maxRotation: 45,
          minRotation: 45,
        },
      },
    },
    animation: {
      duration: 1000,
    },
  };

  return (
    <div className="p-3 sm:p-6" dir="rtl">
      <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center sm:gap-0">
        <div className="flex w-full items-center justify-between sm:w-auto">
          <h1 className="text-xl font-bold sm:text-2xl">داشبورد تحلیلی</h1>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="rounded-md p-2 hover:bg-gray-100 sm:hidden">
            <FaBars className="h-5 w-5" />
          </button>
        </div>
        <div className={`flex w-full gap-2 sm:w-auto ${isMobileMenuOpen ? "flex" : "hidden"} sm:flex`}>
          {timeRanges.map((range) => (
            <button
              key={range.value}
              onClick={() => {
                setSelectedDays(range.value);
                setIsMobileMenuOpen(false);
              }}
              className={`flex-1 rounded-md px-3 py-2 text-sm sm:flex-none ${selectedDays === range.value ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-3 sm:mb-8 sm:grid-cols-2 sm:gap-6 md:grid-cols-4">
        <StatCard
          title="فروش کل"
          value={formatCurrency(salesData?.getSalesStats.totalSales || 0)}
          change={calculatePercentageChange(salesData?.getSalesStats.totalSales || 0, salesData?.getSalesStats.totalSales || 0)}
          loading={isLoading}
          icon={FaDollarSign}
        />
        <StatCard
          title="تعداد سفارشات"
          value={ordersData?.getOrdersStats.totalOrders.toString() || "0"}
          change={calculatePercentageChange(ordersData?.getOrdersStats.totalOrders || 0, ordersData?.getOrdersStats.totalOrders || 0)}
          loading={isLoading}
          icon={FaShoppingCart}
        />
        <StatCard
          title="کاربران جدید"
          value={usersData?.getNewUsersStats.totalNewUsers.toString() || "0"}
          change={calculatePercentageChange(usersData?.getNewUsersStats.totalNewUsers || 0, usersData?.getNewUsersStats.totalNewUsers || 0)}
          loading={isLoading}
          icon={FaUsers}
        />
        <StatCard title="میانگین ارزش سفارش" value={formatCurrency(calculateAverageOrderValue())} change={0} loading={isLoading} icon={FaChartLine} description="به ازای هر سفارش" />
      </div>

      <div className="mb-6 grid grid-cols-1 gap-3 sm:mb-8 sm:gap-6 lg:grid-cols-2">
        <div className="rounded-lg bg-white p-4 shadow-md sm:p-6">
          <h2 className="mb-4 text-base font-semibold sm:text-lg">فروش در مقابل کاربران جدید</h2>
          <div className="h-[250px] sm:h-[300px]">
            {isLoading ? (
              <div className="h-full animate-pulse rounded bg-gray-200" />
            ) : (
              <Line
                data={{
                  labels: salesData?.getSalesStats.salesByDay.map((item: { date: string; total: number }) => formatPersianDate(item.date)) || [],
                  datasets: [
                    {
                      label: "فروش",
                      data: salesData?.getSalesStats.salesByDay.map((item: { date: string; total: number }) => item.total) || [],
                      borderColor: "rgb(59, 130, 246)",
                      backgroundColor: "rgba(59, 130, 246, 0.1)",
                      fill: true,
                      tension: 0.4,
                      yAxisID: "y",
                    },
                    {
                      label: "کاربران جدید",
                      data: usersData?.getNewUsersStats.usersByDay.map((item: { date: string; count: number }) => item.count) || [],
                      borderColor: "rgb(245, 158, 11)",
                      backgroundColor: "rgba(245, 158, 11, 0.1)",
                      fill: true,
                      tension: 0.4,
                      yAxisID: "y1",
                    },
                  ],
                }}
                options={{
                  ...chartOptions,
                  scales: {
                    y: {
                      type: "linear",
                      display: true,
                      position: "left",
                      title: {
                        display: true,
                        text: "فروش (تومان)",
                        font: {
                          size: 11,
                          family: "Vazirmatn",
                        },
                      },
                    },
                    y1: {
                      type: "linear",
                      display: true,
                      position: "right",
                      title: {
                        display: true,
                        text: "کاربران جدید",
                        font: {
                          size: 11,
                          family: "Vazirmatn",
                        },
                      },
                      grid: {
                        drawOnChartArea: false,
                      },
                    },
                  },
                }}
              />
            )}
          </div>
        </div>

        <div className="rounded-lg bg-white p-4 shadow-md sm:p-6">
          <h2 className="mb-4 text-base font-semibold sm:text-lg">توزیع وضعیت سفارشات</h2>
          <div className="h-[250px] sm:h-[300px]">
            {isLoading ? (
              <div className="h-full animate-pulse rounded bg-gray-200" />
            ) : (
              <Pie
                data={{
                  labels: ordersData?.getOrdersStats.ordersByStatus.map((item: { status: string; count: number }) => statusLabels[item.status as keyof typeof statusLabels]) || [],
                  datasets: [
                    {
                      data: ordersData?.getOrdersStats.ordersByStatus.map((item: { status: string; count: number }) => item.count) || [],
                      backgroundColor: ordersData?.getOrdersStats.ordersByStatus.map(
                        (item: { status: string; count: number }) => statusColors[item.status as keyof typeof statusColors] || "rgb(156, 163, 175)",
                      ),
                    },
                  ],
                }}
                options={{
                  ...chartOptions,
                  plugins: {
                    ...chartOptions.plugins,
                    tooltip: {
                      callbacks: {
                        label: (context) => {
                          const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
                          const percentage = (((context.raw as number) / total) * 100).toFixed(1);
                          return `${context.label}: ${context.raw} (${percentage}%)`;
                        },
                      },
                    },
                  },
                }}
              />
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:gap-6">
        <div className="rounded-lg bg-white p-4 shadow-md sm:p-6">
          <h2 className="mb-4 text-base font-semibold sm:text-lg">بهترین روزهای فروش</h2>
          <div className="h-[250px] sm:h-[300px]">
            {isLoading ? (
              <div className="h-full animate-pulse rounded bg-gray-200" />
            ) : (
              <Bar
                data={{
                  labels: getTopPerformingDays().map((item) => formatPersianDate(item.date)),
                  datasets: [
                    {
                      label: "فروش",
                      data: getTopPerformingDays().map((item) => item.total),
                      backgroundColor: "rgba(59, 130, 246, 0.8)",
                    },
                  ],
                }}
                options={{
                  ...chartOptions,
                  plugins: {
                    ...chartOptions.plugins,
                    tooltip: {
                      callbacks: {
                        label: (context) => formatCurrency(context.raw as number),
                      },
                    },
                  },
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
