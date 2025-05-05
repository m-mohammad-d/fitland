import AccountSidebar from "@/components/account/AccountSidebar";
import Header from "@/components/layout/Header";

function AccountLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container mx-auto md:px-4 md:py-6">
      <Header />
      <div className="flex flex-col md:flex-row gap-6 mt-12">
        <aside className="w-full md:w-72 flex-shrink-0">
          <AccountSidebar />
        </aside>

        <main className="flex-1 bg-white md:rounded-2xl md:shadow-sm min-h-[500px] border border-neutral-400">
          {children}
        </main>
      </div>
    </div>
  );
}

export default AccountLayout;
