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
    <div className="my-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center gap-3">
        <div className="bg-primary-150 text-primary-600 rounded-lg p-2">
          <BiTagAlt className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">کد تخفیف</h3>
          <p className="text-sm text-gray-500">اگر کد تخفیف دارید اینجا وارد کنید</p>
        </div>
      </div>

      <div className="flex flex-col items-center gap-3 sm:flex-row">
        <Input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="مثال: SPRING1403"
          className="h-[42px] flex-1"
          size={40}
          aria-label="کد تخفیف"
          errorMessage={message?.type === "error" ? message.text : undefined}
        />

        <Button onClick={handleApplyDiscount} disabled={loading} className="bg-primary-600 hover:bg-primary-700 h-[42px] sm:w-36" aria-label="اعمال کد تخفیف">
          {loading ? <span className="animate-pulse text-sm">در حال بررسی...</span> : "اعمال کد"}
        </Button>
      </div>

      {message && (
        <div role="alert" className={`mt-4 flex items-start gap-2 rounded-lg p-3 text-sm ${message.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
          {message.type === "success" ? <HiCheckCircle className="mt-0.5 h-5 w-5" /> : <HiXCircle className="mt-0.5 h-5 w-5" />}
          <span>{message.text}</span>
        </div>
      )}
    </div>
  );
}

export default DiscountCode;
