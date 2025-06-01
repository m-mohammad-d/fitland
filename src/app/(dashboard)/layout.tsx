import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import { SidebarProvider } from "@/provider/SidebarContext";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { graphQLFetch } from "@/lib/graphqlFetch";
import { GET_ME } from "@/graphql/queries/userQueries";
import { GetMeQuery } from "@/types/User";
import { redirect } from "next/navigation";
export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const getMeResponse = await graphQLFetch<GetMeQuery>(process.env.NEXT_PUBLIC_BACKEND_URL!, GET_ME.loc?.source.body as string);

  if (getMeResponse?.data?.getMe?.role !== "ADMIN") {
    redirect("/forbidden");
  }
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
