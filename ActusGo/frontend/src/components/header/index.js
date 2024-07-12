import "./style.css";
import { Link } from "react-router-dom";
import {
  ArrowDown,
  Friends,
  FriendsActive,
  Gaming,
  Home,
  HomeActive,
  Market,
  Search,
} from "../../svg";
import { useSelector } from "react-redux";
import SearchMenu from "./SearchMenu";
import { useRef, useState } from "react";
import useClickOutside from "../../helpers/clickOutside";
import UserMenu from "./userMenu";
import Map from "../../svg/watch";


export default function Header({ page, getAllPosts }) {
  const { user } = useSelector((user) => ({ ...user }));
  const color = "#efff55";
  const [showSearchMenu, setShowSearchMenu] = useState(false);
  const [showAllMenu, setShowAllMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const allmenu = useRef(null);
  const usermenu = useRef(null);
  useClickOutside(allmenu, () => {
    setShowAllMenu(false);
  });
  useClickOutside(usermenu, () => {
    setShowUserMenu(false);
  });

  return (
    <>
      {/* Show header section for desktop view */}
      <header className="desktop-header h-[75px] bg-[#101010]/70 backdrop-blur-lg  text-gray-200">
        <div className="header_left">
          <Link to="/" className="header_logo">
            {/* Add your logo here */}
            <img src="/actuswhite.svg"  className="h-12 w-12 scale-150" alt="Logo" />
          </Link>
          <div
            className="search search1 bg-[#211f1f]"
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
        </div>
        {showSearchMenu && (
          <SearchMenu
            color={color}
            setShowSearchMenu={setShowSearchMenu}
            token={user.token}
          />
        )}
        <div className="header_middle flex">
          <Link
            to="/"
            className={`middle_icon ${
              page === "home" ? "active" : "hover1"
            }`}
            onClick={() => getAllPosts()}
          >
            {page === "home" ? <HomeActive /> : <Home color={color} />}
          </Link>
          <Link to="/" className="middle_icon hover1 ">
            <Gaming color={color} />
          </Link>

          <Link
            to="/tasks"
            className={` middle_icon ${
              page === "tasks" ? "active" : "hover1"
            }`}
          >
            <Map color={color} />
            <div className="middle_notification">9+</div>
          </Link>
          <Link to="/" className="middle_icon hover1">
            <Market color={color} />
          </Link>

          <Link
            to="/friends"
            className={`middle_icon ${
              page === "friends" ? "active" : "hover1"
            }`}
          >
            {page === "friends" ? (
              <FriendsActive />
            ) : (
              <Friends color={color} />
            )}
          </Link>
        </div>
        <div className="header_right ">
          <Link
            to="/profile"
            className={`profile_link hover1  ${
              page === "profile" ? "active_link bg-[#efff55] text-gray-900 font-bold" : ""
            }`}
          >
            <img src={user?.picture} alt="" />
            <span className={`${" uppercase grid place-items-center w-full h-full"}     ${
              page === "profile" ? "active_link bg-[#efff55] text-gray-900 font-bold" : ""}`}>{user?.first_name}</span>
          </Link>

        
       
          <div
            className={`circle_icon hover1 ${showUserMenu && "active_header"}`}
            ref={usermenu}
          >
            <div
              onClick={() => {
                setShowUserMenu((prev) => !prev);
              }}
            >
              <div style={{ transform: "translateY(2px)" }}>
                <ArrowDown  
                  color={color}
                />
              </div>
            </div>

            {showUserMenu && <UserMenu user={user} />}
          </div>
        </div>
      </header>

      {/* Show simple bar with text logo for mobile screens */}
      <header className="text-white sm:hidden bg-[#0c0c0c] w-full
      h-[75px] flex justify-center items-center
      ">
      
  
      <img src="/actusfullwhite.svg"  className="h-24 w-24" alt="Logo" />

         
      
      </header>
    </>
  );
}
