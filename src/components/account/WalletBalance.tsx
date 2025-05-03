"use client";

import CountUp from "react-countup";

type WalletBalanceProps = {
  balance: number;
};

export default function WalletBalance({ balance }: WalletBalanceProps) {
  return (
    <h2 className="text-3xl font-bold mt-1 text-gray-800">
      <CountUp end={balance} /> تومان
    </h2>
  );
}
