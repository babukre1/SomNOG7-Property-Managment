import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function AddPropertyForm() {
  const [formData, setFormData] = useState({
    propertyName: "",
    address: "",
    size: "",
    propertyType: "Residential",
    owner: "", // Added owner field
  });
  const [owners, setOwners] = useState([]); // State to store owners
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch owners from the API
  useEffect(() => {
    async function fetchOwners() {
      try {
        const response = await axios.get(
          "http://localhost:3004/api/owner/getOwners"
        );
        setOwners(response.data);
      } catch (error) {
        console.error("Error fetching owners:", error);
      }
    }
    fetchOwners();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const payload = {
      ...formData,
      documents: ["one"], // Add document URLs if needed
      status: "Pending", // Default status
    };

    try {
      const response = await axios.post(
        "http://localhost:3004/api/property/addProperty",
        payload
      );
      console.log(response.data);
      console.log("Property added successfully!");
      navigate("/property");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-10 bg-gray-50 sm:py-16 lg:py-24">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">
            Create New Property
          </h2>
        </div>

        <div className="relative max-w-6xl mx-auto mt-8 md:mt-16">
          <div className="overflow-hidden bg-white rounded-md shadow-md">
            <div className="px-4 py-6 sm:px-8 sm:py-7">
              <form onSubmit={handleSubmit}>
                {/* Property Name */}
                <div>
                  <label className="text-base font-medium text-gray-900">
                    Property Name
                  </label>
                  <input
                    type="text"
                    name="propertyName"
                    value={formData.propertyName}
                    onChange={(e) =>
                      setFormData({ ...formData, propertyName: e.target.value })
                    }
                    placeholder="Property name"
                    className="block w-full py-3 px-4 text-black bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600"
                    required
                  />
                </div>

                {/* Address */}
                <div className="mt-4">
                  <label className="text-base font-medium text-gray-900">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                    placeholder="Property address"
                    className="block w-full py-3 px-4 text-black bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600"
                    required
                  />
                </div>

                {/* Size */}
                <div className="mt-4">
                  <label className="text-base font-medium text-gray-900">
                    Size
                  </label>
                  <input
                    type="text"
                    name="size"
                    value={formData.size}
                    onChange={(e) =>
                      setFormData({ ...formData, size: e.target.value })
                    }
                    placeholder="Property size (e.g., 2000 sq ft)"
                    className="block w-full py-3 px-4 text-black bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600"
                    required
                  />
                </div>

                {/* Property Type */}
                <div className="mt-4">
                  <label className="text-base font-medium text-gray-900">
                    Property Type
                  </label>
                  <select
                    name="propertyType"
                    value={formData.propertyType}
                    onChange={(e) =>
                      setFormData({ ...formData, propertyType: e.target.value })
                    }
                    className="block w-full py-3 px-4 text-black bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600"
                    required
                  >
                    <option value="Residential">Residential</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Agricultural">Agricultural</option>
                    <option value="Industrial">Industrial</option>
                  </select>
                </div>

                {/* Owner */}
                <div className="mt-4">
                  <label className="text-base font-medium text-gray-900">
                    Owner
                  </label>
                  <select
                    name="owner"
                    value={formData.owner}
                    onChange={(e) =>
                      setFormData({ ...formData, owner: e.target.value })
                    }
                    className="block w-full py-3 px-4 text-black bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600"
                    required
                  >
                    <option value="">Select an owner</option>
                    {owners.map((owner) => (
                      <option key={owner._id} value={owner._id}>
                        {owner.fullName}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className={`mt-6 inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-white ${
                    isLoading ? "bg-gray-500" : "bg-blue-600"
                  } border border-transparent rounded-md focus:outline-none hover:bg-blue-700`}
                  disabled={isLoading}
                >
                  {isLoading ? "Submitting..." : "Submit Property"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AddPropertyForm;
