import { React } from "react";
import img from "../Images//SuccessCompo.png"
export default function SuccessCompo() {
    return (
        <div className="success-compo-container w-[316px] h-[300px] bg-[#6E56FC] text-[#6E56FC] rounded-3xl shadow-lg m-5">
            <img
                src={img}
                alt=""
                className="w-full h-[85%]"
            />
            <div className="text-[#FFFFFF] flex justify-center mt-[2%] font-semibold">
                <p>
                Your Post Success
                </p>
            </div>
        </div>
    )
}