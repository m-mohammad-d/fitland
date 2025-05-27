"use client";

import { FiPlus } from "react-icons/fi";
import Button from "@/components/ui/Button";

interface ListHeaderProps {
  onCreateClick: () => void;
}

export default function ListHeader({ onCreateClick }: ListHeaderProps) {
  return (
    <div className="mb-8 flex items-center justify-between">
      <h1 className="text-2xl font-bold">فهرست محصولات</h1>
      <Button onClick={onCreateClick} icon={<FiPlus />} variant="fill" size="medium">
        ایجاد فهرست جدید
      </Button>
    </div>
  );
}
