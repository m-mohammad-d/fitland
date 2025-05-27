import Image from "next/image";
import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex flex-col lg:flex-row">
      <div className="flex-1">{children}</div>

      <div className="bg-secondary relative hidden h-screen lg:block lg:flex-1">
        <Image src="/images/authPageImage.webp" alt="auth image" layout="fill" objectFit="cover" />

        <div className="bg-secondary-850 absolute inset-0 opacity-95"></div>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <div className="mb-4">
            <Image src="/logo.svg" alt="Logo" width={150} height={150} />
          </div>
          <div>
            <Link href="/" className="text-xl font-semibold">
              برگشت به صفحه اصلی
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
