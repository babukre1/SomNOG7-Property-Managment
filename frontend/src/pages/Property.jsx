import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TableWithActions = () => {
  const [properties, setProperties] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const navigate = useNavigate();

  useEffect(() => {
    // const fetchProperties = async () => {
    //   try {
    //     const response = await axios.get("");
    //     console.log("Fetched Properties:", response.data);
    //     setProperties(response.data);
    //   } catch (error) {
    //     console.error("Error fetching properties:", error);
    //   }
    // };

    // fetchProperties();
  }, []);

  const handleAddNew = () => {
    navigate("/AddPropertyForm");
  };

  const handleEditClick = (property) => {
    navigate(`/EditPropertyForm/${property._id}`);
  };

  const handleDelete = async (id) => {
    if (!id) return;

    const isConfirmed = window.confirm(
      "Are you sure you want to delete this property?"
    );
    if (!isConfirmed) return;

    try {
      await axios.delete(`http://localhost:3000/api/property/${id}`);
      alert("Property deleted successfully");
      setProperties((prevProperties) =>
        prevProperties.filter((property) => property._id !== id)
      );
    } catch (error) {
      console.error("Error deleting property:", error);
      alert("Failed to delete the property.");
    }
  };

  // Filter properties based on search term
  const filteredProperties = properties.filter(
    (property) =>
      property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Property List</h2>
        <input
          type="text"
          placeholder="Search by name, location, type, or city"
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
              Image
            </th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Location
            </th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Square Footage
            </th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Bedrooms
            </th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              rent_type
            </th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Type
            </th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              City
            </th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredProperties.map((property) => (
            <tr key={property._id}>
              <td className="px-4 py-2">
                <img
                  src={property.image_url}
                  alt={`${property.name} cover`}
                  className="w-16 h-16 object-cover rounded"
                />
              </td>
              <td className="px-4 py-2">{property.name}</td>
              <td className="px-4 py-2">{property.location}</td>
              <td className="px-4 py-2">{property.square_footage}</td>
              <td className="px-4 py-2">{property.bedrooms}</td>
              <td className="px-4 py-2">{property.rent_type}</td>
              <td className="px-4 py-2">{property.type}</td>
              <td className="px-4 py-2">{property.city}</td>
              <td className="px-4 py-2">
                {property.isRented ? (
                  <span className="text-red-500">Rented</span>
                ) : (
                  <span className="text-green-500">Available</span>
                )}
              </td>
              <td className="px-4 py-2 flex gap-2">
                <button
                  className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition"
                  onClick={() => handleEditClick(property)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition"
                  onClick={() => handleDelete(property._id)}
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

export default TableWithActions;
