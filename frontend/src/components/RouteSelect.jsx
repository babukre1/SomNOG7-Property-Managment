import {NavLink} from "react-router-dom";
import{FiGrid,FiHome,FiUsers,FiUserCheck,FiLayers,FiFileText,FiClock}from"react-icons/fi";
import{getCurrentUser}from"../utils/util";
const links=[["/dashboard","Overview",FiGrid],["/property","Properties",FiHome],["/owners","Owners",FiUserCheck],["/property-types","Property types",FiLayers],["/reports","Reports",FiFileText],["/audit-logs","Audit history",FiClock]];
export default function RouteSelect(){const user=getCurrentUser()||{};const items=user.role==="admin"?[...links.slice(0,3),["/users","User access",FiUsers],...links.slice(3)]:links;return <nav className="nav-stack">{items.map(([to,label,Icon])=><NavLink key={to} to={to} className={({isActive})=>`nav-link ${isActive?"active":""}`}><Icon/><span>{label}</span></NavLink>)}</nav>}
