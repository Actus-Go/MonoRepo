import "./style.css";
import { useSelector } from "react-redux";
import { useState } from "react";
import SearchAndIcon from "./SearchAndIcons/SearchAndIcons";


export default function Header({ isCollapsed, toggleNotificationBarOpen }) {
  const { user } = useSelector((user) => ({ ...user }));
  const color = "#efff55";
  const [showSearchMenu, setShowSearchMenu] = useState(false);

  return (
    <>
      {/* Show header section for desktop view */}
      <header className={`text-gray-200 transition-all duration-300 w-fit ${!isCollapsed ? "md:w-[calc(100%-350px)]" : "md:w-[calc(100%-150px)]"}`}>
        <SearchAndIcon
          color={color}
          showSearchMenu={showSearchMenu}
          setShowSearchMenu={setShowSearchMenu}
          token={user?.token}
          toggleNotificationBarOpen={toggleNotificationBarOpen}
        />
      </header>
    </>
  );
}
