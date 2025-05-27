"use client";

import { useMutation } from "@apollo/client";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import DiscountForm from "@/components/dashboard/DiscountForm";
import { ADD_DISCOUNT } from "@/graphql/mutations/discountMutations";
import { DiscountFormValues } from "@/validator/Discount";

export default function AddDiscountForm() {
  const router = useRouter();
  const [createDiscount, { loading }] = useMutation(ADD_DISCOUNT, {
    onCompleted: () => {
      toast.success("کد تخفیف با موفقیت ایجاد شد");
      router.push("/dashboard/discounts");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleSubmit = async (data: DiscountFormValues) => {
    await createDiscount({
      variables: {
        input: {
          code: data.code,
          type: data.type,
          value: data.value,
          isActive: data.isActive,
        },
      },
    });
  };

  return <DiscountForm onSubmit={handleSubmit} isLoading={loading} submitLabel="ایجاد کد تخفیف" />;
}
