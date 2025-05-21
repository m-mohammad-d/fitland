"use client";

import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import { SidebarProvider } from "@/provider/SidebarContext";
import DashboardHeader from "@/components/dashboard/DashboardHeader";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="min-h-screen bg-gray-50">
        <DashboardHeader />

        {/* Main Content */}
        <div className="flex h-[calc(100vh-64px)]">
          <DashboardSidebar />
          <main className="flex-1 overflow-y-auto bg-gray-50">
            <div className="container mx-auto px-4 py-4 md:px-6 md:py-8">
              <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm md:p-6">{children}</div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
