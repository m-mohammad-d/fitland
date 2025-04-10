"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import Input from "@/components/ui/Input";
import { useState, useEffect } from "react";
import { PasswordStrengthMeter } from "@/components/ui/PasswordStrengthMeter";
import { useMutation } from "@apollo/client";
import { SIGN_UP } from "@/graphql/mutations/AuthMutations";
import { calculatePasswordStrength } from "@/lib/passwordStrength";

const signupSchema = z
  .object({
    name: z.string().min(2, "نام باید حداقل ۲ کاراکتر باشد"),
    email: z.string().email("ایمیل معتبر وارد کنید").min(1, "ایمیل الزامی است"),
    password: z.string().min(6, "رمز عبور باید حداقل ۶ کاراکتر باشد"),
    confirmPassword: z.string().min(6, "تکرار رمز عبور الزامی است"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "رمز عبور و تکرار آن باید یکسان باشند",
    path: ["confirmPassword"],
  });

type SignupFormValues = z.infer<typeof signupSchema>;

export default function SignupForm() {
  const [mutateFunction] = useMutation(SIGN_UP);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
  });

  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    message: "",
  });

  const password = watch("password");

  useEffect(() => {
    setPasswordStrength(
      password ? calculatePasswordStrength(password) : { score: 0, message: "" }
    );
  }, [password]);

  const onSubmit = (data: SignupFormValues) => {
    mutateFunction({
      variables: {
        email: data.email,
        name: data.email,
        password: data.password,
      },
    });
  };

  return (
    <div className="max-w-lg w-full mx-auto p-6 rounded-lg shadow-lg bg-white">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-primary">ثبت نام در سایت</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Input
          label="نام کامل"
          type="text"
          errorMessage={errors.name?.message}
          {...register("name")}
          placeholder="نام و نام خانوادگی"
          className={errors.name ? "border-error-500" : "border-neutral-300"}
        />

        <Input
          label="ایمیل"
          type="email"
          errorMessage={errors.email?.message}
          {...register("email")}
          placeholder="example@example.com"
          className={errors.email ? "border-error-500" : "border-neutral-300"}
        />

        <Input
          label="رمز عبور"
          type="password"
          errorMessage={errors.password?.message}
          {...register("password")}
          placeholder="حداقل ۶ کاراکتر"
          className={
            errors.password ? "border-error-500" : "border-neutral-300"
          }
        />

        {password && <PasswordStrengthMeter strength={passwordStrength} />}

        <Input
          label="تکرار رمز عبور"
          type="password"
          errorMessage={errors.confirmPassword?.message}
          {...register("confirmPassword")}
          placeholder="تکرار رمز عبور"
          className={
            errors.confirmPassword ? "border-error-500" : "border-neutral-300"
          }
        />

        <button
          type="submit"
          className="w-full py-2 px-4 bg-primary hover:bg-primary-700 text-white font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-150 transition-colors"
        >
          ثبت نام
        </button>

        <div className="text-center text-sm text-neutral-700">
          <span>قبلا ثبت نام کرده‌اید؟ </span>
          <Link
            href="/login"
            className="text-primary hover:text-primary-700 font-medium"
          >
            ورود به حساب
          </Link>
        </div>
      </form>
    </div>
  );
}
