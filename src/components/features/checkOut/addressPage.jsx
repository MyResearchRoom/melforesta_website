import React, { useEffect, useState } from "react";
import AddressModal from "../../../model/addressModal";
import { useDispatch, useSelector } from "react-redux";
import { fetchCustomerAddress } from "../../../redux/actions/customerAddress";
import { MdKeyboardBackspace } from "react-icons/md";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const Base_Url = import.meta.env.VITE_BASE_URL;

export default function AddressPage({ selectedAddress, setSelectedAddress, proceed }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { address, error } = useSelector(
        (state) => state.customerAddressState
    );
  const dispatch=useDispatch();
  const navigate=useNavigate();

  const [isServiceable, setIsServiceable] = useState(false);
  const [checkingPincode, setCheckingPincode] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        dispatch(fetchCustomerAddress()); 
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, [dispatch]);

  const formatAddress = (addr) => {
  if (!addr) return "";
  return [
    addr.buildingBlock ? addr.buildingBlock.toUpperCase() : "",
    addr.flatNo || "",
    addr.buildingName || "",
    addr.landmark || "",
    addr.streetName || "",
    addr.city || "",
    addr.pincode || ""
  ]
    .filter(Boolean) 
    .join(", ");
  };

  const checkPincode = async (pincode) => {
    try {
      setCheckingPincode(true);
      const token=localStorage.getItem("token");

      const res = await axios.get(
        `${Base_Url}/api/pincode/check-pincode/${pincode}`,{
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      );

      if (res.data.exists) {
        // toast.success(res.data.message || "Your selected pincode is serviceable..")
        setIsServiceable(true);
      } else {
        setIsServiceable(false);
        toast.warn("Your selected pincode not serviceable..");
      }
    } catch (error) {
      setIsServiceable(false);
      toast.error("Failed to check pincode");
    } finally {
      setCheckingPincode(false);
    }
  };
  
    if (loading) {
    return <p className="text-center mt-10">Loading Address...</p>;
    }
  
    if(error)
    {
      return(
        <p className="text-red-600">{error}</p>
      );
    }
  
  return (
    <div className="flex flex-col md:flex-row border space-x-0  space-y-5 md:space-x-5 md:space-y-0  xl:space-x-10 border-gray-500 p-5 md:p-7 xl:p-10 rounded-lg w-full items-center">
    
    <div className="w-full">
      <div className="flex flex-row space-x-2 items-center mb-4" 
      onClick={()=>navigate(-1)}>
        <MdKeyboardBackspace className="text-base md:text-lg xl:text-xl" />
        <h2 className="text-base md:text-lg xl:text-xl font-bold">Select Delivery Location</h2>
      </div>
      <div className="border border-primary rounded p-4 space-y-3 text-xs md:text-sm xl:text-base">
        {address.length===0?(
          <p className="text-center col-span-full text-red-600 font-semibold py-8">
              No Address add yet.
          </p>
        ) : (
        address.map((address, index) => (
        <>
          <label key={index} className="flex items-center space-x-2">
            <input
              type="radio"
              name="delivery"
              checked={selectedAddress === address.id}
              onChange={() => {
                setSelectedAddress(address.id);
                checkPincode(address.pincode);
              }}
              className="accent-primary cursor-pointer"
            />
            <span className="break-words cursor-pointer">
              {formatAddress(address)}
            </span>
            
          </label>
        </>
        )))}
        <div className="flex justify-center">
            <button className="mt-4 text-primary font-medium px-5 py-2 border border-primary rounded-md text-xs md:text-sm xl:text-base" 
            onClick={() => setOpen(true)}>+ Add Delivery Address</button>
        </div>
        
      </div>
      <div className="flex justify-center">
        <button
          onClick={() => selectedAddress && isServiceable && proceed()}
          disabled={!selectedAddress || !isServiceable || checkingPincode}
          className="mt-6 bg-custom-gradient1 hover:bg-custom-gradient1-hover text-white px-6 py-2 rounded disabled:opacity-50 text-xs md:text-sm xl:text-base"
        >
          {checkingPincode ? "Checking..." : "Proceed"}
        </button>
      </div>
    </div>


    <AddressModal isOpen={open} onClose={() => setOpen(false)} />
    </div>
  );
}
