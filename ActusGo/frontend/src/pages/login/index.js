import "./style.css";
import LoginForm from "../../components/login/LoginForm";
import RegisterForm from "../../components/login/RegisterForm";
import { useState } from "react";

export default function Login() {
  const [visible, setVisible] = useState(false);
  return (
    <div className="login bg-[#0c0c0c] text-white h-dvh w-full   grid place-items-center ">
      <div className="login_wrapper grid bg-[#0c0c0c] text-white place-items-center  h-full w-full">
        <LoginForm setVisible={setVisible} />
        {visible && <RegisterForm setVisible={setVisible} />}

      </div>
    </div>
  );
}
