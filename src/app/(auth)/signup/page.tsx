import SignupForm from "@/components/auth/SignupForm";

function Signup() {
  return (
    <div className="relative flex h-screen items-center justify-center">
      <div className="absolute top-0 left-0">
        <img src="images/authBackgroundLeft.png" />
      </div>
      <div>
        <SignupForm />
      </div>
      <div className="absolute right-0 bottom-0">
        <img src="images/authBackgroundRight.png" />
      </div>
    </div>
  );
}

export default Signup;
