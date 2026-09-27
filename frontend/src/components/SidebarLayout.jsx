import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { getCurrentUser } from "../utils/util";
export default function SidebarLayout(){const user=getCurrentUser()||{name:"Registry officer",role:"user"};const date=new Intl.DateTimeFormat("en-US",{weekday:"long",month:"long",day:"numeric",year:"numeric"}).format(new Date());return <div className="app-shell"><Sidebar user={user}/><div className="main-panel"><header className="top-header"><div><p className="eyebrow">{date}</p><h1>Property Registration Service</h1></div><span className="status-live">● System operational</span></header><main className="content-wrap"><Outlet/></main></div></div>}
