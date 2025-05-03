"use client";
import React, { useState, useRef, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import Input from "@/components/ui/Input";
import Button from "../ui/Button";

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
  amount?: number;
}

const PaymentGateway = ({
  onPaymentSuccess,
  onPaymentError,
  className,
  amount = 250000,
}: PaymentGatewayProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
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

        for (let i = 0; i < 100; i++) {
          ctx.strokeStyle = `rgba(0, 0, 0, ${Math.random() * 0.2})`;
          ctx.beginPath();
          ctx.moveTo(Math.random() * canvasWidth, Math.random() * canvasHeight);
          ctx.lineTo(Math.random() * canvasWidth, Math.random() * canvasHeight);
          ctx.stroke();
        }

        ctx.fillStyle = "#333";
        ctx.font = "bold 24px Arial";

        for (let i = 0; i < captcha.length; i++) {
          ctx.save();
          ctx.translate(20 + i * 20, 30);
          ctx.rotate((Math.random() - 0.5) * 0.4);
          ctx.fillText(captcha[i], 0, 0);
          ctx.restore();
        }
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
        "max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg border border-gray-200",
        className
      )}
    >
      <h2 className="text-2xl font-bold mb-4 text-center text-primary">
        پرداخت آنلاین
      </h2>

      <div className="bg-blue-50 p-4 rounded-lg mb-6 border border-blue-100">
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-600">مبلغ قابل پرداخت:</span>
          <span className="text-xl font-bold text-primary">
            {amount.toLocaleString("fa-IR")} تومان
          </span>
        </div>
        <div className="text-sm text-gray-500">
          لطفا اطلاعات کارت بانکی خود را با دقت وارد نمایید.
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="mb-4">
          <Input
            label="شماره کارت بانکی"
            {...register("cardNumber")}
            placeholder="1234 5678 9012 3456"
            errorMessage={errors.cardNumber?.message}
            size={40}
            dir="ltr"
            className="text-left"
          />
          <p className="text-xs text-gray-500 mt-1">
            شماره 16 رقمی روی کارت خود را بدون خط تیره وارد کنید.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <Input
              label="کد CVV2"
              {...register("cvv")}
              placeholder="123"
              errorMessage={errors.cvv?.message}
              size={40}
              dir="ltr"
            />
            <p className="text-xs text-gray-500 mt-1">
              کد 3 یا 4 رقمی پشت کارت
            </p>
          </div>
          <div>
            <Input
              label="تاریخ انقضا"
              {...register("expiryMonth")}
              placeholder="ماه"
              errorMessage={errors.expiryMonth?.message}
              size={40}
            />
          </div>
          <div>
            <Input
              {...register("expiryYear")}
              placeholder="سال"
              errorMessage={errors.expiryYear?.message}
              size={40}
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">کد امنیتی</label>
          <div className="flex items-center gap-3">
            <canvas
              ref={canvasRef}
              width={150}
              height={50}
              className="border rounded-lg bg-gray-50 cursor-pointer"
              onClick={generateCaptcha}
            />
            <button
              type="button"
              onClick={generateCaptcha}
              className="text-xs text-blue-600 hover:text-blue-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
            </button>
          </div>
          <Input
            {...register("captcha")}
            placeholder="کد نمایش داده شده را وارد کنید"
            errorMessage={errors.captcha?.message}
            size={40}
            className="mt-2"
            dir="ltr"
          />
        </div>

        <div className="mb-6">
          <label className="flex items-start">
            <input type="checkbox" className="mt-1 mr-2" required />
            <span className="text-sm text-gray-600">
              با{" "}
              <a href="#" className="text-blue-600 hover:underline">
                قوانین و شرایط
              </a>{" "}
              پرداخت موافقت می‌کنم.
            </span>
          </label>
        </div>

        <Button
          type="submit"
          className={cn(
            "w-full",
            isLoading ? "opacity-70 cursor-not-allowed" : ""
          )}
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              در حال پردازش...
            </span>
          ) : (
            "پرداخت اینترنتی"
          )}
        </Button>

        <div className="mt-4 text-center text-xs text-gray-500">
          <p>پرداخت شما توسط درگاه بانک ملت انجام می‌شود.</p>
          <p className="mt-1">اطلاعات شما نزد ما محفوظ است.</p>
        </div>
      </form>
    </div>
  );
};

export default PaymentGateway;
