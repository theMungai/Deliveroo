import React, { useState } from "react";
import logo from "../assets/Logo.png";
import { Link } from "react-router-dom";

const AuthForm = () => {
  const [authType, setAuthType] = useState("login");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setErrors({});
  };

  const validate = () => {
    const newErrors = {};
    if (authType === "signup") {
      if (!formData.firstName.trim())
        newErrors.firstName = "First name is required";
      if (!formData.lastName.trim())
        newErrors.lastName = "Last name is required";
      if (formData.password !== formData.cpassword)
        newErrors.cpassword = "Passwords do not match";
    }
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      console.log("Submitted:", authType, formData);
      alert(
        `${authType === "login" ? "Logged in" : "Signed up"} successfully!`
      );

      // Reset
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        cpassword: "",
      });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-sm bg-white shadow-md rounded-xl p-6">
        {/* Logo and Title */}
        <div className="text-center mb-6">
          <img src={logo} alt="Deliveroo" className="w-24 mx-auto mb-2" />
          <h2 className="text-lg font-semibold text-slate-900">User Portal</h2>
          <p className="text-xs text-slate-600">
            Sign in or create an account for the user dashboard
          </p>
        </div>

        {/* Toggle Tabs */}
        <div className="flex justify-between mb-4 border-b">
          {["login", "signup"].map((type) => (
            <button
              key={type}
              onClick={() => setAuthType(type)}
              className={`w-1/2 py-2 text-sm font-medium ${
                authType === type
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-slate-500"
              }`}
            >
              {type === "login" ? "Login" : "Sign Up"}
            </button>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {authType === "signup" && (
            <div className="flex gap-2">
              <div className="w-1/2">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={`w-full border ${
                    errors.firstName ? "border-red-500" : "border-gray-300"
                  } rounded-md px-3 py-2 text-sm`}
                />
                {errors.firstName && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.firstName}
                  </p>
                )}
              </div>
              <div className="w-1/2">
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={`w-full border ${
                    errors.lastName ? "border-red-500" : "border-gray-300"
                  } rounded-md px-3 py-2 text-sm`}
                />
                {errors.lastName && (
                  <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
                )}
              </div>
            </div>
          )}

          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded-md px-3 py-2 text-sm`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } rounded-md px-3 py-2 text-sm`}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          {authType === "signup" && (
            <div>
              <input
                type="password"
                name="cpassword"
                placeholder="Confirm Password"
                value={formData.cpassword}
                onChange={handleChange}
                className={`w-full border ${
                  errors.cpassword ? "border-red-500" : "border-gray-300"
                } rounded-md px-3 py-2 text-sm`}
              />
              {errors.cpassword && (
                <p className="text-red-500 text-xs mt-1">{errors.cpassword}</p>
              )}
            </div>
          )}

          <button
            type="submit"
            className="w-full py-2 px-4 rounded-md bg-lime-500 text-white text-sm font-semibold hover:bg-lime-600"
          >
            <Link to='/dashboard'>{authType === "login" ? "Login" : "Create Account"}</Link>
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
