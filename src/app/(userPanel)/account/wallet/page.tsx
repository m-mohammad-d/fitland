import TransactionItem from "@/components/account/TransactionItem";
import WalletBalance from "@/components/account/WalletBalance";
import { GET_WALLET_USER } from "@/graphql/queries/walletQueries";
import { graphQLFetch } from "@/lib/graphqlFetch";
import { GraphQLFetchGetWalletResponse } from "@/types/Wallet";
import Link from "next/link";
import { Metadata } from "next/types";
import { FaWallet, FaPlusCircle, FaHistory } from "react-icons/fa";
export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "کیف پول",
  description: "مدیریت موجودی و پرداخت‌های شما با استفاده از کیف پول.",
  openGraph: {
    title: "کیف پول | FitLand",
    description: "پرداخت سریع و راحت با کیف پول فیت‌لند.",
  },
  twitter: {
    title: "کیف پول من",
    description: "بررسی موجودی و تراکنش‌های کیف پول شما.",
  },
};
async function UserWalletPage() {
  const res = await graphQLFetch<GraphQLFetchGetWalletResponse>(process.env.NEXT_PUBLIC_BACKEND_URL || "", GET_WALLET_USER.loc?.source.body as string);
  const wallet = res.data.getUserWalletInfo;

  return (
    <div className="min-h-screen p-4">
      <div className="mx-auto max-w-md">
        <div className="mb-6 flex items-center gap-3">
          <FaWallet className="text-primary-600 text-2xl" />
          <h1 className="text-2xl font-bold text-gray-800">کیف پول من</h1>
        </div>

        <div className="mb-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">موجودی فعلی</p>
              <WalletBalance balance={wallet.balance} />
            </div>
          </div>

          <Link href="/account/wallet/deposit" className="bg-primary-600 hover:bg-primary-700 mt-6 flex w-full items-center justify-center gap-2 rounded-lg px-4 py-3 text-white transition-colors">
            <FaPlusCircle className="text-lg" />
            <span>افزایش موجودی</span>
          </Link>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-3">
            <FaHistory className="text-primary-600 text-lg" />
            <h3 className="font-semibold text-gray-800">تراکنش‌های اخیر</h3>
          </div>

          {wallet.transactions.length === 0 ? (
            <p className="py-4 text-center text-gray-500">تراکنشی یافت نشد</p>
          ) : (
            <div className="space-y-4">
              {wallet.transactions.map((transaction) => (
                <TransactionItem
                  key={transaction.id}
                  id={transaction.id}
                  transactionType={transaction.transactionType as "DEPOSIT" | "WITHDRAW"}
                  amount={transaction.amount}
                  createdAt={transaction.createdAt}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserWalletPage;
