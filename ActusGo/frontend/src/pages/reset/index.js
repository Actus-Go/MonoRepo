import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { useState } from "react";
import SearchAccount from "./SearchAccount";
import SendEmail from "./SendEmail";
import CodeVerification from "./CodeVerification";
import ChangePassword from "./ChangePassword";
export default function Reset() {
    const { user } = useSelector((state) => ({ ...state }));
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [visible, setVisible] = useState(0);
    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");
    const [password, setPassword] = useState("");
    const [conf_password, setConf_password] = useState("");
    const [error, setError] = useState("");
    const [userInfos, setUserInfos] = useState("");
    const logout = () => {
        Cookies.set("user", "");
        dispatch({
            type: "LOGOUT",
        });
        navigate("/login");
    };
    console.log(userInfos);
    return (
        <div className="reset overflow-hidden no-scrollbar">
            <div className="reset_header bg-black/40">
                <img
                    src={"/actusfullwhite.svg"}
                    className="h-[75px] w-40"
                    alt=""
                />
                {user ? (
                    <div className="right_reset">
                        <button
                            className="blue_btn"
                            onClick={() => {
                                logout();
                            }}
                        >
                            Logout
                        </button>
                    </div>
                ) : (
                    <Link to="/login" className="right_reset">
                        <button className="blue_btn">Login</button>
                    </Link>
                )}
            </div>

            <div className="h-dvh w-screen  relative no-scrollbar   ">
                <div className="reset_wrap  z-20 top-0 left-0 right-0 bottom-0 grid place-items-center absolute">
                    {visible === 0 && (
                        <SearchAccount
                            email={email}
                            setEmail={setEmail}
                            error={error}
                            setError={setError}
                            setUserInfos={setUserInfos}
                            setVisible={setVisible}
                        />
                    )}
                    {visible === 1 && userInfos && (
                        <SendEmail
                            email={email}
                            userInfos={userInfos}
                            error={error}
                            setError={setError}
                            setUserInfos={setUserInfos}
                            setVisible={setVisible}
                        />
                    )}
                    {visible === 2 && (
                        <CodeVerification
                            user={user}
                            code={code}
                            setCode={setCode}
                            error={error}
                            setError={setError}
                            setVisible={setVisible}
                            userInfos={userInfos}
                        />
                    )}
                    {visible === 3 && (
                        <ChangePassword
                            password={password}
                            conf_password={conf_password}
                            setConf_password={setConf_password}
                            setPassword={setPassword}
                            error={error}
                            setError={setError}
                            setVisible={setVisible}
                            userInfos={userInfos}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
