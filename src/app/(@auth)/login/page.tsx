import LoginForm from "@/components/auth/LoginForm";

function Login() {
  return (
    <div className="h-screen flex items-center justify-center relative">
      <div className="absolute top-0 left-0">
        <img src="images/authBackgroundLeft.png" />
      </div>
      <div>
        <LoginForm />
      </div>
      <div className="absolute bottom-0 right-0">
        <img src="images/authBackgroundRight.png" />
      </div>
    </div>
  );
}

export default Login;
