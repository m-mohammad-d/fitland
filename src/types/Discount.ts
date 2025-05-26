export interface Discount {
  id: string;
  code: string;
  isActive: boolean;
  type: "PERCENT" | "AMOUNT";
  value: number;
}

export interface ApoloGetAllDiscountsResponse {
  getAllDiscountCodes: Discount[];
}

