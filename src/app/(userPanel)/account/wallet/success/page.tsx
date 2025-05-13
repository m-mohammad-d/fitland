import Celebration from "@/components/ui/Celebration";

export default function WalletSuccess() {
  return <Celebration title="🎉 ولت شما شارژ شد!" message="موجودی ولت شما با موفقیت افزایش یافت." redirectText="رفتن به کیف پول" redirectTo="/account/wallet" />;
}
