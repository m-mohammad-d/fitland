import Image from "next/image";
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex flex-col lg:flex-row">
      <div className="flex-1">{children}</div>

      <div className="lg:flex-1 hidden lg:block relative h-screen bg-secondary">
        <Image
          src="/images/authPageImage.png"
          alt="auth image"
          layout="fill"
          objectFit="cover"
        />

        <div className="absolute inset-0 bg-secondary-850 opacity-95"></div>

        <div className="absolute inset-0 flex flex-col justify-center items-center text-white">
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
