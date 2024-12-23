import React from "react";

import RouteSelect from "./RouteSelect";
import AccountToggle from "./AccountToggle";

const Sidebar = () => {
  return (
    <div className="h-screen bg-stone-100 p-4">
      <div className="overflow-y-auto sticky top-4 h-[calc(100vh-32px-48px)] rounded-lg shadow-inner p-2">
        <AccountToggle />
        <RouteSelect />
      </div>
    </div>
  );
};
export default Sidebar;