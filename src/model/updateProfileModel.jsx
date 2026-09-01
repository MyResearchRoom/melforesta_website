import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaUpload } from "react-icons/fa";
const Base_Url = import.meta.env.VITE_BASE_URL;
export default function UpdateCustomerModal({ open, onClose, userId })
{
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        mobileNumber: "",
        gender: "",
        address: "",
        profileImage:"",
    });
    const [preview, setPreview] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
    if (open && userId) {
        fetchCustomerData();
    }
    }, [open, userId]);

    const fetchCustomerData = async () => {
        try 
        {
            const token = localStorage.getItem("token");
            const res = await axios.get(`${Base_Url}/api/auth/getStaffDetails/${userId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = res.data.data;
            setFormData({
                name: data.name || "",
                email: data.email || "",
                mobileNumber: data.mobileNumber || "",
                gender: data.gender || "",
                address: data.address || "",
                profileImage: data.profile || "", 
            });
        } catch (error) 
        {
            toast.error("Failed to fetch customer details");
        }

    };

    const handleChange = (e) => {
        const { name, type, files, value } = e.target;
        if (type === "file" && files.length > 0) {
            setFormData({ ...formData, 
                [name]: files[0],  });
            setPreview(URL.createObjectURL(files[0]));
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try 
        {
            const token = localStorage.getItem("token");
            const userData = new FormData();
            userData.append("name", formData.name);
            userData.append("email", formData.email);
            userData.append("mobileNumber", formData.mobileNumber);
            userData.append("gender", formData.gender);
            userData.append("address", formData.address);

            if (formData.profileImage instanceof File) {
                userData.append("profile", formData.profileImage);
            }
            const res = await axios.put(`${Base_Url}/api/auth/updateMyProfile`, userData, 
            {
                headers: { Authorization: `Bearer ${token}` },
            });
            toast.success(res.data.message || "Customer profile updated successfully!");
            onClose();
        } catch (error) 
        {
            toast.error(error.response?.data?.message || "Update failed");
        } finally 
        {
            setLoading(false);
        }
    };

    if(loading)
    {
        return(<p>Loading personal details</p>);
    } 

    if (!open) return null;

return ( 
<div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 px-5"> 
    <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative overflow-y-auto no-scrollbar max-h-[90vh]"> 
        <h2 className="text-sm md:text-base xl:text-lg font-semibold mb-4 text-gray-800">Update Customer Profile</h2>

    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="flex flex-col justify-center items-center space-y-2">
        <p className="font-medium text-sm xl:text-base">Profile Picture</p>

        {formData.profileImage? (
            <div className="relative group">
                <img
                    src={preview || formData.profileImage}
                    alt="Profile Preview"
                    className="w-28 h-28 object-cover rounded-full border"
                />
      
                <label className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 text-white text-xs opacity-0 group-hover:opacity-100 rounded-full cursor-pointer">
                    Change
                    <input
                        type="file"
                        name="profileImage"
                        accept="image/*"
                        className="hidden"
                        onChange={handleChange}
                    />
                </label>
            </div>
        ) : (
            <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-full p-6 cursor-pointer hover:border-gray-400 transition-all">
                <FaUpload />
                    <input
                        type="file"
                        name="profileImage"
                        accept="image/*"
                        className="hidden"
                        onChange={handleChange}
                    />
            </label>
        )}
        </div>

      <div>
        <label className="block text-sm font-medium text-black pb-1">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border rounded-md p-1.5 focus:border-none border-gray-400 focus:outline-none focus:ring focus:ring-blue-300"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-black pb-1">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border rounded-md p-1.5 focus:border-none border-gray-400 focus:outline-none focus:ring focus:ring-blue-300"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-black pb-1">Mobile Number</label>
        <input
          type="tel"
          name="mobileNumber"
          value={formData.mobileNumber}
          onChange={handleChange}
          pattern="[0-9]{10}"
          title="Enter a valid 10-digit number"
          className="w-full border rounded-md p-1.5 focus:border-none border-gray-400 focus:outline-none focus:ring focus:ring-blue-300"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-black pb-1">Gender</label>
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className="w-full border rounded-md p-1.5 focus:border-none border-gray-400 focus:outline-none focus:ring focus:ring-blue-300"
          required
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-black pb-1">Address</label>
        <textarea
          rows={1}
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="w-full border rounded-md p-1.5 focus:border-none border-gray-400 focus:outline-none focus:ring focus:ring-blue-300"
          required
        ></textarea>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onClose}
          className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded-lg"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading}
          className={`${
            loading ? "bg-blue-300" : "bg-yellow-600 hover:bg-yellow-700"
          } text-white px-4 py-2 rounded-lg`}
        >
          {loading ? "Updating..." : "Update"}
        </button>
      </div>
    </form>
    </div>
</div>

);
}
