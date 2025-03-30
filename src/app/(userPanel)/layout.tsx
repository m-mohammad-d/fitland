import AccountSidebar from "@/components/account/AccountSidebar";
import Header from "@/components/layout/Header";

function AccountLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container mx-auto px-4 py-6">
      <Header />
      <div className="flex flex-col md:flex-row gap-6 mt-12">
        <aside className="w-full md:w-72 flex-shrink-0">
          <AccountSidebar />
        </aside>

        <main className="flex-1 bg-white rounded-lg shadow-sm p-6 min-h-[500px] border border-gray-200">
          {children}
        </main>
      </div>
    </div>
  );
}

export default AccountLayout;
