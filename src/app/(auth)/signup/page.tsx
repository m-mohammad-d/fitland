import SignupForm from "@/components/auth/SignupForm";
import Image from "next/image";
import { Metadata } from "next/types";
export const metadata: Metadata = {
  title: "ثبت‌نام در فیت‌لند",
  description: "با ساخت حساب کاربری، تجربه‌ای بهتر از خرید آنلاین داشته باشید.",
  openGraph: {
    title: "ثبت‌نام | FitLand",
    description: "همین حالا ثبت‌نام کنید و به خانواده فیت‌لند بپیوندید!",
  },
  twitter: {
    title: "ثبت‌نام در فیت‌لند",
    description: "ثبت‌نام سریع و آسان در فروشگاه لباس ورزشی فیت‌لند.",
  },
};
function Signup() {
  return (
    <div className="relative flex h-screen items-center justify-center overflow-hidden">
      <div className="absolute top-0 left-0">
        <Image src="/images/authBackgroundLeft.webp" alt="Auth background left" width={300} height={300} priority />
      </div>

      <div className="z-10">
        <SignupForm />
      </div>

      <div className="absolute right-0 bottom-0">
        <Image src="/images/authBackgroundRight.webp" alt="Auth background right" width={300} height={300} priority />
      </div>
    </div>
  );
}

export default Signup;
