import SignupForm from "@/components/auth/SignupForm";

function Signup() {
  return (
    <div className="h-screen flex items-center justify-center relative">
      <div className="absolute top-0 left-0">
        <img src="images/authBackgroundLeft.png" />
      </div>
      <div>
        <SignupForm />
      </div>
      <div className="absolute bottom-0 right-0">
        <img src="images/authBackgroundRight.png" />
      </div>
    </div>
  );
}

export default Signup;
