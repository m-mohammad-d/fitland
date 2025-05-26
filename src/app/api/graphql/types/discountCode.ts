export type AddDiscountCodeInput = {
  code: string;
  isActive: boolean;
  type: "PERCENT" | "AMOUNT";
  value: number;
};

export type UpdateDiscountCodeInput = {
  id: string;
  code: string;
  isActive: boolean;
  type: "PERCENT" | "AMOUNT";
  value: number;
};