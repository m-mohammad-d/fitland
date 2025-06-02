"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@apollo/client";
import { User } from "@/types/User";
import { UPDATE_USER } from "@/graphql/mutations/UserMutations";
import Input from "../ui/Input";
import Button from "../ui/Button";
import UploadSpinner from "../ui/UploadSpinner";
import toast from "react-hot-toast";

const schema = z.object({
  id: z.string(),
  name: z.string().min(2, "نام باید حداقل ۲ حرف باشد"),
  email: z.string().email("ایمیل معتبر نیست"),
  phone: z.string().min(1, "شماره تلفن الزامی است"),
  nationalCode: z.string().min(1, "کد ملی الزامی است"),
  gender: z.enum(["MALE", "FEMALE"], {
    errorMap: () => ({ message: "جنسیت را انتخاب کنید" }),
  }),
});

type FormData = z.infer<typeof schema>;

interface Props {
  user: User;
}

function UpdateProfileForm({ user }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      id: user.id,
      name: user.name ?? "",
      email: user.email ?? "",
      phone: user.phone ?? "",
      nationalCode: user.nationalCode ?? "",
      gender: user.gender === "MALE" || user.gender === "FEMALE" ? user.gender : undefined,
    },
  });

  const [updateUser] = useMutation(UPDATE_USER);

  const onSubmit = async (data: FormData) => {
    try {
      const { id, ...input } = data;
      await updateUser({
        variables: { id, ...input },
      });
      toast.success("پروفایل با موفقیت به‌روزرسانی شد!");
    } catch (error) {
      console.error("خطا در بروزرسانی پروفایل:", error);
      toast.error("خطا در بروزرسانی پروفایل");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mx-auto max-w-2xl p-4">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Input label="نام" {...register("name")} errorMessage={errors.name?.message} />
        <Input label="ایمیل" type="email" {...register("email")} errorMessage={errors.email?.message} />
        <Input label="شماره تلفن" {...register("phone")} errorMessage={errors.phone?.message} />
        <Input label="کد ملی" {...register("nationalCode")} errorMessage={errors.nationalCode?.message} />
        <div className="lg:col-span-2">
          <label className="text-neutral-gray-8 mb-2 block">جنسیت</label>
          <select {...register("gender")} className="border-neutral-gray-3 mt-1 w-full rounded-md border px-3 py-2">
            <option value="">انتخاب کنید</option>
            <option value="MALE">مرد</option>
            <option value="FEMALE">زن</option>
          </select>
          {errors.gender && <p className="mt-1 text-sm text-red-500">{errors.gender.message}</p>}
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? <UploadSpinner /> : "ذخیره تغییرات"}
        </Button>
      </div>
    </form>
  );
}

export default UpdateProfileForm;
