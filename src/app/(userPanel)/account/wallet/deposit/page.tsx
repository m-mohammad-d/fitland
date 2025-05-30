"use client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/ui/Input";
import { toast } from "react-hot-toast";
import Button from "@/components/ui/Button";

const depositSchema = z.object({
  amount: z.number().min(50000, "حداقل مبلغ واریز ۵۰,۰۰۰ تومان است").max(10000000, "حداکثر مبلغ واریز ۱۰,۰۰۰,۰۰۰ تومان است"),
});

type DepositFormValues = z.infer<typeof depositSchema>;

export default function WalletDepositPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<DepositFormValues>({
    resolver: zodResolver(depositSchema),
    defaultValues: {
      amount: 50000,
    },
  });

  const amount = watch("amount");

  const setQuickAmount = (value: number) => {
    setValue("amount", value, { shouldValidate: true });
  };

  const onSubmit = (data: DepositFormValues) => {
    router.push(`/account/wallet/payment?amount=${data.amount}`);
    toast.success("در حال انتقال به درگاه پرداخت");
  };

  return (
    <div className="mx-auto max-w-md p-4">
      <h1 className="mb-6 text-2xl font-bold">افزایش موجودی کیف پول</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium">مبلغ واریز (تومان)</label>
          <Input type="text" {...register("amount", { valueAsNumber: true })} className="w-full" min="50000" step="10000" errorMessage={errors.amount?.message} />
          <p className="mt-2 text-xs text-gray-500">حداقل مبلغ: ۵۰,۰۰۰ تومان , حداکثر مبلغ 10,000,000</p>
        </div>

        <div className="grid grid-cols-4 gap-2">
          {[50000, 100000, 200000, 500000].map((value) => (
            <button key={value} type="button" onClick={() => setQuickAmount(value)} className={`rounded-lg py-2 ${amount === value ? "bg-primary text-white" : "bg-gray-100"}`}>
              {value.toLocaleString()}
            </button>
          ))}
        </div>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "در حال انتقال..." : "ادامه به درگاه پرداخت"}
        </Button>
      </form>
    </div>
  );
}
