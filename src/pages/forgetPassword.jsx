import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
const Base_Url = import.meta.env.VITE_BASE_URL;
export default function ForgetPassword() {
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);

const handleSubmit = async (e) => {
  e.preventDefault();
  if (!email) {
    toast.error("Please enter your email address");
    return;
  }
  setLoading(true);
  try {
    const res = await axios.post(`${Base_Url}/api/auth/forgot-password`, { email });
    localStorage.removeItem("token");
    localStorage.setItem("token", res.data.token);
    toast.success(res.data.message || "Password reset link sent to your email");
    setEmail("");
  } catch (err) {
    toast.error(err.response?.data?.message || "Failed. Try again!");
  }
  setLoading(false);
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-xl w-full max-w-md p-8">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-6">
          Forgot Password
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Enter your email address below and we'll send you a link to reset your password.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A63F40] focus:border-transparent"
              required
            />
          </div>

            <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-medium transition ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-custom-gradient1 text-white hover:bg-custom-gradient1-hover"}`}
            >
                {loading ? "Sending..." : "Send Reset Link"}
            </button>

        </form>

        <div className="mt-6 text-center">
          <Link
            to="/login"
            className="text-primary font-medium"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
