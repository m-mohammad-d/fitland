"use client";
import React, { useState, useRef, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import Input from "@/components/ui/Input";

const paymentSchema = z.object({
  cardNumber: z
    .string()
    .trim()
    .transform((value) => value.replace(/\s+/g, ""))
    .refine((value) => /^[0-9]{16}$/.test(value), {
      message: "شماره کارت باید 16 رقم باشد.",
    }),
  cvv: z.string().regex(/^[0-9]{3,4}$/, "CVV2 باید 3 یا 4 رقم باشد."),
  expiryMonth: z.string().regex(/^(0[1-9]|1[0-2])$/, "ماه انقضا معتبر نیست."),
  expiryYear: z.string().refine(
    (value) => {
      const year = parseInt(value);
      return year >= 1404 && year <= 1410;
    },
    {
      message: "سال انقضا باید بین 1404 تا 1410 باشد.",
    }
  ),
  captcha: z.string().min(1, "لطفاً کد امنیتی را وارد کنید."),
});

type PaymentGatewayData = z.infer<typeof paymentSchema>;

interface PaymentGatewayProps {
  onPaymentSuccess?: () => void;
  onPaymentError?: (error: unknown) => void;
  className?: string;
}

const PaymentGateway = ({
  onPaymentSuccess,
  onPaymentError,
  className,
}: PaymentGatewayProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PaymentGatewayData>({
    resolver: zodResolver(paymentSchema),
  });

  const router = useRouter();
  const [captchaCode, setCaptchaCode] = useState<string>("");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  const generateCaptcha = () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let captcha = "";
    for (let i = 0; i < 6; i++) {
      captcha += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    setCaptchaCode(captcha);
    drawCaptcha(captcha);
  };

  const drawCaptcha = (captcha: string) => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) {
        const canvasWidth = canvasRef.current.width;
        const canvasHeight = canvasRef.current.height;

        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        ctx.fillStyle = "#000000";
        ctx.font = "24px Arial";

        const textWidth = ctx.measureText(captcha).width;
        const x = (canvasWidth - textWidth) / 2;
        const y = canvasHeight / 2 + 10;
        ctx.fillText(captcha, x, y);
      }
    }
  };

  const onSubmit: SubmitHandler<PaymentGatewayData> = async (data) => {
    if (data.captcha !== captchaCode) {
      toast.error("کد امنیتی اشتباه است.");
      generateCaptcha();
      return;
    }

    setIsLoading(true);
    try {

      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast.success("پرداخت با موفقیت انجام شد.");
      onPaymentSuccess?.();
      router.refresh();
    } catch (error) {
      toast.error("مشکلی در پرداخت به وجود آمد.");
      onPaymentError?.(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  return (
    <div
      className={cn(
        "max-w-md mx-auto p-6 bg-white rounded-lg shadow-md",
        className
      )}
    >
      <h2 className="text-2xl font-semibold mb-4">فرم پرداخت آنلاین</h2>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        
        <Input
          label="شماره کارت"
          {...register("cardNumber")}
          placeholder="1234 5678 9012 3456"
          errorMessage={errors.cardNumber?.message}
          size={40}
        />


        <Input
          label="CVV2"
          {...register("cvv")}
          placeholder="123"
          errorMessage={errors.cvv?.message}
          size={40}
        />


        <div className="flex gap-4">
          <Input
            label="ماه انقضا"
            {...register("expiryMonth")}
            placeholder="MM"
            errorMessage={errors.expiryMonth?.message}
            size={40}
            className="w-1/2"
          />
          <Input
            label="سال انقضا"
            {...register("expiryYear")}
            placeholder="YY"
            errorMessage={errors.expiryYear?.message}
            size={40}
            className="w-1/2"
          />
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium mb-1">کد امنیتی</label>
          <canvas
            ref={canvasRef}
            width={150}
            height={50}
            className="border rounded-lg mb-2"
          />
          <Input
            {...register("captcha")}
            placeholder="کد امنیتی"
            errorMessage={errors.captcha?.message}
            size={40}
          />
        </div>

        <button
          type="submit"
          className={`w-full mt-6 bg-primary-500 text-white py-2 px-4 rounded-lg hover:bg-primary-600 focus:outline-none focus:ring focus:ring-primary-300 ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isLoading}
        >
          {isLoading ? "در حال پردازش..." : "پرداخت"}
        </button>
      </form>
    </div>
  );
};

export default PaymentGateway;
