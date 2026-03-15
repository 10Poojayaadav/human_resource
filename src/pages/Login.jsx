import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../store/slices/authSlice";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

const Login = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {

      await dispatch(loginUser({ email, password })).unwrap();

      toast.success("Login successful 🎉");

      setTimeout(() => {
        navigate("/");
      }, 1200);

    } catch (err) {

      toast.error("Invalid email or password ❌");
      console.error("Login failed:", err);

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 px-4">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            HRMS
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Sign in to your account
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">

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
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
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
              placeholder="Enter your password"
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-400 hover:bg-green-500 text-black font-semibold py-2 rounded-lg transition duration-200 flex justify-center items-center"
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                Signing In...
              </div>
            ) : (
              "Sign In"
            )}
          </button>

        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-blue-600 cursor-pointer hover:underline"
          >
            Register
          </span>
        </p>

      </div>
    </div>
  );
};

export default Login;