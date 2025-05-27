import AddDiscountForm from "@/components/dashboard/AddDiscountForm";

export default async function NewDiscountPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">افزودن کد تخفیف جدید</h1>
      </div>

      <AddDiscountForm />
    </div>
  );
}
