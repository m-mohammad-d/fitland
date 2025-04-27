import { GET_WALLET_USER } from "@/graphql/queries/walletQueries";
import { graphQLFetch } from "@/lib/graphqlFetch";
import { GraphQLFetchGetWalletResponse } from "@/types/Wallet";
import Link from "next/link";
import {
  FaWallet,
  FaPlusCircle,
  FaHistory,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

async function UserWalletPage() {
  const res = await graphQLFetch<GraphQLFetchGetWalletResponse>(
    process.env.NEXT_PUBLIC_BACKEND_URL || "",
    GET_WALLET_USER.loc?.source.body as string
  );
  const wallet = res.data.getUserWalletInfo;

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-md mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <FaWallet className="text-2xl text-primary-600" />
          <h1 className="text-2xl font-bold text-gray-800">کیف پول من</h1>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-gray-200">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">موجودی فعلی</p>
              <h2 className="text-3xl font-bold mt-1 text-gray-800">
                {wallet.balance.toLocaleString()} تومان
              </h2>
            </div>
          </div>

          <Link
            href="/account/wallet/deposit"
            className="mt-6 w-full flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white py-3 px-4 rounded-lg transition-colors"
          >
            <FaPlusCircle className="text-lg" />
            <span>افزایش موجودی</span>
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <FaHistory className="text-lg text-primary-600" />
            <h3 className="font-semibold text-gray-800">تراکنش‌های اخیر</h3>
          </div>

          {wallet.transactions.length === 0 ? (
            <p className="text-gray-500 text-center py-4">تراکنشی یافت نشد</p>
          ) : (
            <div className="space-y-4">
              {wallet.transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex justify-between items-center border-b border-gray-100 pb-3"
                >
                  <div className="flex items-center gap-3">
                    {transaction.transactionType === "DEPOSIT" ? (
                      <FaCheckCircle className="text-green-500 text-xl" />
                    ) : (
                      <FaTimesCircle className="text-red-500 text-xl" />
                    )}
                    <div>
                      <p className="font-medium text-gray-800">
                        {transaction.transactionType === "DEPOSIT"
                          ? "افزایش موجودی"
                          : "برداشت از کیف پول"}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(transaction.createdAt).toLocaleDateString(
                          "fa-IR"
                        )}
                      </p>
                    </div>
                  </div>
                  <p
                    className={`font-medium ${
                      transaction.transactionType === "DEPOSIT"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {transaction.transactionType === "DEPOSIT" ? "+" : "-"}
                    {transaction.amount.toLocaleString()} تومان
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserWalletPage;
