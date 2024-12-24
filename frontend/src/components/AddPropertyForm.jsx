import React, { useState } from "react";
import axios from "axios";

export function AddPropertyForm() {
  const [formData, setFormData] = useState({
    propertyName: "",
    address: "",
    size: "",
    propertyType: "Residential",
  });
  const [isLoading, setIsLoading] = useState(false);

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prev) => ({ ...prev, [name]: value }));
  // };

  const handleSubmit = async (e) => {
    const payload = {
      ...formData,
      owner: "676901ee6824fc872217ea30", // Replace with the actual owner ID
      documents: ["one"], // Add document URLs if needed
      status: "Pending", // Default status
    };
    console.log(payload);

    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:3004/api/property/addProperty",
        payload
      );

      console.log(response.data);
      console.log("Property added successfully!");
    } catch (error) {
      console.error(error);
    }
    axios
      .post("http://localhost:3004/api/property/addProperty", payload)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        if (error.response) {
          // The server responded with a status code outside the 2xx range
          console.log("Error response:", error.response);
        } else if (error.request) {
          // The request was made but no response was received
          console.log("request was made but no response was received:");

          console.log("Error request:", error.request);
        } else {
          // Something happened in setting up the request that triggered an error
          console.log("Error message:", error.message);
        }
      }).finally(() => {  
        setIsLoading(false);
      });
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

                {/* Submit Button */}
                <button
                  // disabled={isLoading}
                  type="submit"
                  className={`mt-6 inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-white ${
                    isLoading ? "bg-gray-500" : "bg-blue-600"
                  } border border-transparent rounded-md focus:outline-none hover:bg-blue-700`}
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
