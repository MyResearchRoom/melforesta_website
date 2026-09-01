import { MdKeyboardBackspace } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { useState,useEffect} from "react";
import { toast } from "react-toastify";
import axios from "axios";
const Base_Url = import.meta.env.VITE_BASE_URL;
export default function TrackOrder()
{
  const { id } = useParams();
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderProcessHistoryDetails = async () => {
      if (!id) return;
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `${Base_Url}/api/productOrder/getProductOrderStatusHistory/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (res.data.success) {
          setOrderData(res.data);
        } else {
          toast.error(res.data.message || "Failed to fetch order details");
        }
      } catch (err) {
        console.error(err);
        toast.error(err.response?.data?.message || "Failed to fetch order details");
      } finally {
        setLoading(false);
      }
    };

    fetchOrderProcessHistoryDetails();
  }, [id]);

const navigate=useNavigate();

const allStatuses = [
  "newRequest","processing", "shipped", "outForDelivery", "delivered"
];

const statusDisplayMap = {
  newRequest: "Ordered",
  processing: "Processing",
  shipped: "Shipped",
  outForDelivery: "Out For Delivery",
  delivered: "Delivered"
};


  if (loading) {
    return <div className="text-center text-gray-500 mt-10">Loading order details...</div>;
  }

  if (!orderData || !orderData.history) {
    return <div className="text-center text-gray-500 mt-10">No order history found.</div>;
  }

  return(
<section className="py-5 md:py-8 px-4 md:px-8 xl:px-10 min-h-screen">
    <div className="flex flex-row space-x-2 items-center mb-5" onClick={()=>navigate(-1)}>
        <MdKeyboardBackspace className="text-base md:text-lg xl:text-xl" />
        <h2 className="text-base md:text-lg xl:text-xl font-bold">Track Your Order</h2>
    </div> 
<div className="flex flex-col gap-5">
  <p className="text-sm md:text-base xl:text-lg font-semibold text-black">
    Order id :{orderData.orderId}
  </p>

<div className="w-full overflow-x-auto hidden md:flex justify-start">
  <div className="flex items-center justify-between min-w-[550px] xl:min-w-[600px] px-2 relative ">
    {allStatuses.map((status, index) => {
      const matchedStep = orderData.history.find(
        (step) => step.status === status
      );
      const isCompleted =
        orderData.history.some((step) => step.status === status);


      return (
        <>
        <div
          key={index}
          className="hidden md:flex flex-col items-center w-full relative md:px-0 px-1 "
        >
          
          <span className="text-xs md:text-sm text-center mb-1.5 font-medium min-h-[20px]">
            {status ? statusDisplayMap[status] : ""}
          </span>

          
          <div
            className={`w-4 h-4 xl:w-5 xl:h-5 rounded-full z-10 border-2 ${
              isCompleted
                ? "bg-green-500 border-green-600"
                : "bg-gray-300 border-gray-400"
            }`}
          ></div>

        
          {index < allStatuses.length - 1 && (
            <div className="absolute top-[34px] xl:top-9 left-1/2 w-full h-0.5 -z-10">
              <div
                className={`h-0.5 w-full ${
                  allStatuses.slice(0, index + 1).every((s) =>orderData.history.some((step) => step.status === s)
                  )
                    ? "bg-green-500"
                    : "bg-gray-300"
                }`}
              ></div>
            </div>
          )}
        
          <span className="text-xs xl:text-sm text-gray-600 text-center mt-1 min-h-[34px] leading-tight">
            {matchedStep ? (
              <>
                {new Date(matchedStep.changedAt).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric"
                })}
                <br />
                {new Date(matchedStep.changedAt).toLocaleTimeString("en-IN", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true
                })}
              </>
            ) : (
              <span className="invisible">placeholder<br />placeholder</span>
            )}
          </span>
        </div>
        
        
        </>
      );
    })}
  </div>
</div>

<div className="w-full md:hidden flex justify-start px-4">
  <div className="flex flex-col relative pl-6">
    {allStatuses.map((status, index) => {
      const matchedStep = orderData.history.find(
        (step) => step.status === status
      );
      const isCompleted =
        orderData.history.some((step) => step.status === status);
      const isLast = index === allStatuses.length - 1;

      return (
        <div key={index} className="relative pb-4">
          {!isLast && (
            <span className={`absolute top-2 left-1 w-0.5 h-full bg-gray-300 z-0
            ${
              isCompleted
                ? "bg-green-500 border-green-600"
                : "bg-gray-300 border-gray-400"
            }`}></span>
          )}
          
          <div
            className={`w-4 h-4 rounded-full absolute -left-1 top-1 z-10 border-2 ${
              isCompleted
                ? "bg-green-500 border-green-600"
                : "bg-gray-300 border-gray-400"
            }`}
          ></div>
        
          <div className="pl-6">        
            <div className="text-sm font-medium text-gray-800">
              {status ? statusDisplayMap[status] : ""}
            </div>

            <div className="text-xs text-gray-500 leading-tight">
              {matchedStep ? (
                <>
                  {new Date(matchedStep.changedAt).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric"
                  })}
                  <br />
                  {new Date(matchedStep.changedAt).toLocaleTimeString("en-IN", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true
                  })}
                </>
              ) : (
                <span className="invisible">placeholder<br />placeholder</span>
              )}
            </div>
          </div>
        </div>
      );
    })}
  </div>
</div>

</div>
          
</section>
    );
}