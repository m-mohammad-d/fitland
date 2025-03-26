"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import Input from "@/components/ui/Input";
import { useState, useEffect } from "react";
import { PasswordStrengthMeter } from "@/components/ui/PasswordStrengthMeter";
import { calculatePasswordStrength, PasswordStrength } from "@/utils/passwordStrength";


const loginSchema = z.object({
  email: z.string().email("ایمیل معتبر وارد کنید").min(1, "ایمیل الزامی است"),
  password: z.string().min(6, "رمز عبور باید حداقل ۶ کاراکتر باشد"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const [passwordStrength, setPasswordStrength] = useState<PasswordStrength>({
    score: 0,
    message: "",
  });

  const password = watch("password");

  useEffect(() => {
    setPasswordStrength(
      password ? calculatePasswordStrength(password) : { score: 0, message: "" }
    );
  }, [password]);

  const onSubmit = (data: LoginFormValues) => {
    console.log(data);
  };

  return (
    <div className="max-w-lg w-full mx-auto p-6 rounded-lg shadow-lg bg-white">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-primary">ورود به حساب کاربری</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Input
          label="ایمیل"
          type="email"
          errorMessage={errors.email?.message}
          {...register("email")}
          placeholder="example@example.com"
          className={`${
            errors.email ? "border-error-500" : "border-neutral-300"
          }`}
        />

        <Input
          label="رمز عبور"
          type="password"
          errorMessage={errors.password?.message}
          {...register("password")}
          placeholder="حداقل ۶ کاراکتر"
          className={`${
            errors.password ? "border-error-500" : "border-neutral-300"
          }`}
        />

        {password && <PasswordStrengthMeter strength={passwordStrength} />}

        <div className="text-right">
          <Link
            href="/forgot-password"
            className="text-sm text-primary hover:text-primary-700 focus:outline-none"
          >
            رمز عبور را فراموش کرده‌اید؟
          </Link>
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-primary hover:bg-primary-700 text-white font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-150 transition-colors"
        >
          ورود به حساب
        </button>

        <div className="text-center text-sm text-neutral-700">
          <span>حساب کاربری ندارید؟ </span>
          <Link
            href="/signup"
            className="text-primary hover:text-primary-700 font-medium"
          >
            ثبت نام کنید
          </Link>
        </div>
      </form>
    </div>
  );
}
