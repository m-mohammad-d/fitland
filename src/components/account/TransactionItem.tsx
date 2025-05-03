"use client";

import { formatJalaliDate } from "@/lib/Date";
import CountUp from "react-countup";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

type Props = {
  id: string;
  transactionType: "DEPOSIT" | "WITHDRAW";
  amount: number;
  createdAt: number;
};

export default function TransactionItem({
  transactionType,
  amount,
  createdAt,
}: Props) {
  const isDeposit = transactionType === "DEPOSIT";

  return (
    <div className="flex justify-between items-center border-b border-gray-100 pb-3">
      <div className="flex items-center gap-3">
        {isDeposit ? (
          <FaCheckCircle className="text-green-500 text-xl" />
        ) : (
          <FaTimesCircle className="text-red-500 text-xl" />
        )}
        <div>
          <p className="font-medium text-gray-800">
            {isDeposit ? "افزایش موجودی" : "برداشت از کیف پول"}
          </p>
          <p className="text-xs text-gray-500">{formatJalaliDate(createdAt)}</p>
        </div>
      </div>
      <p
        className={`font-medium ${
          isDeposit ? "text-green-600" : "text-red-600"
        }`}
      >
        {isDeposit ? "+" : "-"}
        <CountUp end={amount} duration={2.75} /> تومان
      </p>
    </div>
  );
}
