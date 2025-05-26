export type AddDiscountCodeInput = {
  code: string;
  isActive: boolean;
  type: "PERCENT" | "AMOUNT";
  value: number;
};

