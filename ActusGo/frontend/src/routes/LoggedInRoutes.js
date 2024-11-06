import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Login from "../pages/login";
import AsideNav from '../components/header/ASideNav/AsideNav.jsx'
import Header from "../components/header";
import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { generateDemoNotifications } from '../components/Notifications/notificationData.js';
import NotificationBar from '../components/Notifications/NotificationBar.jsx';

export default function LoggedInRoutes() {
  const { user } = useSelector((state) => ({ ...state }));
  const [isCollapsed, setCollapsed] = useState(false);
  const [isNotificationBarOpen, setNotificationBarOpen] = useState(false);

  const demoNotifications = generateDemoNotifications(30);

  let toggleNotificationBarOpen = () => {
      setNotificationBarOpen(!isNotificationBarOpen);
  };


  return user ? (<div className="!h-dvh overflow-y-auto w-full">
      <div className="flex justify-evenly text-start flex-col md:flex-row items-start">
        <NotificationBar
        isOpen={isNotificationBarOpen}
        onClose={() => setNotificationBarOpen(false)}
        notifications={demoNotifications}
        />
    </div>

    <div className="fixed left-0 top-0 z-[400]">
      <AsideNav
        isCollapsedProp={isCollapsed}
        setCollapsedProp={setCollapsed}
        user={user} />
      <div className="flex pl-5 py-2 bg-[#222] md:bg-transparent items-center justify-between md:justify-end fixed top-0 left-0 h-fit w-full">
        <div className=" text-white md:hidden w-fit h-fit aspect-square">
          <button className='text-white w-min aspect-square inline-block' onClick={() => setCollapsed(false)}>
            <FaBars size={25} />
          </button>

        </div>
        <div className={`w-full md:hidden flex justify-center`}>
          <Link to="/" className="header_logo">
            <img
              src="/actuswhite.svg"
              className={`max-w-[50px] translate-x-1/2 w-[50px] scale-150 `}
              alt="Logo"
            />
          </Link>
        </div>
        <Header isCollapsed={isCollapsed} toggleNotificationBarOpen={toggleNotificationBarOpen} />
      </div>
    </div>
    <Outlet />
  </div>) : <Login />;
}
