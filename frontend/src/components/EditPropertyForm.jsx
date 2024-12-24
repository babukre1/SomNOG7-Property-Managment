import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export function EditPropertyForm() {
  const [formState, setFormState] = useState({
    propertyName: "",
    address: "",
    size: "",
    propertyType: "Residential",
  });
  const [imageFile, setImageFile] = useState(null); // Image state for file upload
  const navigate = useNavigate();
  const { id } = useParams();

  // Fetch the existing property details when editing
  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:3004/api/property/getProperty/${id}`)
        .then((response) => {
          const data = response.data;
          setFormState({
            propertyName: data.propertyName,
            address: data.address,
            size: data.size,
            propertyType: data.propertyType,
          });
        })
        .catch((error) => {
          console.error("Error fetching property:", error);
        });
    }
  }, [id]);
  console.log(formState);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Upload image to Cloudinary
  const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ml_default"); // Replace with your Cloudinary upload preset

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dezn9ks7m/image/upload",
        formData
      );
      return response.data.secure_url;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  };

  // Handle form submission to update property
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Update property data
    await axios
      .post(`http://localhost:3004/api/property/updateProperty/${id}`, {
        ...formState,
      })
      .then((response) => {
        alert("Property updated successfully");
        console.log(response.data);
      })
      .catch((error) => {
        if (error.response) {
          // The server responded with a status code outside the 2xx range
          console.log("Error response:", error.response);
        } else if (error.request) {
          // The request was made but no response was received
          console.log("Error request:", error.request);
        } else {
          // Something happened in setting up the request that triggered an error
          console.log("Error message:", error.message);
        }
      });
  };

  return (
    <section className="py-10 bg-gray-50 sm:py-16 lg:py-24">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">
            Edit Property
          </h2>
        </div>

        <div className="relative max-w-6xl mx-auto mt-8 md:mt-16">
          <div className="overflow-hidden bg-white rounded-md shadow-md">
            <div className="px-4 py-6 sm:px-8 sm:py-7">
              <form onSubmit={handleSubmit} method="POST">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                  <div>
                    <label className="text-base font-medium text-gray-900">
                      Property Name
                    </label>
                    <input
                      type="text"
                      name="propertyName"
                      value={formState.propertyName}
                      onChange={handleInputChange}
                      placeholder="Property Name"
                      className="block w-full py-3 px-4 text-black bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-base font-medium text-gray-900">
                      Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formState.address}
                      onChange={handleInputChange}
                      placeholder="Address"
                      className="block w-full py-3 px-4 text-black bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-base font-medium text-gray-900">
                      Size
                    </label>
                    <input
                      type="text"
                      name="size"
                      value={formState.size}
                      onChange={handleInputChange}
                      placeholder="Size"
                      className="block w-full py-3 px-4 text-black bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600"
                    />
                  </div>

                  <div>
                    <label className="text-base font-medium text-gray-900">
                      Property Type
                    </label>
                    <select
                      name="propertyType"
                      value={formState.propertyType}
                      onChange={handleInputChange}
                      className="block w-full py-3 px-4 text-black bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600"
                      required
                    >
                      <option value="Residential">Residential</option>
                      <option value="Commercial">Commercial</option>
                    </select>
                  </div>

                  {/* Image File Input */}
                  <div>
                    <label className="text-base font-medium text-gray-900">
                      Upload New Image
                    </label>
                    <input
                      type="file"
                      onChange={(e) => setImageFile(e.target.files[0])}
                      className="block w-full py-3 px-4 text-black bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600"
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-white bg-blue-600 border border-transparent rounded-md focus:outline-none hover:bg-blue-700"
                  >
                    Update Property
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default EditPropertyForm;
