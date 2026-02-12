import loginBg from "../assets/image/loginBg.png"
import LoginForm from "../components/login/LoginForm";

export default function Login() {
  return (
    <>
      <div className="w-screen min-h-screen overflow-hidden relative">
        <img src={loginBg} className="absolute w-full h-full object-cover" />
        <div className="absolute z-10 w-full h-full flex items-center justify-center sm:justify-center md:justify-end md:pr-20 lg:pr-32 xl:pr-40 px-4">
          <LoginForm />
        </div>
      </div>
    </>
  );
}
