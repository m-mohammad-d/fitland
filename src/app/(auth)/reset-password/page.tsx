"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@apollo/client";
import { RESET_PASSWORD } from "@/graphql/mutations/AuthMutations";
import { toast } from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

const resetPasswordSchema = z
  .object({
    password: z.string().min(8, "رمز عبور باید حداقل ۸ کاراکتر باشد"),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "رمز عبور و تکرار آن باید یکسان باشند",
    path: ["confirmPassword"],
  });

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    if (!token) {
      toast.error("توکن بازنشانی نامعتبر است");
      router.push("/forgot-password");
    }
  }, [token, router]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const [resetPassword] = useMutation(RESET_PASSWORD);

  const onSubmit = async (data: ResetPasswordFormData) => {
    if (!token) return;

    try {
      const response = await resetPassword({
        variables: {
          token,
          newPassword: data.password,
        },
      });

      if (response.data?.resetPassword?.success) {
        toast.success(response.data.resetPassword.message);
        // Redirect to login page after 2 seconds
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        toast.error(response.data?.resetPassword?.message || "خطا در بازنشانی رمز عبور");
      }
    } catch (error) {
      console.log(error);
      toast.error("خطا در بازنشانی رمز عبور");
    }
  };

  if (!token) {
    return null;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">بازنشانی رمز عبور</h2>
          <p className="mt-2 text-center text-sm text-gray-600">رمز عبور جدید خود را وارد کنید</p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <Input
              {...register("password")}
              type="password"
              label="رمز عبور جدید"
              errorMessage={errors.password?.message}
              autoComplete="new-password"
              placeholder="رمز عبور جدید را وارد کنید"
              fullWidth
            />
            <Input
              {...register("confirmPassword")}
              type="password"
              label="تکرار رمز عبور"
              errorMessage={errors.confirmPassword?.message}
              autoComplete="new-password"
              placeholder="تکرار رمز عبور را وارد کنید"
              fullWidth
            />
          </div>

          <Button type="submit" disabled={isSubmitting} className="w-full" size="large">
            {isSubmitting ? "در حال بازنشانی..." : "بازنشانی رمز عبور"}
          </Button>
        </form>
      </div>
    </div>
  );
}
