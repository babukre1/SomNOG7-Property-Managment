import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
// import Login from "./pages/Login";
import Login from "./pages/login";
import Home from "./pages/Home";
import SidebarLayout from "./components/SidebarLayout";
import TableWithActions from "./pages/property";
import AddPropertyForm from "./components/AddPropertyForm";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Routes>
      <Route element={<SidebarLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Home />} />
        <Route path="/property" element={<TableWithActions />} />
        <Route path="/addPropertyForm" element={<AddPropertyForm />} />
      </Route>
    </Routes>
  );
}

export default App;
