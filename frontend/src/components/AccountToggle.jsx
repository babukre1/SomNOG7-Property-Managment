import React, { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const AccountToggle = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);
  const user = sessionStorage.getItem("user_info");

  console.log(user);

  return (
    <div className="border-b mb-4 mt-2 pb-4 border-stone-300">
      <button
        onClick={toggleOpen}
        className="flex p-0.5 hover:bg-stone-200 rounded transition-colors relative gap-2 w-full items-center"
      >
        <img
          src="https://api.dicebear.com/9.x/notionists/svg"
          alt="avatar"
          className="w-8 h-8 rounded-full shrink-0 bg-violet-500 shadow"
        />
        <div className="text-start">
          <span className="text-sm font-bold block">PMS</span>
          <span className="text-xs block text-stone-500"></span>
        </div>

        {/* Conditionally render the icons based on `isOpen` state */}
        {isOpen ? (
          <FiChevronUp className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs" />
        ) : (
          <FiChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs" />
        )}
      </button>
      {isOpen && (
        <div className="mt-2 p-2 bg-stone-100 rounded">
          {/* Additional content can be added here when the toggle is open */}
          <p className="text-xs text-stone-700">
            Account settings, profile, etc.
          </p>
        </div>
      )}
    </div>
  );
};

export default AccountToggle;
