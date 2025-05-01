"use client";

import { APPLY_DISCOUNT } from "@/graphql/mutations/discountMutations";
import { useCart } from "@/store/useCart";
import { useMutation } from "@apollo/client";
import { useState } from "react";
import Button from "../ui/Button";
import Input from "../ui/Input";
import { BiTagAlt } from "react-icons/bi";
import { HiCheckCircle, HiXCircle } from "react-icons/hi";

function DiscountCode() {
  const { checkout, setCheckoutField, getTotal } = useCart();
  const [code, setCode] = useState(checkout.discountCode || "");
  const [message, setMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);

  const [applyDiscount, { loading }] = useMutation(APPLY_DISCOUNT);

  const handleApplyDiscount = async () => {
    const trimmedCode = code.trim();
    if (!trimmedCode) {
      showMessage("لطفا کد تخفیف را وارد کنید", "error");
      return;
    }

    try {
      const { data } = await applyDiscount({
        variables: { code: trimmedCode, totalPrice: getTotal() },
      });

      const result = data.applyDiscount;

      if (result.success) {
        setCheckoutField("discountCode", result.code);
        setCheckoutField("discountAmount", result.discountAmount);
        showMessage(result.message, "success");
      } else {
        resetDiscount();
        showMessage(result.message, "error");
      }
    } catch {
      resetDiscount();
      showMessage("خطا در ارتباط با سرور", "error");
    }
  };

  const resetDiscount = () => {
    setCheckoutField("discountCode", "");
    setCheckoutField("discountAmount", 0);
  };

  const showMessage = (text: string, type: "success" | "error") => {
    setMessage({ text, type });
  };

  return (
    <div className="bg-white rounded-xl my-8 p-6 shadow-sm border border-gray-200">
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-primary-150 p-2 rounded-lg text-primary-600">
          <BiTagAlt className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">کد تخفیف</h3>
          <p className="text-sm text-gray-500">
            اگر کد تخفیف دارید اینجا وارد کنید
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center sm:flex-row gap-3">
        <Input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="مثال: SPRING1403"
          className="flex-1 h-[42px]"
          size={40}
          aria-label="کد تخفیف"
          errorMessage={message?.type === "error" ? message.text : undefined}
        />

        <Button
          onClick={handleApplyDiscount}
          disabled={loading}
          className="sm:w-36 h-[42px] bg-primary-600 hover:bg-primary-700"
          aria-label="اعمال کد تخفیف"
        >
          {loading ? (
            <span className="animate-pulse text-sm">در حال بررسی...</span>
          ) : (
            "اعمال کد"
          )}
        </Button>
      </div>

      {message && (
        <div
          role="alert"
          className={`mt-4 p-3 rounded-lg text-sm flex items-start gap-2 ${
            message.type === "success"
              ? "bg-green-50 text-green-700"
              : "bg-red-50 text-red-700"
          }`}
        >
          {message.type === "success" ? (
            <HiCheckCircle className="w-5 h-5 mt-0.5" />
          ) : (
            <HiXCircle className="w-5 h-5 mt-0.5" />
          )}
          <span>{message.text}</span>
        </div>
      )}
    </div>
  );
}

export default DiscountCode;
