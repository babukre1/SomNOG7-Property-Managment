export const getCurrentUser = () => {
    const user = JSON.parse(localStorage.getItem("user_info"));
    return user;  // Return user object (or null if not found)
  };