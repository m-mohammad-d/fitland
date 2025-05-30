import Link from 'next/link';

export default function ForbiddenPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-red-600 mb-4">403</h1>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">دسترسی غیرمجاز</h2>
          <p className="text-gray-600 mb-8">
            متأسفانه شما دسترسی لازم برای مشاهده این صفحه را ندارید.
          </p>
          <div className="space-y-4">
            <Link 
              href="/"
              className="block w-full py-3 px-4 bg-primary hover:bg-primary-600 text-white font-medium rounded-lg text-center transition duration-200"
            >
              بازگشت به صفحه اصلی
            </Link>
            <Link 
              href="/login"
              className="block w-full py-3 px-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-lg text-center transition duration-200"
            >
              ورود به سیستم
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 