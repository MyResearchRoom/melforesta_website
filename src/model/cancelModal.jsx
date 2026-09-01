import { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";
import { toast } from "react-toastify";
import axios from "axios";
const Base_Url = import.meta.env.VITE_BASE_URL;
export const CancelModal = ({ open, onClose,orderId,orderItemId }) => {
  const cancelReasons = [
    "Order Placed by Mistake",
    "Found a Better Price Elsewhere",
    "Delayed Delivery",
    "Change of Mind",
    "Payment Issues"
  ];

  const [selectedReasons, setSelectedReasons] = useState(null);

  useEffect(() => {
      if (!orderId && !orderItemId) return;
  });
      
  const handleSubmit = async() => {
    if (!selectedReasons) {
      toast.error("Please select a reason for return");
      return;
    }
    try {
          const token = localStorage.getItem("token");
          const res = await axios.post(
            `${Base_Url}/api/cancelProductOrder/cancel/${orderId}/${orderItemId}`,
            {reason:selectedReasons},
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          toast.success(res.data.message || "Cancel order confirm");
          onClose();
          setSelectedReasons(""); 
    } catch (err) 
    {
          console.error(err);
          toast.error(err.response?.data?.message || "Failed to Cancel order");
    }
  
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex justify-center items-center p-2">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 relative">

        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
          onClick={onClose}
        >
          <FiX size={20} />
        </button>

        <h2 className="text-sm md:text-base xl:text-lg font-semibold mb-4 text-center">
          Select Reason for Cancellation
        </h2>

        <div className="flex flex-col space-y-3 text-xs md:text-sm xl:text-base">
          {cancelReasons.map((reason, index) => (
            <label
              key={index}
              htmlFor={`cancel-reason-${index}`}
              className="flex items-start gap-2 cursor-pointer"
            >
              <input
                type="radio"
                name="cancleReason"
                id={`cancel-reason-${index}`}
                value={reason}
                checked={selectedReasons===reason}
                onChange={() => setSelectedReasons(reason)}
                className="mt-1"
              />
              <span className="text-sm text-gray-700">{reason}</span>
            </label>
          ))}
        </div>

        <button
          className="mt-6 bg-custom-gradient1 text-white px-5 py-2 rounded hover:bg-custom-gradient1-hover block mx-auto space-y-3 text-xs md:text-sm xl:text-base"
          onClick={handleSubmit}
        >
          Send Request
        </button>
      </div>
    </div>
  );
};
