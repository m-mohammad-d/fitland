"use client";
import PaymentGateway from "@/components/checkout/PaymentGateway";
import { WALLET_DEPOSIT } from "@/graphql/mutations/WalletMutation";
import { useMutation } from "@apollo/client";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

function WalletPaymentPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [walletDeposit] = useMutation(WALLET_DEPOSIT);

  const amount = Number(searchParams.get("amount"));

  function handleDepositWallet() {
    walletDeposit({ variables: { amount } });
    router.push("/account/wallet/success");
  }

  return (
    <div className="flex h-screen flex-col justify-center">
      <PaymentGateway onPaymentSuccess={handleDepositWallet} />
    </div>
  );
}

export default WalletPaymentPage;
