import { useLocation, useNavigate, useParams } from "react-router-dom";
import { MdKeyboardBackspace } from "react-icons/md";
import { LuBox } from "react-icons/lu";
import StarRating from "../../common/starRating"
import { ReturnModal } from "../../../model/returnRequest";
import { CancelModal } from "../../../model/cancelModal";
import { useState,useEffect} from "react";
import { toast } from "react-toastify";
import capitalizeFirstLetter from "../../common/capitalizeFirstLetter";
import formatPaymentMethod from "../../common/formatePaymentMethod";
import axios from "axios";
import InvoiceModal from "../../../model/invoiceModal";
import { loadRazorpayScript } from "../../../service/razorpay";
const Base_Url = import.meta.env.VITE_BASE_URL;
function formatNumber(value) {
  return Math.round(Number(value || 0)).toLocaleString();
}
export default function Detail()
{
    const {id}=useParams();
    // console.log("id",id);
    const [orderData, setOrderData] = useState(null);
    const navigate=useNavigate();
    const location = useLocation();
    const activeStep = location.state?.activeStep || 1;

    useEffect(() => {
        fetchOrderDetails();
    }, [id]);

    const fetchOrderDetails = async () => {
      if (!id) return;

      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `${Base_Url}/api/productOrder/getOrderDetails/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (res.data.success) {
          setOrderData(res.data.data);
        } else {
          toast.error(res.data.message || "Failed to fetch order details");
        }
      } catch (err) {
        console.error(err);
        toast.error(err.response?.data?.message || "Failed to fetch order details");
      }
    };

    const [showReturnModal, setShowReturnModal] = useState(false);
    const [showCancelModal, setShowCancelModal] = useState(false);
    const [selectedProductItemId,setSelectedProductItemId] = useState(null);
    const [selectedOrderItemId,setSelectedOrderItemId] = useState(null);
    const [ratings, setRatings] = useState({});
    const [reviews, setReviews] = useState({});

    const [showInvoiceModel,setShowInvoiceModel]=useState(false);

    const handleSubmitReview =async (productId,orderId) => 
    {
        const rating = ratings[productId] || 0;
        const review = reviews[productId] || "";
        try {
            const token = localStorage.getItem("token");
            const res = await axios.post(
            `${Base_Url}/api/productReview/addReview/${orderId}/${productId}`,
            {rating, review},
            {
                headers: { Authorization: `Bearer ${token}` },
            }
            );

            if (res.data.success) {
            toast.success(res.data.message || "Review added successfully..");
            }
            setRatings(prev => ({ ...prev, [productId]: 0 }));
            setReviews(prev => ({ ...prev, [productId]: "" }));
        } catch (err) 
        {
            console.error(err);
            if (err.response?.status === 400) {
                toast.info(err.response.data?.message);
            } else 
            {
                toast.error(err.response?.data?.message || "Failed to add review for this product");
            }
        }
    };

    const hanldePayNow = async(orderId) =>{
        try {
            const isLoaded = await loadRazorpayScript();
            const token = localStorage.getItem("token");
            const { data } = await axios.post(
            `${Base_Url}/api/productOrder/retry-payment/${orderId}`,
            {},
            {
                headers: { Authorization: `Bearer ${token}` },
            }
            );
            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID,

                amount: data.razorpayOrder.amount,

                currency: data.razorpayOrder.currency,

                name: "Mel-Foresta Honey",

                description: `Order retry payment for order ${orderId}`,

                order_id: data.razorpayOrder.id,

                handler: async function(response) {
                try {
                    const res =await axios.post(
                        `${Base_Url}/api/productOrder/verify-payment`,
                        {
                            productOrderId:
                            data.orderId,

                            razorpay_order_id:
                            response.razorpay_order_id,

                            razorpay_payment_id:
                            response.razorpay_payment_id,

                            razorpay_signature:
                            response.razorpay_signature,
                        },
                        {
                            headers: {
                            Authorization: `Bearer ${token}`,
                            },
                        }
                    );
                    if(res.data.success)
                    {
                        toast.success("Payment successful. Order placed!" || res.data.message );
                    }else {
                        toast.error("Fail to pay");
                    }   
                } catch (error) {
                    toast.error(
                        error.response?.data?.message || "Payment verification failed"
                    );
                }
                }
            };

            const razor = new window.Razorpay(options);

            razor.on("payment.failed", async function (response) {

                try {

                await axios.post(
                    `${Base_Url}/api/productOrder/payment-failed`,
                    {
                    orderId:data.orderId,

                    razorpay_order_id:
                        response.error.metadata.order_id,

                    razorpay_payment_id:
                        response.error.metadata.payment_id,

                    reason:
                        response.error.description,
                    },
                    {
                    headers: {
                        Authorization:
                        `Bearer ${token}`,
                    },
                    }
                );

                } catch (error) {

                console.error(
                    "Failed to save failed payment",
                    error
                );
                }

                toast.error(
                response.error.description
                );
            });

            razor.open();
            fetchOrderDetails();
                    
        } catch (err) 
        {
            console.error(err);
            if (err.response?.status === 400) {
                toast.info(err.response.data?.message);
            } else 
            {
                toast.error(err.response?.data?.message || "Failed to pay for this order");
            }
        }
    };

    if (!orderData) return <p className="text-gray-800 text-center">Loading order details...</p>;

return(
<section className="py-3 md:py-5 px-4 md:px-8 xl:px-12 pb-10 space-y-5 lg:space-y-8">

    <button
        className="flex items-center space-x-2 mb-6 text-primary hover:underline"
        onClick={() => navigate("/orderpage", { state: { activeStep } })}
    >
        <MdKeyboardBackspace className="text-lg lg:text-xl" />
        <h2 className="text-lg md:text-xl xl:text-2xl font-semibold">Order Details</h2>
    </button>

    <div className="flex flex-col md:flex-row justify-between gap-5">
        <div className="bg-heroPrimary/50 border border-primary/20 rounded-xl p-2 py-4 md:p-4 shadow-sm w-full lg:w-1/2 flex flex-col md:flex-row justify-between gap-5 items-start md:items-center">

            <div className="flex items-center space-x-3">
                <LuBox className="text-2xl md:text-3xl lg:text-4xl text-primary" />

                <div>
                    <p className="text-sm md:text-base font-semibold text-primary">
                        Status:{" "}
                        {orderData.status === "newRequest"
                            ? "Ordered"
                            : orderData.status
                                  .replace(/([A-Z])/g, " $1")
                                  .replace(/^./, (s) => s.toUpperCase())}
                    </p>


                    <p className="text-sm md:text-base font-normal capitalize pt-2">
                        Payment:{" "}
                        <span
                            className={`font-medium ${
                            orderData.paymentStatus === "paid"
                                ? "text-green-600"
                                : orderData.paymentStatus === "pending"
                                ? "text-yellow-600"
                                : orderData.paymentStatus === "failed"
                                ? "text-red-600"
                                : orderData.paymentStatus === "refunded"
                                ? "text-blue-600"
                                : "text-gray-600"
                            }`}
                        >
                            {orderData.paymentStatus}
                        </span>
                    </p>

                    <p className="text-xs md:text-sm text-gray-800 font-medium mt-1">
                        {new Date(orderData.createdAt).toLocaleDateString("en-US", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                        })}{" "}
                        •{" "}
                        {new Date(orderData.createdAt).toLocaleTimeString("en-US", {
                            hour: "2-digit",
                            minute: "2-digit",
                        })}
                    </p>

                    <p className="text-xs md:text-sm">
                        Expected delivery : {orderData?.estimatedDeliveryDate}
                    </p>
                </div>
            </div>

            {orderData.status !== "cancelled" && (
                <div className="ml-auto">
                    {orderData.status === "delivered" ? (
                    <div className="flex flex-col justify-between gap-2">
                        <button
                            className="bg-primary text-white px-4 py-2 rounded-md text-xs lg:text-sm hover:bg-primary/90"
                            onClick={() => setShowInvoiceModel(true)}
                        >
                            Payment Summary
                        </button>
                        <button
                            className="bg-custom-gradient1 text-white px-4 py-2 rounded-md text-xs lg:text-sm hover:bg-custom-gradient1-hover"
                            onClick={() => navigate(`/ordertrack/${orderData.orderId}`)}
                        >
                            Track Order
                        </button>
                    </div>
                        
                    ) : (
                    <div className="flex flex-col justify-between gap-2">
                        <button
                            className="bg-custom-gradient1 text-white px-4 py-2 rounded-md text-xs lg:text-sm hover:bg-custom-gradient1-hover"
                            onClick={() => navigate(`/ordertrack/${orderData.orderId}`)}
                        >
                            Track Order
                        </button>
                        {((orderData.paymentStatus ==="pending" || orderData.paymentStatus ==="failed") && orderData.paymentMethod !=="cod") &&            
                            <button
                                className="bg-primary text-white px-4 py-2 rounded-md text-xs lg:text-sm hover:bg-primary/90"
                                onClick={(e) => {
                                    e.preventDefault();
                                    hanldePayNow(orderData.orderId);
                                }}
                            >
                                Pay Now
                            </button>
                        }
                    </div>
                    )}
                </div>
            )}
        </div>
    </div>


    {orderData.paymentMethod === "cod" && (
    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-center justify-center text-center">
        <p className="font-medium text-amber-800">
        This is a Cash on Delivery order. Please pay ₹{formatNumber(orderData.totalAmount)} when your order is at your doorestep.
        </p>
    </div>
    )}

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {orderData.items.map((row, idx) => (
            <div
                key={idx}
                className={`p-4 md:p-5 rounded-xl shadow-sm border ${
                    row.isCancelled
                        ? "border-red-400 bg-red-50"
                        : "border-primary/20 bg-white"
                }`}
            >
                <div className="flex space-x-4 border-b pb-4 mb-4">
                    <img
                        src={row.product?.images?.[0]}
                        className="w-24 h-24 object-cover rounded-md border"
                    />

                    <div className="flex-1 space-y-1">
                        <p className="text-sm md:text-base font-semibold text-primary">
                            {row.product.productName} 
                        </p>

                        <p className="text-xs md:text-sm text-gray-800 line-clamp-1 font-semibold">
                            {row.product.category?.name}
                        </p>

                        <p className="text-xs md:text-sm text-gray-800 line-clamp-1">
                            {row.product.description}
                        </p>

                        <p className="text-sm md:text-base font-semibold text-primary mt-2">
                            ₹{Math.round(row.price)} (₹{Math.round(row.discount)} OFF)
                        </p>
                        <p className="text-xs md:text-sm text-textPrimary">
                            Qty: {row.quantity}
                        </p>
                    </div>
                </div>

                <div className="flex justify-end space-x-3">
                    {orderData.status === "delivered" && !row.isReturned && (
                        <button
                            className="px-3 py-1 text-xs md:text-sm rounded-md bg-custom-gradient1 text-white hover:bg-custom-gradient1-hover"
                            onClick={() => {
                                setShowReturnModal(true);
                                setSelectedOrderItemId(row.id);
                            }}
                        >
                            Return Item
                        </button>
                    )}
                    {/* {(orderData.status === "newRequest" || orderData.status === "processing") &&
                        orderData.paymentStatus === "paid" &&
                        !row.isCancelled && 
                        (
                            <button
                                className="px-3 py-1 text-xs md:text-sm rounded-md bg-custom-gradient2 text-white hover:bg-custom-gradient2-hover"
                                onClick={() => {
                                    setShowCancelModal(true);
                                    setSelectedProductItemId(row.id);
                                }}
                            >
                                Cancel Item
                            </button>
                    )} */}
                </div>

                {row.isReturned && (
                    <p className="mt-3 text-sm lg:text-base text-blue-700 font-medium bg-blue-50 px-3 py-1 rounded-md">
                        This item has been returned
                    </p>
                )}

                {row.isCancelled && (
                    <p className="mt-3 text-sm text-red-700 font-medium bg-red-50 px-3 py-1 rounded-md">
                        This item has been cancelled
                    </p>
                )}

                {row.product.canReview &&
                    orderData.status === "delivered" && (
                        <form
                            className="mt-5 border rounded-lg p-4 bg-heroPrimary/40"
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleSubmitReview(row.product.id, orderData.orderId);
                            }}
                        >
                            <StarRating
                                initialRating={ratings[row.product.id] || 0}
                                onRate={(r) =>
                                    setRatings((prev) => ({
                                        ...prev,
                                        [row.product.id]: r,
                                    }))
                                }
                            />

                            <div className="flex items-center mt-3">
                                <input
                                    type="text"
                                    className="border rounded-md p-2 text-sm flex-1 focus:outline-none"
                                    placeholder="Write your review"
                                    value={reviews[row.product.id] || ""}
                                    onChange={(e) =>
                                        setReviews((prev) => ({
                                            ...prev,
                                            [row.product.id]: e.target.value,
                                        }))
                                    }
                                />
                                <button className="ml-3 px-4 py-2 text-primary border border-primary rounded-md text-sm hover:bg-primary hover:text-white transition">
                                    Submit
                                </button>
                            </div>
                        </form>
                )}
            </div>
        ))}
    </div>

    

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-10">

        <div className="md:col-span-2 bg-white border border-primary/20 rounded-xl shadow-sm p-6">
            <p className="text-base md:text-lg font-semibold text-primary mb-4">Order Summary</p>

            <div className="grid grid-cols-2 gap-y-2 text-xs md:text-sm text-gray-600">
                <p className="text-gray-800 font-medium">Order Date:</p>
                <p>{new Date(orderData.createdAt).toLocaleDateString()}</p>

                <p className="text-gray-800 font-medium">Order ID:</p>
                <p>{orderData.orderId}</p>

                <p className="text-gray-800 font-medium">Total Items:</p>
                <p>{orderData.items.length}</p>

                <p className="text-gray-800 font-medium">Payment Mode:</p>
                <p>{formatPaymentMethod(orderData.paymentMethod)}</p>
            </div>

            <hr className="my-4 border-t border-gray-400" />

            <div className="grid grid-cols-2 gap-y-2 text-xs md:text-sm">
                <p className="text-gray-800 font-medium">Subtotal:</p>
                <p>₹{formatNumber(orderData.subTotal)}</p>

                {Number(orderData.handlingCharges) > 0 &&
                    <p className="text-gray-800 font-medium">Handling Charge:</p>
                }
                {Number(orderData.handlingCharges) > 0 &&
                    <p>+₹{formatNumber(orderData.handlingCharges)}</p>
                }

                {Number(orderData.gstAmount) > 0 &&
                    <p className="text-gray-800 font-medium">GST:</p>
                }
                {Number(orderData.gstAmount) > 0 &&
                    <p>+₹{formatNumber(orderData.gstAmount)}</p>
                }
                {Number(orderData.discountAmount) > 0 &&
                    <p className="text-gray-800 font-medium">Discount:</p>
                }
                {Number(orderData.discountAmount) > 0 &&
                    <p>-₹{formatNumber(orderData.discountAmount)}</p>
                }

                {Number(orderData.couponAmount) > 0 &&
                    <p className="text-gray-800 font-medium">Coupon Discount:</p>
                }
                {Number(orderData.couponAmount) > 0 &&
                    <p>-₹{formatNumber(orderData.couponAmount)}</p>
                }

                <p className="font-semibold text-primary pt-3 border-t border-gray-400">Order Total:</p>
                <p className="font-semibold text-primary pt-3 border-t border-gray-400">
                    ₹{formatNumber(orderData.totalAmount)}
                </p>
            </div>
        </div>

        <div className="flex flex-col gap-5">

            <div className="bg-white border border-primary/20 rounded-xl shadow-sm p-6">
                <p className="text-base lg:text-lg font-semibold text-primary mb-4">Shipping To</p>

                <p className="text-xs md:text-sm text-gray-800">
                    <span className="font-medium">Name:{" "}</span>
                    <span className="text-gray-600">{capitalizeFirstLetter(orderData.user.name)}</span>
                </p>
                <p className="text-xs md:text-sm text-gray-800">
                    <span className="font-medium">Email:{" "}</span>
                    <span className="text-gray-600">{capitalizeFirstLetter(orderData.user.email)}</span>
                </p>
                <p className="text-xs md:text-sm text-gray-800">
                    <span className="font-medium">Mobile number:{" "}</span>
                    <span className="text-gray-600">{capitalizeFirstLetter(orderData.user.mobileNumber)}</span>
                </p>
                <p className="text-xs md:text-sm text-gray-800">
                    <span className="font-medium">Address:{" "}</span>
                    <span className="text-gray-600">
                    {orderData.address.buildingBlock} {orderData.address.flatNo},{" "}
                    {orderData.address.buildingName}, {orderData.address.streetName},
                    {orderData.address.landmark}, {orderData.address.city} -
                    {orderData.address.pincode}</span>
                </p>
            </div>
            {orderData?.shipment && 
            <div className="bg-white border border-primary/20 rounded-xl shadow-sm p-6">
                <p className="text-base lg:text-lg font-semibold text-primary mb-4">Shipping Details</p>

                {orderData.shipment.deliveryType === "courier" ?
                (
                    <>
                    <p className="text-xs lg:text-sm">
                        Courier company :{" "}
                        <span className="">
                        {orderData.shipment.courierCompanyName}
                        </span>
                    </p>
                    <p className="text-xs lg:text-sm">
                        Tracking:{" "}
                        <a href={orderData.shipment.trackingId} className="text-blue-600 underline">
                        {orderData.shipment.trackingId}
                        </a>
                    </p>
                    </>
                ) : orderData.shipment.deliveryType === "manual"  ? (
                    <>
                    <p className="text-xs lg:text-sm ">
                        Contact person name :{" "}
                        <span className="capitalize">
                        {orderData.shipment.deliveryPersonName}
                        </span>
                    </p>
                    <p className="text-xs lg:text-sm">
                        Contact person number :{" "}
                        <span className="">
                        {orderData.shipment.deliveryPersonContact}
                        </span>
                    </p>
                    </>
                ) :(
                    <>
                    <p className="text-xs lg:text-sm">
                        Courier company :{" "}
                        <span className="">
                        {orderData.shipment.courierCompanyName}
                        </span>
                    </p>
                    <p className="text-xs lg:text-sm">
                        Tracking:{" "}
                        <a href={orderData.shipment.trackingId} className="text-blue-600 underline">
                        {orderData.shipment.trackingId}
                        </a>
                    </p>
                    </>
                )}

                <p className="text-xs md:text-sm text-gray-800">
                    <span className="font-medium">Estimated Delivery Date:{" "}</span>
                    
                    <span className="text-gray-800 font-medium">
                    {new Date(orderData.shipment.estimatedDeliveryDate)
                        .toLocaleString("en-IN")}
                    </span>
                </p>

            
            </div>
            }
        </div>
    </div>

    <ReturnModal 
        open={showReturnModal} 
        onClose={() => setShowReturnModal(false)} 
        orderId={orderData.orderId} 
        orderItemId={selectedOrderItemId} 
    />
    <CancelModal 
        open={showCancelModal} 
        onClose={() => setShowCancelModal(false)} 
        orderId={orderData.orderId} 
        orderItemId={selectedProductItemId} 
    />

    <InvoiceModal
        open={showInvoiceModel}
        onClose={()=>setShowInvoiceModel(false)}
        orderData={orderData}
    />

</section>

);
}
