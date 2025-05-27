import AddCategoryForm from "@/components/dashboard/AddCategoryForm";

export default async function NewCategoryPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">افزودن دسته‌بندی جدید</h1>
          <p className="mt-2 text-sm text-gray-600">با استفاده از فرم زیر می‌توانید یک دسته‌بندی جدید ایجاد کنید.</p>
        </div>
      </div>

      <div className="rounded-lg p-6">
        <AddCategoryForm />
      </div>
    </div>
  );
}
