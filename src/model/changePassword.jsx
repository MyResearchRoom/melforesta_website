import React, { useState } from "react";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
const Base_Url = import.meta.env.VITE_BASE_URL;
export default function ChangePasswordModal({ isOpen, onClose }) {

  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const { oldPassword, newPassword, confirmPassword } = formData;

    if (!oldPassword || !newPassword || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New and Confirm Passwords do not match.");
      return;
    }

    try {
    const token = localStorage.getItem("token"); 
    const res = await axios.put(`${Base_Url}/api/auth/customerChangePassword`,
      { oldPassword, newPassword ,confirmPassword },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    toast.success(res.data.message || "Password changed successfully!");
    onClose();
    } catch (err) 
    {
    const message = err.response?.data?.message || "Failed to change password!";
    toast.error(message);
    }
    onClose(); 
  };

  if (!isOpen) return null;

  const inputClasses =
    "w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring pr-10";

  const renderPasswordField = (label, name, value, show, setShow) => (
    <div className="relative">
      <label className="block mb-1 font-medium">{label}</label>
      <input
        type={show ? "text" : "password"}
        name={name}
        value={value}
        onChange={handleChange}
        className={inputClasses}
        required
      />
      <button
        type="button"
        onClick={() => setShow((prev) => !prev)}
        className="absolute top-7 md:top-9 xl:top-10 right-3 text-gray-500 focus:outline-none"
        tabIndex={-1}
      >
        {show ? <FaEyeSlash /> : <FaEye />}
      </button>
    </div>
  );

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-2">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <h2 className="text-base md:text-lg xl:text-xl font-semibold mb-4">Change Password</h2>
        {error && <p className="text-red-600 text-xs md:text-sm mb-3">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs md:text-sm xl:text-base">
          {renderPasswordField("Old Password", "oldPassword", formData.oldPassword, showOld, setShowOld)}
          {renderPasswordField("New Password", "newPassword", formData.newPassword, showNew, setShowNew)}
          {renderPasswordField("Confirm Password", "confirmPassword", formData.confirmPassword, showConfirm, setShowConfirm)}

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-custom-gradient1 text-white rounded hover:bg-custom-gradient1-hover"
            >
              Change
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
