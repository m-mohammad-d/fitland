"use client";

import { useMutation } from "@apollo/client";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import DiscountForm from "@/components/dashboard/DiscountForm";
import { UPDATE_DISCOUNT } from "@/graphql/mutations/discountMutations";
import { DiscountFormValues } from "@/validator/Discount";

interface UpdateDiscountFormProps {
  discountId: string;
  defaultValues?: DiscountFormValues;
}

export default function UpdateDiscountForm({ discountId, defaultValues }: UpdateDiscountFormProps) {
  const router = useRouter();
  const [updateDiscount, { loading }] = useMutation(UPDATE_DISCOUNT, {
    onCompleted: () => {
      toast.success("کد تخفیف با موفقیت ویرایش شد");
      router.push("/dashboard/discounts");
      router.refresh();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleSubmit = async (data: DiscountFormValues) => {
    await updateDiscount({
      variables: {
        input: {
          id: discountId,
          code: data.code,
          type: data.type,
          value: data.value,
          isActive: data.isActive,
        },
      },
    });
  };

  return <DiscountForm onSubmit={handleSubmit} isLoading={loading} submitLabel="ویرایش کد تخفیف" defaultValues={defaultValues} />;
}
