import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Users = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3004/api/user/getAllusers"
        );
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const handleAddNew = () => {
    navigate("/addUser");
  };

  const handleEditClick = (user) => {
    navigate(`/editUser/${user._id}`);
  };

  const handleDelete = async (id) => {
    if (!id) return;

    const isConfirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!isConfirmed) return;

    try {
      await axios.delete(`http://localhost:3004/api/user/deleteUser/${id}`);
      alert("User deleted successfully");
      setUsers((prevUsers) => prevUsers.filter((_user) => _user._id !== id));
    } catch (error) {
      console.error(error);
      alert("Failed to delete the user.");
    }
  };
  const filteredUsers = users.filter((user) => {
    if (!user) return false; // Skip if user is undefined or null

    const name = user.name ? user.name.toLowerCase() : ""; // Safely handle undefined
    const email = user.email ? user.email.toLowerCase() : ""; // Safely handle undefined
    const role = user.role ? user.role.toLowerCase() : ""; // Safely handle undefined

    return (
      name.includes(searchTerm.toLowerCase()) ||
      email.includes(searchTerm.toLowerCase()) ||
      role.includes(searchTerm.toLowerCase())
    );
  });
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">User List</h2>
        <input
          type="text"
          placeholder="Search by name, email, or role"
          className="border px-4 py-2 rounded-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          onClick={handleAddNew}
        >
          Add New
        </button>
      </div>

      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Full Name
            </th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Created At
            </th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Role
            </th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredUsers.map((user) => (
            <tr key={user._id}>
              <td className="px-4 py-2">{user.name}</td>
              <td className="px-4 py-2">{user.email}</td>
              <td className="px-4 py-2">{user.createdAt}</td>
              <td className="px-4 py-2">{user.role}</td>
              <td className="px-4 py-2 flex gap-2">
                <button
                  className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition"
                  onClick={() => handleEditClick(user)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition"
                  onClick={() => handleDelete(user._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
