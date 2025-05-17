import LoginForm from "@/components/auth/LoginForm";
import Image from "next/image";
import { Metadata } from "next/types";
export const metadata: Metadata = {
  title: "ورود به فیت‌لند",
  description: "برای مشاهده سفارشات و خرید راحت‌تر، وارد حساب کاربری خود شوید.",
  openGraph: {
    title: "ورود به فیت‌لند | FitLand",
    description: "با ورود به حساب، از امکانات بیشتری در فروشگاه فیت‌لند بهره‌مند شوید.",
  },
  twitter: {
    title: "ورود به فیت‌لند",
    description: "وارد حساب خود شوید و خرید خود را ساده‌تر کنید.",
  },
};
function Login() {
  return (
    <div className="relative flex h-screen items-center justify-center overflow-hidden">
      <div className="absolute top-0 left-0">
        <Image src="/images/authBackgroundLeft.png" alt="Auth background left" width={300} height={300} priority />
      </div>

      <div className="z-10">
        <LoginForm />
      </div>

      <div className="absolute right-0 bottom-0">
        <Image src="/images/authBackgroundRight.png" alt="Auth background right" width={300} height={300} priority />
      </div>
    </div>
  );
}

export default Login;
