import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser } from "../store/slices/authSlice";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await dispatch(
        registerUser({
          name,
          email,
          password,
        })
      ).unwrap();

      navigate("/login");
    } catch (err) {
      console.error("Register failed:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 px-4">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

        {/* Title */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            HRMS 
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Create your account
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleRegister} className="space-y-5">

          {/* Name */}
          <div>
            <label className="text-sm font-medium text-gray-600">
              Full Name
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-green-400 outline-none transition"
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-medium text-gray-600">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-green-400 outline-none transition"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium text-gray-600">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-green-400 outline-none transition"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-green-400 hover:bg-green-500 text-black font-semibold py-2 rounded-lg transition duration-200"
          >
            Register
          </button>

        </form>

        {/* Login link */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-600 cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>

      </div>
    </div>
  );
};

export default Register;