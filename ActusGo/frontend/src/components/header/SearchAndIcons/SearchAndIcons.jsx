import "../style.css";
import { useEffect } from 'react';
import { IoNotifications } from "react-icons/io5";
import { Link } from 'react-router-dom';

import {
    Search,
    Friends,
} from "../../../icons";
import SearchMenu from "../SearchMenu";

export default function SearchAndIcon({ color, showSearchMenu, setShowSearchMenu, token, toggleNotificationBarOpen }) {

    useEffect(() => {
        console.log("Props: ", { color, showSearchMenu, token });
    }, [showSearchMenu, color, token]);

    return (
        <div className="flex px-4 md:w-full w-fit md:justify-between">
            <div className="searchCom hidden md:block  w-[70%]">
                <div
                    className="search search1 bg-[#211f1f] backdrop-blur-lg  opacity-[.8]"
                    onClick={() => {
                        setShowSearchMenu(true);
                    }}
                >
                    <Search color={color} />
                    <input
                        type="text"
                        placeholder="Search on actus..."
                        className="hide_input "
                    />
                </div>
                {showSearchMenu && (
                    <SearchMenu
                        color={color}
                        setShowSearchMenu={setShowSearchMenu}
                        token={token}
                    />
                )}
            </div>

            <div className="rightIcons flex gap-10">
                <div className="cursor-pointer">
                    <button onClick={toggleNotificationBarOpen}>
                        <IoNotifications size={25} color={color} />
                    </button>
                </div>
                <div className="cursor-pointer">
                    <Link
                        to="/friends">
                        <Friends size={25} color={color} />
                    </Link>
                </div>
            </div>
        </div>
    )

}