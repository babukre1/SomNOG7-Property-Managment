import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import SidebarLayout from "./components/SidebarLayout";
import TableWithActions from "./pages/Property";
import AddUser from "./pages/addUser";
import AddPropertyForm from "./components/AddPropertyForm";
import EditPropertyForm from "./components/EditPropertyForm";
import ProtectedRoute from "./components/ProtectedRoute";
import { Users } from "./pages/Users";
import Owner from "./pages/Owner";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<SidebarLayout />}>
        <Route path="/" element={<Navigate to="/dashboard" />} />

          <Route path="/dashboard" element={<Home />} />
          <Route path="/property" element={<TableWithActions />} />
          <Route path="/addPropertyForm" element={<AddPropertyForm />} />
          <Route path="/EditPropertyForm/:id" element={<EditPropertyForm />} />
          <Route path="/addUser" element={<AddUser />} />
          <Route path="/users" element={<Users />} />
          <Route path="/owners" element={<Owner />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
