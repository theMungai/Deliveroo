import React, { useState } from "react";
import logo from "../assets/Logo.png";
import { useNavigate } from "react-router-dom";

const User_AuthForm = () => {
  const navigate = useNavigate();
  const [authType, setAuthType] = useState("login");
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
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
      if (!formData.first_name.trim())
        newErrors.first_name = "First name is required";
      if (!formData.last_name.trim())
        newErrors.last_name = "Last name is required";
      if (formData.password !== formData.cpassword)
        newErrors.cpassword = "Passwords do not match";
    }
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      let payload;
      let url;
      if (authType === "signup") {
        payload = {
          first_name: formData.first_name,
          last_name: formData.last_name,
          email: formData.email,
          password: formData.password,
        };
        url = "http://127.0.0.1:8000/users/register";
      } else {
        payload = {
          email: formData.email,
          password: formData.password,
        };
        url = "http://127.0.0.1:8000/users/login";
      }

      try {
        const res = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (!res.ok) {
          setErrors({ api: data.detail || "Authentication failed" });
        } else {
          alert(
            `${authType === "login" ? "Logged in" : "Signed up"} successfully!`
          );
          setFormData({
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            cpassword: "",
          });
          if (authType === "signup") {
            setAuthType("login");
          } else {
            navigate("/dashboard");
          }
        }
      } catch (err) {
        setErrors({ api: "Network error" }, err);
      }
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-sm bg-white shadow-md rounded-xl p-6">
        <div className="text-center mb-6">
          <img src={logo} alt="Deliveroo" className="w-24 mx-auto mb-2" />
          <h2 className="text-lg font-semibold text-slate-900">User Portal</h2>
          <p className="text-xs text-slate-600">
            Sign in or create an account for the User dashboard
          </p>
        </div>

        <div className="relative flex mb-4 bg-gray-100 p-1 rounded-lg">
          <div
            className={`absolute top-1 bottom-1 w-1/2 rounded-[5px] bg-white shadow transition-transform duration-300 ease-in-out ${
              authType === "signup" ? "translate-x-full" : "translate-x-0"
            }`}
          />

          {["login", "signup"].map((type) => (
            <button
              key={type}
              onClick={() => setAuthType(type)}
              className={`w-1/2 z-10 py-2 text-sm font-medium transition-colors duration-300 ${
                authType === type ? "text-slate-900" : "text-slate-500"
              }`}
            >
              {type === "login" ? "Login" : "Sign Up"}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {authType === "signup" && (
            <div className="flex gap-2">
              <div className="w-1/2">
                <input
                  type="text"
                  name="first_name"
                  placeholder="First Name"
                  value={formData.first_name}
                  onChange={handleChange}
                  className={`w-full border outline-0 ${
                    errors.first_name ? "border-red-500" : "border-gray-300"
                  } rounded-md px-3 py-2 text-sm`}
                />
                {errors.first_name && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.first_name}
                  </p>
                )}
              </div>
              <div className="w-1/2">
                <input
                  type="text"
                  name="last_name"
                  placeholder="Last Name"
                  value={formData.last_name}
                  onChange={handleChange}
                  className={`w-full border outline-0 ${
                    errors.last_name ? "border-red-500" : "border-gray-300"
                  } rounded-md px-3 py-2 text-sm`}
                />
                {errors.last_name && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.last_name}
                  </p>
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
              className={`w-full border outline-0 ${
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
              className={`w-full border outline-0 ${
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
                className={`w-full border outline-0 ${
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
            {authType === "login" ? "Login" : "Create Account"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default User_AuthForm;
