"use client";

import { FiDollarSign, FiShoppingBag, FiPackage, FiUsers, FiPlus, FiTag, FiTruck, FiBarChart2 } from "react-icons/fi";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// Static data for demonstration
const statsData = [
  {
    title: "فروش امروز",
    value: "۱۲,۳۴۵,۰۰۰",
    change: "+۵.۲٪",
    icon: FiDollarSign,
    color: "bg-blue-500",
  },
  {
    title: "سفارشات امروز",
    value: "۱۵۶",
    change: "+۱۲٪",
    icon: FiShoppingBag,
    color: "bg-green-500",
  },
  {
    title: "محصولات فعال",
    value: "۱,۲۳۴",
    change: "+۲.۱٪",
    icon: FiPackage,
    color: "bg-purple-500",
  },
  {
    title: "کاربران جدید (ماه)",
    value: "۷۸۹",
    change: "+۸.۴٪",
    icon: FiUsers,
    color: "bg-orange-500",
  },
];

const salesData = {
  labels: ["دوشنبه", "سه‌شنبه", "چهارشنبه", "پنج‌شنبه", "جمعه", "شنبه", "یکشنبه"],
  datasets: [
    {
      label: "فروش",
      data: [12000, 19000, 15000, 25000, 22000, 30000, 28000],
      borderColor: "rgb(59, 130, 246)",
      backgroundColor: "rgba(59, 130, 246, 0.1)",
      tension: 0.4,
      fill: true,
    },
  ],
};

const latestOrders = [
  {
    id: "سفارش-۰۰۱",
    customer: "علی محمدی",
    date: "۱۴۰۳/۰۱/۰۱",
    amount: "۲,۹۹۹,۰۰۰",
    status: "در انتظار",
  },
  {
    id: "سفارش-۰۰۲",
    customer: "مریم احمدی",
    date: "۱۴۰۳/۰۱/۰۱",
    amount: "۱,۹۹۹,۰۰۰",
    status: "ارسال شده",
  },
  {
    id: "سفارش-۰۰۳",
    customer: "رضا کریمی",
    date: "۱۴۰۲/۱۲/۲۹",
    amount: "۴,۹۹۹,۰۰۰",
    status: "تحویل داده شده",
  },
  {
    id: "سفارش-۰۰۴",
    customer: "سارا حسینی",
    date: "۱۴۰۲/۱۲/۲۹",
    amount: "۱,۴۹۹,۰۰۰",
    status: "لغو شده",
  },
  {
    id: "سفارش-۰۰۵",
    customer: "محمد رضایی",
    date: "۱۴۰۲/۱۲/۲۸",
    amount: "۳,۹۹۹,۰۰۰",
    status: "در حال پردازش",
  },
];

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

export default function DashboardPage() {
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
            data={salesData}
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

      {/* Latest Orders */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">آخرین سفارشات</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="pb-3 text-right text-sm font-medium text-gray-600">شماره سفارش</th>
                <th className="pb-3 text-right text-sm font-medium text-gray-600">مشتری</th>
                <th className="pb-3 text-right text-sm font-medium text-gray-600">تاریخ</th>
                <th className="pb-3 text-right text-sm font-medium text-gray-600">مبلغ</th>
                <th className="pb-3 text-right text-sm font-medium text-gray-600">وضعیت</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {latestOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="py-4 text-sm text-gray-900">{order.id}</td>
                  <td className="py-4 text-sm text-gray-900">{order.customer}</td>
                  <td className="py-4 text-sm text-gray-900">{order.date}</td>
                  <td className="py-4 text-sm text-gray-900">{order.amount}</td>
                  <td className="py-4">
                    <span
                      className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                        order.status === "تحویل داده شده"
                          ? "bg-green-100 text-green-800"
                          : order.status === "ارسال شده"
                          ? "bg-blue-100 text-blue-800"
                          : order.status === "در انتظار"
                          ? "bg-yellow-100 text-yellow-800"
                          : order.status === "لغو شده"
                          ? "bg-red-100 text-red-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {quickActions.map((action, index) => (
          <a
            key={index}
            href={action.href}
            className="group flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md"
          >
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