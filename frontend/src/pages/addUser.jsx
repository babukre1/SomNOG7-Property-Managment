import axios from "axios";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const addUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    console.log(formData);

    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:3004/api/user/signup",
        formData
      );
      const data = response.data;
      //   localStorage.setItem("user_info", JSON.stringify(data));
      setLoading(false);
      navigate("/users");
    } catch (error) {
      setError(true);
      setLoading(false);
      console.error(error);
    }
  };

  return (
    <div className="">
      <section className="py-6   lg:py-24">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 ">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold leading-tight text-gr sm:text-4xl lg:text-5xl">
              Add a User!
            </h2>
            <p className="max-w-xl text-lg mx-auto mt-4  leading-relaxed font-bold text-gray-800">
              Add new User
            </p>
          </div>

          <div className="relative max-w-xl mx-auto mt-4 md:mt-8">
            <div className="overflow-hidden bg-white rounded-md shadow-md">
              <div className="p-2 sm:px-8 sm:py-5">
                <form onSubmit={handleSubmit} method="POST">
                  <div className="space-y-5">
                    <div className="flex justify-between w-full">
                      <div>
                        <label
                          htmlFor="email"
                          className="text-base font-medium text-gray-900"
                        >
                          Full Name
                        </label>
                        <div className="mt-2 relative text-gray-400 focus-within:text-gray-600">
                          <input
                            id="mame"
                            type="name"
                            value={formData.name}
                            onChange={(e) =>
                              setFormData({ ...formData, name: e.target.value })
                            }
                            placeholder="Enter email to get started"
                            className="block w-full py-4 pl-10 pr-4 text-gray-700 placeholder-gray-400 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="text-base font-medium text-gray-900"
                        >
                          Email address
                        </label>
                        <div className="mt-2 relative text-gray-400 focus-within:text-gray-600">
                          <input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                email: e.target.value,
                              })
                            }
                            placeholder="Enter email to get started"
                            className="block w-full py-4 pl-10 pr-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="password"
                        className="text-base font-medium text-gray-900"
                      >
                        Password
                      </label>
                      <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                        <input
                          id="password"
                          type="password"
                          value={formData.password}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              password: e.target.value,
                            })
                          }
                          placeholder="Enter your password"
                          className="block w-full py-4 pl-10 pr-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600"
                          required
                        />
                      </div>
                    </div>
                    <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                      <label className="text-base font-medium text-gray-900">
                        Role
                      </label>
                      <select
                        name="propertyType"
                        value={formData.role}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            role: e.target.value,
                          })
                        }
                        className="block w-full py-3 px-4 text-black bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600"
                        required
                      >
                        <option value="">Choose Role</option>
                        <option value="user">user</option>
                        <option value="admin">admin</option>
                      </select>
                    </div>

                    {error && (
                      <p className="text-red-500 text-sm">
                        Invalid email or password. Please try again.
                      </p>
                    )}

                    <div>
                      <button
                        type="submit"
                        className="inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-md focus:outline-none hover:bg-blue-700 focus:bg-blue-700"
                      >
                        {loading ? "Adding NewUser..." : "Add User"}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default addUser;
