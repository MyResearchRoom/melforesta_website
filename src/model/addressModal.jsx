import React, { useState,useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import { toast } from "react-toastify";
import InputField from "../components/common/inputfield";
import axios from "axios";
import { fetchCustomerAddress } from "../redux/actions/customerAddress";
import { useDispatch } from "react-redux";
const Base_Url = import.meta.env.VITE_BASE_URL;
const AddressModal = ({ isOpen, onClose,id=null }) => {
  const isEditMode = !!id;
  const [formData, setFormData] = useState({
    flatNo: "",
    buildingBlock: "",
    floor: "",
    buildingName: "",
    streetName: "",
    landmark: "",
    city: "",
    state: "",
    pincode: "",
  });

  const dispatch=useDispatch();
  const [errors, setErrors] = useState({});

  useEffect(() => {
  const fetchAddressDetails = async () => {
    if (!id) return;

    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `${Base_Url}/api/address/getAddress/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        const address = res.data.data;

        setFormData({
          flatNo: address.flatNo||"",
          buildingBlock: address.buildingBlock||"",
          floor: address.floor||"",
          buildingName: address.buildingName||"",
          streetName: address.streetName||"",
          landmark: address.landmark||"",
          city: address.city||"",
          state: address.state||"",
          pincode: address.pincode||"",
        });
      } else {
        toast.error(res.data.message || "Failed to fetch address details");
      }
    } catch (err) {
      console.error("❌ Fetch adress error:", err);
      toast.error(err.response?.data?.message || "Failed to load address details");
    }
  };

  fetchAddressDetails();
  }, [id]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    let newErrors = {};

    if (!formData.flatNo) newErrors.flatNo = "Flat No is required";
    if (!formData.buildingBlock) newErrors.buildingBlock = "Building block is required";
    if (!formData.buildingName) newErrors.buildingName = "Building name is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.state) newErrors.state = "State is required";
    if (!formData.pincode) newErrors.pincode = "Pincode is required";
    else if (!/^\d{6}$/.test(formData.pincode)) newErrors.pincode = "Pincode must be 6 digits";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please fix errors before submitting.");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      if(isEditMode){
        const res = await axios.put(
        `${Base_Url}/api/address/editAddress/${id}`,formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
        );
        if (res.data.success) {
        toast.success(res.data.message||"Address updated successfully..")
       
        } else {
        toast.error(res.data.message || "Failed to update address");
        }
      }
      else
      { 
      const res = await axios.post(
        `${Base_Url}/api/address/addAddress`,formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.data.success) {
        toast.success(res.data.message||"Address Added successfully..")
      } else {
        toast.error(res.data.message || "Failed to add address");
      }
      }
      dispatch(fetchCustomerAddress()); 
      onClose();
      setFormData({
        flatNo: "",
        buildingBlock: "",
        floor: "",
        buildingName: "",
        streetName: "",
        landmark: "",
        city: "",
        state: "",
        pincode: "",
      });

    } catch (err) {
      console.error("❌ Fetch add addredd error:", err);
      toast.error(err.response?.data?.message || "Failed to add address");
    }
    
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
     
      <div className="absolute inset-0 bg-black/30" onClick={onClose}></div>

     
      <div className="relative bg-white w-full max-w-2xl rounded-2xl px-3 py-5 z-50 overflow-y-auto max-h-[90vh]">
     
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl text-gray-600 hover:text-black"
        >
          <IoMdClose />
        </button>

        <h2 className="text-center text-lg font-semibold mb-3">
          Enter Address Details 
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-1 gap-2 md:grid-cols-3 md:gap-0">
            <InputField
              label="Flat No"
              name="flatNo"
              value={formData.flatNo}
              onChange={handleChange}
              error={errors.flatNo}
              required
              className="w-full"
            />
            <InputField
              label="Building Block"
              name="buildingBlock"
              value={formData.buildingBlock}
              onChange={handleChange}
              className="w-full"
              required
            />
            <InputField
              label="Floor"
              name="floor"
              value={formData.floor}
              onChange={handleChange}
              className="w-full"
            />
          </div>        
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3">           
            <InputField
            label="Building Name"
            name="buildingName"
            value={formData.buildingName}
            onChange={handleChange}
            error={errors.buildingName}
            required
            />
            
            <InputField
            label="Street Name"
            name="streetName"
            value={formData.streetName}
            onChange={handleChange}
            />

            <InputField
            label="Near By Landmark"
            name="landmark"
            value={formData.landmark}
            onChange={handleChange}
            />

            <InputField
              label="City"
              name="city"
              value={formData.city}
              onChange={handleChange}
              error={errors.city}
              required
            />
            <InputField
              label="State"
              name="state"
              value={formData.state}
              onChange={handleChange}
              error={errors.state}
              required
            />
            <InputField
            label="Pincode"
            name="pincode"
            value={formData.pincode}
            onChange={handleChange}
            error={errors.pincode}
            required
          />
          </div>
         
          <div className="mt-5 px-5">
            <button
            type="submit"
            className="w-full bg-custom-gradient1 text-white py-2 mt-5 rounded hover:bg-custom-gradient1-hover"
            >
              Confirm Address
            </button>
          </div>
          
        </form>
      </div>
    </div>
  );
};

export default AddressModal;
