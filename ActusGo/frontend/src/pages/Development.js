import { useState } from "react";
import SuccessCompo from "../components/Popup/SuccessPopup";

export default function Development() {
    const [isSuccess, setSuccess] = useState(false);

    return (
        <div className="w-full h-full min-h-screen text-xl font-bold flex justify-center items-center text-center">
            <button onClick={() => setSuccess(true)}>Show Success</button>
            {isSuccess && <SuccessCompo onClose={() => {setSuccess(false)}} />}
        </div>
    )
}
