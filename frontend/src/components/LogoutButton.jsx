import React from "react";
import { useNavigate } from "react-router-dom";

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user session (e.g., remove token from localStorage or cookies)
    localStorage.removeItem("user_info"); // Replace with your token key
    // Navigate to the login page or another appropriate page
    navigate("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2  text-gray-800 font-semibold rounded-md border-red-600"
    >
      Logout
    </button>
  );
}

export default LogoutButton;
