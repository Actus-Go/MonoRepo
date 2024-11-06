import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Map from "../../../icons/watch";
import { FaMoon, FaTimes } from 'react-icons/fa'; // Import your desired icons
import { PiGameControllerFill } from "react-icons/pi";
import { NavLink } from 'react-router-dom';
import { CgProfile } from "react-icons/cg";

// Ensure these are correctly imported from the specified path
import { Home, Market, Friends } from '../../../icons';
import { ChevronLeft, ChevronRight, Compass, BarChart2, Settings, HelpCircle, LogOut } from 'lucide-react';

const Sidebar = ({ isCollapsedProp, setCollapsedProp, user, page, getAllPosts }) => {
    const [isCollapsed, setIsCollapsed] = useState(isCollapsedProp);

    const [isPlayMode, setIsPlayMode] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);

    const handlePlayModeToggle = () => {
        setIsPlayMode(!isPlayMode);
    };

    const handleDarkModeToggle = () => {
        setIsDarkMode(!isDarkMode);
    };

    useEffect(() => {
        setIsCollapsed(isCollapsedProp)
    }, [isCollapsedProp])


    const toggleSidebar = () => {
        let new_value = !isCollapsed;
        setIsCollapsed(new_value);
        setCollapsedProp(new_value);
    };

    return (
        <div className={`bg-[#222222] relative z-50  text-gray-200 h-dvh ${isCollapsed ? 'w-[86px] md:translate-x-0 -translate-x-full' : 'w-[320px] md:translate-x-0'} transition-all duration-300 ease-in-out flex flex-col `}>
            {/* Burger Menu Icon for mobile screens */}
            <div className="text-white w-full flex shadow-2xl flex-col justify-between items-center gap-6">
                {/* Logo - Positioning based on `isCollapsed` */}
                <div className={`w-full pt-3 flex transition-all pl-3`}>
                    <Link to="/" className="header_logo transition-all">
                        <img
                            src="/actuswhite.svg"
                            className={`w-[64px] scale-150 ${isCollapsed ? 'mx-auto' : ''}`}
                            alt="Logo"
                        />
                    </Link>
                </div>

                {/* Profile Image - Hidden when collapsed */}
                    <Link
                        to="/profile"
                        className={`profile_link ${isCollapsed ? "h-0 opacity-0" : "h-28"} transition-all  ${page === 'profile' ? 'active_link bg-[#efff55] text-gray-900 w-[48px] rounded-full font-bold' : ''}`}
                    >
                        <div className="flex flex-col items-center">
                            <img src={user?.picture} alt="" className="w-16 h-16 bg-white rounded-full" />
                            <span className={`uppercase grid place-items-center w-full h-full ${page === 'profile' ? 'active_link bg-[#efff55] text-gray-900 font-bold' : ''}`}>
                                {user?.first_name ? user.first_name : "User Name"}
                            </span>
                        </div>
                    </Link>
            </div>


            <div className='w-full flex flex-col justify-between h-full z-10  overflow-y-auto'>
                {/* Navigation links */}
                <div className="flex-grow px-3 w-full">
                    {/* Home Link */}
                    <NavLink
                        to="/"
                        className={({ isActive }) => `flex items-center rounded-[34px] py-3 px-4 ${isActive ? 'bg-[#5d5b5b]' : ''}`}
                        onClick={() => getAllPosts()}
                    >
                        <Home color='#ddd' />
                        {!isCollapsed && <span className="ml-4 text-white">Home</span>}
                    </NavLink>

                    {/* Explore NavLink */}
                    <NavLink
                        to="/explore"
                        className={({ isActive }) => `flex items-center rounded-[34px] py-3 px-4 ${isActive ? 'bg-[#5d5b5b]' : ''}`}
                    >
                        <Compass size={24} />
                        {!isCollapsed && <span className="ml-4 text-white">Explore</span>}
                    </NavLink>

                    {/* Map Link */}
                    <NavLink
                        to="/tasks"
                        className={({ isActive }) => `flex items-center rounded-[34px] py-3 px-4 ${isActive ? 'bg-[#5d5b5b]' : ''}`}
                    >
                        <Map color='#ddd' />
                        {!isCollapsed && (
                            <>
                                <span className="ml-4 text-white">Map</span>
                                <div className="ml-auto bg-[#eaf953] text-black text-xs rounded-full px-2 py-1">999+</div>
                            </>
                        )}
                    </NavLink>
                    {/* Gaming Link */}
                    <NavLink
                        to="/profile"
                        className={({ isActive }) => `flex items-center rounded-[34px] py-3 px-4 ${isActive ? 'bg-[#5d5b5b]' : ''}`}
                    >
                        <CgProfile color='#ddd' size={24} />
                        {!isCollapsed && <span className="ml-4 text-white">Profile</span>}
                    </NavLink>

                    {/* Market Link */}
                    <NavLink
                        to="/market"
                        className={({ isActive }) => `flex items-center rounded-[34px] py-3 px-4 ${isActive ? 'bg-[#5d5b5b]' : ''}`}

                    >
                        <Market color='#ddd' />
                        {!isCollapsed && <span className="ml-4 text-white">Market</span>}
                    </NavLink>

                    {/* Friends NavLink */}
                    <NavLink
                        to="/friends"
                        className={({ isActive }) => `flex items-center rounded-[34px] py-3 px-4 ${isActive ? 'bg-[#5d5b5b]' : ''}`}

                    >
                        <Friends color='#ddd' />
                        {!isCollapsed && <span className="ml-4 text-white">Friends</span>}
                    </NavLink>

                    {/* Analysis NavLink */}
                    <div className="relative  cursor-not-allowed  flex items-center">
                        {/* Analysis Link (Disabled) */}
                        <NavLink
                            to="/analysis"
                            className={({ isActive }) =>
                                `flex items-center pointer-events-none rounded-[34px] py-3 px-4 ${isActive ? 'bg-[#5d5b5b]' : ' '}`
                            }
                            onClick={(e) => e.preventDefault()} // Prevent link from being clickable
                        >
                            <BarChart2 size={24} />
                            {!isCollapsed && <span className="ml-4 text-white">Analysis</span>}
                        </NavLink>

                        {/* "Coming Soon" Label to the Right */}
                        {!isCollapsed &&
                            <span className="ml-4 bg-[#eaf953] text-black text-xs rounded-full px-3 py-1">
                                Coming Soon
                            </span>}
                    </div>


                    {/* Settings NavLink */}
                    <div className="relative  cursor-not-allowed  flex items-center">
                        {/* Analysis Link (Disabled) */}
                        <NavLink
                            to="/settings"
                            className={({ isActive }) =>
                                `flex items-center pointer-events-none rounded-[34px] py-3 px-4 py-2 ${isActive ? 'bg-[#5d5b5b]' : ' '}`
                            }
                            onClick={(e) => e.preventDefault()} // Prevent link from being clickable
                        >
                            <Settings size={24} />
                            {!isCollapsed && <span className="ml-4 text-white">Settings</span>}
                        </NavLink>

                        {/* "Coming Soon" Label to the Right */}
                        {!isCollapsed &&
                            <span className="ml-4 bg-[#eaf953] text-black text-xs rounded-full px-3 py-1">
                                Coming Soon
                            </span>}
                    </div>

                    {/* Toggle Switches and Footer NavLinks */}
                    <div className={`mt-[40px] px-4 py-2 w-full transition-all ${isCollapsed && "hidden"}`}>
                        <div className="flex items-center justify-between w-full px-4 text-white py-2">
                            {/* Label to wrap everything */}
                            <label htmlFor="playMode" className="flex items-center justify-between w-full cursor-pointer">
                                {/* Left Side: Icon and Text */}
                                <div className="flex items-center">
                                    {/* Conditionally change the icon color based on isPlayMode */}
                                    <PiGameControllerFill size={24} color={isPlayMode ? '#7047eb' : 'white'} />
                                    {!isCollapsed && <span className="ml-3">Play mode</span>}
                                </div>

                                {/* Right Side: Switch (only show when not collapsed) */}
                                {!isCollapsed && (
                                    <div className="relative">
                                        <div className={`w-10 h-6 rounded-full shadow-inner ${isPlayMode ? 'bg-[#7047eb]' : 'bg-gray-400'}`}></div>
                                        <div className={`dot absolute w-4 h-4 bg-white rounded-full shadow left-1 top-1 transition ${isPlayMode ? 'translate-x-4' : ''}`}></div>
                                    </div>
                                )}

                                {/* Hidden Checkbox */}
                                <input type="checkbox" id="playMode" className="hidden" checked={isPlayMode} onChange={handlePlayModeToggle} />
                            </label>
                        </div>

                        <div className="relative">
                            {/* Wrapper for Dark Mode Toggle */}
                            <div className="flex items-center justify-between opacity-10 px-4 text-white py-2">
                                {/* Label to wrap everything */}
                                <label htmlFor="darkMode" className="flex items-center justify-between w-full cursor-pointer">
                                    {/* Left Side: Icon and Text */}
                                    <div className="flex items-center">
                                        {/* Conditionally change the icon color based on isDarkMode */}
                                        <FaMoon size={24} color={isDarkMode ? '#7047eb' : 'white'} />
                                        {!isCollapsed && <span className="ml-3">Dark mode</span>}
                                    </div>

                                    {/* Right Side: Switch (only show when not collapsed) */}
                                    {!isCollapsed && (
                                        <div className="relative">
                                            <div className={`w-10 h-6 rounded-full shadow-inner ${isDarkMode ? 'bg-[#7047eb]' : 'bg-gray-400'}`}></div>
                                            <div className={`dot absolute w-4 h-4 bg-white rounded-full shadow left-1 top-1 transition ${isDarkMode ? 'translate-x-4' : ''}`}></div>
                                        </div>
                                    )}

                                    {/* Hidden Checkbox */}
                                    <input type="checkbox" id="darkMode" className="hidden" checked={isDarkMode} onChange={handleDarkModeToggle} />
                                </label>
                            </div>

                            {/* Coming Soon Overlay */}
                            <div className={`absolute inset-0 ${isCollapsed ? 'text-sm' : ''}  text-sm bg-opacity-80 text-white text-center flex items-center justify-center rounded transition-opacity duration-300 opacity-100`}>
                                Coming Soon
                            </div>
                        </div>

                        <div className="relative">
                            <Link to="/help" className="flex opacity-10 items-center rounded-[34px] px-4 text-white py-2 ">
                                <HelpCircle size={28} />
                                {!isCollapsed && <span className="ml-4 text-white">Help Center</span>}
                            </Link>
                            <div className={`absolute inset-0 ${isCollapsed ? 'text-sm' : ''}  text-sm bg-opacity-80 text-white text-center flex items-center justify-center rounded transition-opacity duration-300 opacity-100`}>
                                Coming Soon
                            </div>
                        </div>

                        <Link to="/logout" className="flex items-center px-4 text-red-500 py-2 ">
                            <LogOut size={28} />
                            {!isCollapsed && <span className="ml-4 text-red-500">Log out</span>}
                        </Link>
                    </div>
                </div>

                {/* Sidebar Toggle Button */}
                <button
                    onClick={toggleSidebar}
                    className="absolute top-[22px] -right-[28px] text-white bg-[#5d5b5b] hidden md:block  rounded-tr-xl rounded-br-xl  p-1 shadow-lg"
                >
                    {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
                </button>
                <button
                    onClick={toggleSidebar}
                    className="absolute top-[22px] right-[28px] text-white block md:hidden  rounded-tr-xl rounded-br-xl  p-1 shadow-lg"
                >
                    <FaTimes size={24} />
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
