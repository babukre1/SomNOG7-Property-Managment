import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

function SidebarLayout() {
    return (
        <div className="grid gap-4 p-4 grid-cols-[220px,_1fr] w-full">
            <Sidebar/>
            <Outlet /> {/* Renders child routes like AddPropertyForm, Property, etc. */}
        </div>
    );
}

export default SidebarLayout;