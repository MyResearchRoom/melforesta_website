import axios from "axios";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
const Base_Url = import.meta.env.VITE_BASE_URL;

export default function Section6() {
  const [formData, setFormData] = useState({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    orderType: "Bulk Order",
    quantity: "",
    details: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

 const handleSubmit = async(e) => {
  e.preventDefault();

  try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${Base_Url}/api/bulkOrder/createBulkOrder`,
        formData,
        );
        if (res.data.success) {
        toast.success(res.data.message||"Bulk order submitted successfully..");
        setFormData({
          companyName: "",
          contactName: "",
          email: "",
          phone: "",
          orderType: "Bulk Order",
          quantity: "",
          details: "",
        });
       
        } else {
        toast.error(res.data.message || "Failed to update address");
        }

  }catch (err) {
    const response = err.response?.data;
    
    if (response?.errors?.length > 0) {
      toast.error(response.errors[0].msg);
    } else {
      toast.error(response?.message || "Failed to add bulk order");
    }
  }

};

  return (
    <section className="bg-[#fffbf5] py-16 px-4">
      
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-5xl font-serif mb-4">
          Get Started Today
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Fill out the form below and our team will contact you within 24 hours.
        </p>
      </div>

      <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-md">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div>
            <label className="block text-base font-medium mb-2">
              Company Name *
            </label>
            <input
              name="companyName"
              onChange={handleChange}
              value={formData.companyName}
              type="text"
              placeholder="Enter company name"
              className="w-full border border-[#f2e2b9] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-600"
            />
          </div>

          <div>
            <label className="block text-base font-medium mb-2">
              Contact Person Name *
            </label>
            <input
              name="contactName"
              onChange={handleChange}
              value={formData.contactName}
              type="text"
              required={true}
              placeholder="Enter contact name"
              className="w-full border border-[#f2e2b9] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-600"
            />
          </div>

          <div>
            <label className="block text-base font-medium mb-2">
              Email Address *
            </label>
            <input
              name="email"
              onChange={handleChange}
                value={formData.email}
              type="email"
              required={true}
              placeholder="Enter email"
              className="w-full border border-[#f2e2b9]  rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-600"
            />
          </div>

          <div>
            <label className="block text-base font-medium mb-2">
              Phone Number *
            </label>
            <input
              name="phone"
              onChange={handleChange}
              value={formData.phone}
              type="tel"
              required={true}
              placeholder="Enter phone number"
              className="w-full border border-[#f2e2b9]  rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-600"
            />
          </div>

          <div>
            <label className="block text-base font-medium mb-2">
              Order Type *
            </label>
            <select
              name="orderType"
              onChange={handleChange}
              required={true}
              value={formData.orderType}
              className="w-full border border-[#f2e2b9]  rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-600"
            >
              <option>Bulk Order</option>
              <option>Corporate Gifting</option>
              <option>Custom Order</option>
            </select>
          </div>

          <div>
            <label className="block text-base font-medium mb-2">
              Estimated Quantity *
            </label>
            <input
              name="quantity"
              onChange={handleChange}
              value={formData.quantity}
              required={true}
              type="number"
              placeholder="Enter quantity"
              className="w-full border border-[#f2e2b9]  rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-600"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-base font-medium mb-2">
              Additional Details
            </label>
            <textarea
              name="details"
              onChange={handleChange}
                value={formData.details}
              rows="4"
              placeholder="Write your requirements..."
              className="w-full border border-[#f2e2b9]  rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-600"
            ></textarea>
          </div>

          <div className="md:col-span-2 text-center">
            <button
              type="submit"
              className="bg-[#c18e0f] text-white px-8 py-3 w-full rounded-lg hover:bg-yellow-700 transition"
            >
              Submit Enquiry
            </button>
          </div>

        </form>

        <p className="text-center py-4 text-yellow-800">
          By submitting this form, you agree to be contacted by our team regarding your Enquiry.
        </p>
      </div>

    </section>
  );
}