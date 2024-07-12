import { useState } from "react";
import "./style.css";
import axios from "axios";
export default function SendVerification({ user }) {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const sendVerificationLink = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/sendVerification`,
        {},
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setSuccess(data.message);
    } catch (error) {
      setError(error.response.data.message);
    }
  };
  return (
    <div className="send_verification mt-7 bg-[#6e56fc]  text-black font-bold">
      <span>
        Your account is not verified,verify your account before it gets deleted
        after a month from creating.
      </span>
      <button
        onClick={() => {
          sendVerificationLink();
        }}
        className="text-yellow-400 hover:opacity-80 duration-300"
      >
        click here to resend verification link
      </button>
      {success && <div className="success_text w-full justify-center flex m-auto">{success}</div>}
      {error && <div className="error_text w-full justify-center flex m-auto">{error}</div>}
    </div>
  );
}
