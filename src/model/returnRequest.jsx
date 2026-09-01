import { useState, useEffect } from "react";
import { BiUpload } from "react-icons/bi";
import { toast } from "react-toastify";
import axios from "axios";
const Base_Url = import.meta.env.VITE_BASE_URL;
export const ReturnModal = ({ open, onClose ,orderId,orderItemId}) => {
  const returnReasons = [
    "Item Doesn't Match Description",
    "The customer received the incorrect product.",
    "Color is different from what was expected.",
    "The item arrived later than expected, and the customer no longer wants it.",
    "Received defective or damaged item",
    "Other",
  ];


  const [selectedReasons, setSelectedReasons] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([null, null, null]);        
  const [previews, setPreviews] = useState([null, null, null]);   
  const [quantity, setQuantity] = useState(1);               

  
  useEffect(() => {
    previews.forEach(url => url && URL.revokeObjectURL(url));                    
    const newPreviews = uploadedFiles.map(f => (f ? URL.createObjectURL(f) : null));
    setPreviews(newPreviews);


  return () => newPreviews.forEach(url => url && URL.revokeObjectURL(url));
  }, [uploadedFiles]);

  const handleFileChange = (e, idx) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadedFiles(prev => {
      const next = [...prev];
      next[idx] = file;
      return next;
    });
  };

  const handleSubmit = async() => {
    if (!selectedReasons) {
      toast.error("Please select a reason for return");
      return;
    }
    if (!quantity || quantity <= 0) {
      toast.error("Please enter a valid quantity");
      return;
    }

   const formData = new FormData();
    formData.append("reason", selectedReasons);
    formData.append("returnQuantity", quantity);
    uploadedFiles
      .filter(f => f !== null)
      .forEach(file => formData.append("media", file));

    try {
        const token = localStorage.getItem("token");
        const res = await axios.post(
          `${Base_Url}/api/returnProductOrder/return/${orderId}/${orderItemId}`,formData,
          {
            headers: { Authorization: `Bearer ${token}` },
            "Content-Type": "multipart/form-data",
          }
        );

        if (res.data.success) {
          toast.success(res.data.message || "Return request initiated successfully..");
        }
        setSelectedReasons("");
        setQuantity(1);
        setUploadedFiles([null, null, null]);
        setPreviews([null, null, null]);    
    } catch (err) 
    {
        console.error(err);
        if (err.response?.status === 400) {
            toast.info(err.response.data?.message);
        } else 
        {
        toast.error(err.response?.data?.message || "Failed to initiate Return request");
        }
    } 
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-2">
      <div className="bg-white p-6 rounded-lg w-full max-w-md relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-black"
          onClick={onClose}
        >
          ✕
        </button>

        <h2 className="text-sm md:text-base xl:text-lg font-semibold mb-4">
          Select Reason for Return
        </h2>

       
        <div className="flex flex-col gap-2 text-xs md:text-sm xl:text-base">
          {returnReasons.map((reason, i) => (
            <label key={i} className="flex items-start gap-2 cursor-pointer">
              <input
                type="radio"
                name="returnReason"
                value={reason}
                checked={selectedReasons === reason}
                onChange={() => setSelectedReasons(reason)}
                // onChange={() => toggleReason(reason)}
                className="mt-1"
              />
              <span>{reason}</span>
            </label>
          ))}
        </div>

        <div className="mt-4">
          <label className="font-medium text-xs md:text-sm xl:text-base mb-1 block">
            Quantity
          </label>
          <input
            type="number"
            min={1}
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="border w-full px-3 py-2 rounded-md text-xs md:text-sm xl:text-base focus:outline-none focus:border-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <p className="mt-4 font-medium text-xs md:text-sm xl:text-base">
          Upload Image / Video
        </p>
        <div className="flex gap-4 mt-2">
          {[0, 1, 2].map(idx => (
            <label
              key={idx}
              className="border w-12 h-12 flex items-center justify-center rounded-md cursor-pointer overflow-hidden relative group"
            >
              {previews[idx] ? (
                
                uploadedFiles[idx]?.type.startsWith("video/") ? (
                  <video
                    src={previews[idx]}
                    className="w-full h-full object-cover"
                    muted
                    loop
                    playsInline
                  />
                ) : (
                  <img
                    src={previews[idx]}
                    alt="preview"
                    className="w-full h-full object-cover"
                  />
                )
              ) : (
                <BiUpload className="w-4 h-4 text-gray-500 group-hover:text-black" />
              )}
              <input
                type="file"
                accept="image/*,video/*"
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={e => handleFileChange(e, idx)}
              />
            </label>
          ))}
        </div>

        
        <button
          onClick={handleSubmit}
          className="mt-6 bg-custom-gradient1 hover:bg-custom-gradient1-hover text-white px-4 py-2 rounded text-xs md:text-sm xl:text-base block mx-auto"
        >
          Send Request
        </button>
      </div>
    </div>
  );
};

