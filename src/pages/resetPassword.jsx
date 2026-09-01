import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const Base_Url = import.meta.env.VITE_BASE_URL;

export default function ResetPassword() {
  const { token } = useParams();
  const navigate=useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  console.log("token",token);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(`${Base_Url}/api/auth/reset-password`,{ token, newPassword 
      },);

      toast.success(res.data.message || "Password reset successfully");
      setNewPassword("");
      setConfirmPassword("");
      navigate("/");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto my-20 p-6 bg-white shadow-md rounded-md border">
      <h2 className="text-2xl font-semibold mb-4 text-center">Reset Password</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block mb-1 font-medium">
            New Password
          </label>

          <div className="relative">
            <input
              type={showNewPassword ? "text" : "password"}
              value={newPassword}
              onChange={(e) =>
                setNewPassword(e.target.value)
              }
              placeholder="Enter new password"
              className="
                w-full
                border
                border-gray-300
                rounded
                px-3
                py-2
                pr-10
                focus:outline-none
                focus:ring-2
                focus:ring-indigo-500
              "
            />

            <button
              type="button"
              onClick={() =>
                setShowNewPassword((prev) => !prev)
              }
              className="
                absolute
                right-3
                top-1/2
                -translate-y-1/2
                text-gray-500
              "
            >
              {showNewPassword ? (
                <FaEyeSlash />
              ) : (
                <FaEye />
              )}
            </button>
          </div>
        </div>

        <div>
          <label className="block mb-1 font-medium">
            Confirm Password
          </label>

          <div className="relative">
            <input
              type={
                showConfirmPassword
                  ? "text"
                  : "password"
              }
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(e.target.value)
              }
              placeholder="Confirm new password"
              className="
                w-full
                border
                border-gray-300
                rounded
                px-3
                py-2
                pr-10
                focus:outline-none
                focus:ring-2
                focus:ring-indigo-500
              "
            />

            <button
              type="button"
              onClick={() =>
                setShowConfirmPassword(
                  (prev) => !prev
                )
              }
              className="
                absolute
                right-3
                top-1/2
                -translate-y-1/2
                text-gray-500
              "
            >
              {showConfirmPassword ? (
                <FaEyeSlash />
              ) : (
                <FaEye />
              )}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-primary text-white py-2 px-4 rounded hover:bg-textPrimary disabled:bg-gray-400"
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
}

// import { useParams } from "react-router-dom";

// const ResetPassword = () => {
//   const { token } = useParams();

//   console.log("ResetPassword loaded");
//   console.log("Token:", token);

//   return <div>Reset Password</div>;
// };

// export default ResetPassword;
