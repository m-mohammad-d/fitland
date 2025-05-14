import SignupForm from "@/components/auth/SignupForm";
import Image from "next/image";

function Signup() {
  return (
    <div className="relative flex h-screen items-center justify-center overflow-hidden">
      <div className="absolute top-0 left-0">
        <Image src="/images/authBackgroundLeft.png" alt="Auth background left" width={300} height={300} priority />
      </div>

      <div className="z-10">
        <SignupForm />
      </div>

      <div className="absolute right-0 bottom-0">
        <Image src="/images/authBackgroundRight.png" alt="Auth background right" width={300} height={300} priority />
      </div>
    </div>
  );
}

export default Signup;
