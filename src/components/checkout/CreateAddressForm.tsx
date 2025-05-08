"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Input from "@/components/ui/Input";
import { z } from "zod";
import Button from "@/components/ui/Button";

const schema = z.object({
  fullName: z.string().min(2, "نام تحویل‌گیرنده الزامی است"),
  phone: z
    .string()
    .min(10, "شماره تماس باید حداقل ۱۰ رقم باشد")
    .max(11, "شماره تماس باید حداکثر ۱۱ رقم باشد")
    .regex(/^[0-9]+$/, "شماره تماس باید فقط شامل اعداد باشد"),
  zipCode: z
    .string()
    .min(10, "کد پستی باید ۱۰ رقم باشد")
    .max(10, "کد پستی باید ۱۰ رقم باشد")
    .regex(/^[0-9]+$/, "کد پستی باید فقط شامل اعداد باشد"),
  plaque: z
    .string()
    .min(1, "پلاک الزامی است")
    .regex(/^[0-9]+$/, "پلاک باید فقط شامل اعداد باشد"),
  unit: z.string().optional(),
  details: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

interface Props {
  onSubmit: (data: FormData) => void;
  defaultAddress?: string;
}

const CreateAddressForm = ({ onSubmit, defaultAddress }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 px-2 md:px-0 mt-4"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="نام تحویل‌گیرنده *"
          placeholder="مثال: علی محمدی"
          {...register("fullName")}
          errorMessage={errors.fullName?.message}
        />
        <Input
          label="شماره تماس *"
          placeholder="مثال: 09123456789"
          {...register("phone")}
          errorMessage={errors.phone?.message}
        />
      </div>

      <Input
        label="آدرس انتخابی از نقشه"
        value={defaultAddress}
        disabled
        fullWidth
        placeholder="آدرس از روی نقشه انتخاب خواهد شد"
      />

      <Input
        label="کد پستی *"
        placeholder="مثال: 1234567890"
        {...register("zipCode")}
        errorMessage={errors.zipCode?.message}
      />
      <Input
        label="پلاک *"
        placeholder="مثال: ۱۲"
        {...register("plaque")}
        errorMessage={errors.plaque?.message}
      />
      <Input
        label="واحد"
        placeholder="مثال: ۳"
        {...register("unit")}
        errorMessage={errors.unit?.message}
      />

      <Input
        label="جزئیات بیشتر (اختیاری)"
        placeholder="مثال: طبقه دوم، واحد سمت چپ"
        {...register("details")}
        errorMessage={errors.details?.message}
      />

      <Button type="submit" className="w-full mt-2">
        ثبت آدرس
      </Button>
    </form>
  );
};

export default CreateAddressForm;
