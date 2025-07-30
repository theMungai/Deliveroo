import React, { useState } from "react";
import logo from "../assets/Logo.png";
import { useNavigate } from "react-router-dom";

const Admin_AuthForm = () => {
  const [authType, setAuthType] = useState("login");
  const navigate = useNavigate();
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);
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
      return;
    }

    setLoading(true);

    const url =
      authType === "signup"
        ? "https://deliveroo-yptw.onrender.com/admins/register"
        : "https://deliveroo-yptw.onrender.com/admins/login";

    const payload =
      authType === "signup"
        ? {
            first_name: formData.firstName,
            last_name: formData.lastName,
            email: formData.email,
            password: formData.password,
          }
        : {
            email: formData.email,
            password: formData.password,
          };

    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Auth failed");
        return res.json();
      })
      .then((data) => {
        if (authType === "login") {
          setSuccessMsg("Logged in successfully!");
          setTimeout(() => {
            navigate("/admin");
          }, 1500);
        } else {
          setSuccessMsg("Account created successfully!");
          setTimeout(() => {
            setAuthType("login");
            setSuccessMsg("Logged in successfully!");
          }, 1500);
        }
      })
      .catch(() => {
        setErrors({
          email: `${
            authType === "signup" ? "Signup" : "Login"
          } failed. Try again.`,
        });
      })
      .finally(() => {
        setLoading(false);
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          cpassword: "",
        });
      });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-sm max-xs:mx-5 bg-white shadow-md rounded-xl p-6">
        {successMsg && (
          <div className="mb-4 text-green-600 text-center font-semibold">
            {successMsg}
          </div>
        )}
        <div className="text-center mb-6">
          <img src={logo} alt="Deliveroo" className="w-24 mx-auto mb-2" />
          <h2 className="text-lg font-semibold text-slate-900">Admin Portal</h2>
          <p className="text-xs text-slate-600">
            Sign in or create an account for the Admin dashboard
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
            <div className="flex gap-2 max-xs:flex-col">
              <div className="w-1/2 max-xs:w-full">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={`w-full border outline-0 ${
                    errors.firstName ? "border-red-500" : "border-gray-300"
                  } rounded-md px-3 py-2 text-sm`}
                />
                {errors.firstName && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.firstName}
                  </p>
                )}
              </div>
              <div className="w-1/2 max-xs:w-full mt-2">
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={`w-full border outline-0 ${
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
            className="w-full py-2 px-4 rounded-md bg-lime-500 text-white text-sm font-semibold hover:bg-lime-600 flex items-center justify-center gap-2 disabled:opacity-60"
            disabled={!!successMsg || loading}
          >
            {loading && (
              <span className="animate-spin inline-block h-4 w-4 border-[2px] border-white border-t-transparent rounded-full"></span>
            )}
            {authType === "login" ? "Login" : "Create Account"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Admin_AuthForm;
