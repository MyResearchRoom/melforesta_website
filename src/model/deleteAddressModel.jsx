import { toast } from "react-toastify";
import { fetchCustomerAddress } from "../redux/actions/customerAddress";
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
const Base_Url = import.meta.env.VITE_BASE_URL;

export default function DeleteAddressModel({ isOpen, onClose ,id}) {
  if (!id) return null;
  if (!isOpen) return null;
  const [loading, setLoading] = useState(false);
  const dispatch=useDispatch();
  
  // const handleYesClick = async() => {
  //  toast.success("Address deleted",id)
  //  onClose();
  // };

  const handleDelete = async() => {
    if (!id) return;
    // toast.success("call")
      
          try {
            setLoading(true);
      
            const token = localStorage.getItem("token");

            const res = await axios.delete(
              `${Base_Url}/api/address/deleteAddress/${id}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            console.log(res);
            
            
           if (res.data.success) {
              toast.success(res.data.message ||"Address deleted successfully..");
              onClose();
              
              dispatch(fetchCustomerAddress()); 

            } else {
              toast.error("Failed to delete address");
            }
          } catch (error) {
             toast.error(error || "Something went wrong");
          } finally {
            setLoading(false);
          }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 p-2">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-xs p-2 md:p-6">
        <h2 className="text-sm md:text-base xl:text-lg font-semibold mb-4 text-black">Are you sure to delete this address?</h2>

        <div className="flex justify-end space-x-4 text-sm md:text-base xl:text-lg">
          <button
            onClick={onClose}
            className="px-4 py-1 md:py-1 bg-gray-300 rounded hover:bg-gray-400"
          >
            No
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-1 md:py-1 bg-custom-gradient1 text-white rounded hover:bg-custom-gradient1-hover"
          >
            {loading ? "Deleting..." : "Yes"}
          </button>
        </div>
      </div>
    </div>
  );
}
