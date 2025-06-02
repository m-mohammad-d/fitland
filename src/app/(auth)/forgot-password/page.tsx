"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@apollo/client";
import { FORGOT_PASSWORD } from "@/graphql/mutations/AuthMutations";
import { toast } from "react-hot-toast";
import Link from "next/link";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

const forgotPasswordSchema = z.object({
  email: z.string().email("لطفا یک ایمیل معتبر وارد کنید"),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const [forgotPassword] = useMutation(FORGOT_PASSWORD);

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      const response = await forgotPassword({
        variables: {
          email: data.email,
        },
      });

      if (response.data?.forgotPassword?.success) {
        toast.success(response.data.forgotPassword.message);
      } else {
        toast.error("خطا در ارسال ایمیل بازنشانی رمز عبور");
      }
    } catch (error) {
      console.log(error)
      toast.error("خطا در ارسال ایمیل بازنشانی رمز عبور");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">فراموشی رمز عبور</h2>
          <p className="mt-2 text-center text-sm text-gray-600">ایمیل خود را وارد کنید تا لینک بازنشانی رمز عبور برای شما ارسال شود</p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <Input {...register("email")} type="email" label="ایمیل" errorMessage={errors.email?.message} autoComplete="email" placeholder="ایمیل خود را وارد کنید" fullWidth />

          <Button type="submit" disabled={isSubmitting} className="w-full" size="large">
            {isSubmitting ? "در حال ارسال..." : "ارسال لینک بازنشانی"}
          </Button>

          <div className="text-center text-sm">
            <Link href="/login" className="text-primary hover:text-primary-600 font-medium">
              بازگشت به صفحه ورود
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
