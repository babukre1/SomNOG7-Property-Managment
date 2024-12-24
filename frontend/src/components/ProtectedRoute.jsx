import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getCurrentUser } from "../utils/util"; // Import the utility function

const ProtectedRoute = () => {
  const user = getCurrentUser();

  // If the user is not found in localStorage (i.e., user is not logged in), redirect to login page
  if (!user) {
    return <Navigate to="/login" />;
  }

  return <Outlet />; // Render the child route
};

export default ProtectedRoute;
