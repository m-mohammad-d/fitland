import AccountSidebar from "@/components/account/AccountSidebar";
import Header from "@/components/layout/Header";

function AccountLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container mx-auto md:px-4 md:py-6">
      <Header />
      <div className="mt-12 flex flex-col gap-6 md:flex-row">
        <aside className="w-full flex-shrink-0 md:w-72">
          <AccountSidebar />
        </aside>

        <main className="min-h-[500px] flex-1 border border-neutral-400 bg-white md:rounded-2xl md:shadow-sm">{children}</main>
      </div>
    </div>
  );
}

export default AccountLayout;
