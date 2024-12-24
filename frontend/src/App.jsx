import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
// import Login from "./pages/Login";
import Login from "./pages/login";
import Home from "./pages/Home";
import SidebarLayout from "./components/SidebarLayout";
import TableWithActions from "./pages/property";
import AddUser from "./pages/addUser";
import AddPropertyForm from "./components/AddPropertyForm";
import EditPropertyForm from "./components/EditPropertyForm";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<SidebarLayout />}>
          <Route path="/dashboard" element={<Home />} />
          <Route path="/property" element={<TableWithActions />} />
          <Route path="/addPropertyForm" element={<AddPropertyForm />} />
          <Route path="/EditPropertyForm/:id" element={<EditPropertyForm />} />
          <Route path="/addUser" element={<AddUser />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
