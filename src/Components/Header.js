/* eslint-disable jsx-a11y/anchor-is-valid */
// import React, { useContext } from 'react'
// import { NavLink } from 'react-router-dom'
// import './Header.css'
// import { InputContext } from '../Context/inputContext'

// const Header = () => {
//   const {theme,toggleTheme}= useContext(InputContext)

//   return (
//     <>
//     <div className={theme}>

//     <div className='topnav'>

//   <button className="active">
//     <NavLink to="/" >News app</NavLink>

//   </button>
//   <button className="active">
//     <NavLink to="/notes" >Note app</NavLink>

//   </button>
//   <button className="active">
//     <NavLink to="/weather" >Weather app</NavLink>

//   </button>

//     </div>

// <div >
// <button onClick={toggleTheme}
//            style={{
//                 backgroundColor: theme ? "black" : "white",
//                 color: theme ? "white" : "black",

//                 padding: "10px 20px",
//                 border: "1px solid gray",
//                 borderRadius: "5px",
//                 cursor: "pointer",
//             }}>
//             Switch to {theme === "light" ? "Dark" : "Light"} Mode
//         </button>
// </div>
// </div>
//     </>
//   )
// }

// export default Header

import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import logo from "../assets/image/logo.png";
import { MdDarkMode } from "react-icons/md";
// import { MdOutlineDarkMode } from "react-icons/md";
import { FaSun } from "react-icons/fa";

import React, { useContext } from "react";
import { InputContext } from "../Context/inputContext";
import profilelogo from "../assets/image/PROFILE.jpg";
import { Link } from "react-router-dom";

const navigation = [
  { name: "Projects", href: "/", current: true },
  { name: "News App", href: "/", current: false },
  { name: "Weather App", href: "/weather", current: false },
  { name: "Note App", href: "/notes", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Header = () => {
  const { theme, toggleTheme, handleInput, search, handleKeyPress } =
    useContext(InputContext);

  // enter to search value
  // const handleKeyPress = (e) => {
  //   if (e.key === "Enter") {
  //     getdata(search); // Trigger the submit function
  //   }
  // };

  return (
    <>
      <div className="relative flex h-16 justify-between items-center px-4 bg-slate-800 ">
        {/* Left Section: Logo and Navigation */}
        <div className="flex items-center space-x-4 " >
          {/* Logo */}
          <div className="topNavbar">
            <img alt="Your Company" src={logo} className="h-8 w-auto" />
          </div>

          {/* Navigation Links */}
          <div className="hidden sm:block">
            <div className="flex space-x-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  aria-current={item.current ? "page" : undefined}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "rounded-md px-3 py-2 text-sm font-medium"
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Right Section: Search Bar, Theme Icon, Profile */}
        <div className="flex items-center space-x-4 ">
          {/* Search Bar */}
          <div className="searchBar">
            <input
            className={theme}
              type="text"
              placeholder="Search News"
              onChange={handleInput}
              value={search}
              onKeyDown={handleKeyPress}
              style={{
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid #ccc",
                outline: "none",
                minWidth: "150px",
                // minHeight: "5px",
              }}
              // className="w-40 sm:w-64 rounded-md border border-gray-300 bg-gray-700 text-gray-200 px-3 py-1 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {/* <button
            // style={{ padding: "8px",
            //   borderRadius: "4px",
            //   border: "1px solid #ccc",
            //   outline: "none",}}
              onClick={() => getdata(search)}
              className="ml-2 px-3 py-1 rounded-md bg-blue-600 text-white text-sm hover:bg-blue-700 focus:outline-none"
            >
              Search
            </button> */}
          </div>

          {/* Theme Toggle */}
          <button
            type="button"
            className="p-2 rounded-full bg-gray-800 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
            onClick={toggleTheme}
          >
            {theme === "dark" ? <MdDarkMode size={24} /> : <FaSun size={24} />}
          </button>

          {/* Profile Dropdown */}
          <Menu as="div" className="relative">
            <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white">
              <img
                src={profilelogo}
                alt="Profile"
                className="h-8 w-8 rounded-full"
              />
            </MenuButton>
            <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none">
              <MenuItem>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Your Profile
                </a>
              </MenuItem>
              <MenuItem>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Settings
                </a>
              </MenuItem>
              <MenuItem>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Sign out
                </a>
              </MenuItem>
            </MenuItems>
          </Menu>
        </div>
      </div>
    </>
  );
};

export default Header;
