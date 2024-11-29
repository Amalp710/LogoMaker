import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { PiSelectionBackgroundBold } from "react-icons/pi";
import { BiText } from "react-icons/bi";

const SideNav = ({ selectedId }) => {
  const [active, setActive] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const iconMenuList = [
    {
      id: 1,
      name: "Icon",
      icon: <FaEdit />,
    },
    {
      id: 2,
      name: "Background",
      icon: <PiSelectionBackgroundBold />,
    },
    {
      id: 3,
      name: "Text",
      icon: <BiText />,
    },
  ];

  return (
    <div>
      {/* Sidebar toggle button for smaller screens */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-cyan-700 text-white rounded-full shadow-md"
      >
        {isMenuOpen ? "*" : "="}
      </button>

      {/* Sidebar content */}
      <div
        className={`${
          isMenuOpen ? "translate-x-0" : "-translate-x-0"
        } lg:translate-x-0 transition-transform duration-300 ease-in-out fixed lg:static top-0 left-0 z-40 w-64 h-screen bg-white shadow-md border`}
      >
        <ul className="h-full">
          {iconMenuList.map(({ id, name, icon }) => (
            <li
              key={id}
              onClick={() => {
                setActive(id);
                selectedId(id);
                if (isMenuOpen) setIsMenuOpen(false); // Close menu after selection on small screens
              }}
              className={`flex items-center space-x-4 pl-4 py-2 pr-5 cursor-pointer hover:bg-[#8fb0a1] hover:text-white ${
                active === id && "bg-[#8fb0a1] text-white"
              }`}
            >
              <a className="flex items-center space-x-4" href="#">
                {icon} <span>{name}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SideNav;
