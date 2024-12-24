import React from "react";
import { FaHome, FaBuilding, FaUsers, FaUser } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { getCurrentUser } from "../utils/util";

const RouteSelect = () => {
  const user = getCurrentUser();

  const location = useLocation();

  return (
    <div className="space-y-1">
      {/* Sidebar Buttons */}
      <SidebarButton
        selected={location.pathname === "/dashboard"}
        Icon={FaHome}
        title="Dashboard"
        path="/dashboard"
      />
      <SidebarButton
        selected={location.pathname === "/property"}
        Icon={FaBuilding}
        title="Properties"
        path="/property"
      />
      {user.role === "admin" && (
        <SidebarButton
          selected={location.pathname === "/users"}
          Icon={FaUser}
          title="Users"
          path="/users"
        />
      )}
      <SidebarButton
        selected={location.pathname === "/owners"}
        Icon={FaUsers}
        title="Owners"
        path="/owners"
      />

      {/* <SidebarButton selected={location.pathname === "/maintenace"} Icon={FaToolbox} title="Maintenance" path="/maintenace" />
      <SidebarButton selected={location.pathname === "/contractor"} Icon={FaEnvelope} title="Contractor" path="/contractor" /> */}
    </div>
  );
};

// Custom Button Component for Sidebar Navigation
const SidebarButton = ({ selected, Icon, title, path }) => {
  return (
    <Link to={path} className="w-full">
      <button
        className={`flex items-center justify-start gap-3 w-full rounded-lg px-3 py-2 text-sm font-medium transition-[background-color,_color] ${
          selected
            ? "bg-white text-stone-950 shadow-md"
            : "hover:bg-stone-200 bg-transparent text-stone-600"
        }`}
      >
        <Icon
          className={`${
            selected ? "text-violet-500" : "text-stone-500"
          } text-lg`}
        />
        <span className={`${selected ? "text-stone-900" : "text-stone-600"}`}>
          {title}
        </span>
      </button>
    </Link>
  );
};

export default RouteSelect;
