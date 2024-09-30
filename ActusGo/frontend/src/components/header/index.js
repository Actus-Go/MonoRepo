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
import SearchAndIcon from "./SearchAndIcons/SearchAndIcons";


export default function Header({isCollapsed, page, getAllPosts }) {
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
      <header className={`text-gray-200 transition-all duration-300 w-fit ${!isCollapsed ? "md:w-[calc(100%-350px)]" : "md:w-[calc(100%-150px)]"}`}>
        <SearchAndIcon
          color={color}
          showSearchMenu={showSearchMenu}
          setShowSearchMenu={setShowSearchMenu}
          token={user.token}
        />
      </header>
    </>
  );
}
