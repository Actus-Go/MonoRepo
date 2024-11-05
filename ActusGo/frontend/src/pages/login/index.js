import "./style.css";
import LoginForm from "../../components/login/LoginForm";
import RegisterForm from "../../components/login/RegisterForm";
import { useState } from "react";

export default function Login() {
  const [visible, setVisible] = useState(false);
  return (
    <div className=" bg-[#0c0c0c] text-white  overflow-auto h-screen w-full  ">
      <div className="  bg-[#0c0c0c] text-white ">
        <LoginForm setVisible={setVisible} />
        {visible && <RegisterForm setVisible={setVisible} />} 

      </div>
    </div>
  );
}
