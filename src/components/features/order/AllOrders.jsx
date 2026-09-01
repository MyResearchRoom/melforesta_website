import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import capitalizeFirstLetter from "../../common/capitalizeFirstLetter";
import { useDispatch, useSelector } from 'react-redux';
import { fetchProcessedProducts } from '../../../redux/actions/orderProductProcessaction';
import { PAYMENT_STATUS_CONFIG } from "../../common/formatePaymentStatus";
export default function AllOrders({ statusFilter }) {
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      await dispatch(fetchProcessedProducts(statusFilter));
      setLoading(false);
    };
    fetch();
  }, [dispatch, statusFilter]);
      
  const {  processedproducts = [], error } = useSelector(
    (state) => state.processProductState
  );

  
  if (loading) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="bg-white p-4 rounded-lg shadow animate-pulse flex flex-col gap-4"
        >
          <div className="flex gap-4">
            
            {/* Image */}
            <div className="w-28 h-28 bg-gray-200 rounded"></div>

            {/* Content */}
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/3"></div>

              <div className="flex gap-3 mt-2">
                <div className="h-4 w-16 bg-gray-200 rounded"></div>
                <div className="h-4 w-12 bg-gray-200 rounded"></div>
                <div className="h-4 w-10 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <div className="h-8 w-1/2 bg-gray-200 rounded"></div>
            <div className="h-8 w-1/2 bg-gray-200 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
    
  if (error) return <p className="text-red-500">Product order error: {error}</p>;


  return (
    <div className="py-6 px-2 lg:px-0">
      {processedproducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 lg:gap-y-8">
          {processedproducts.map((order, idx) => {
            const displayedImages = order.items.slice(0, 2);
            const extraCount = order.items.length - displayedImages.length;
            const paymentStatus =
                PAYMENT_STATUS_CONFIG[order.paymentStatus] || {
                  label: order.paymentStatus,
                  textColor: "text-gray-600",
                };

            return (
            <div
              key={idx}
              className="border border-gray-200 rounded-2xl bg-white shadow-sm hover:shadow-md transition-all duration-300 p-4"
            >

              {/* Top Section */}
              <div className="flex flex-col gap-3 border-b pb-4">

                {/* Order Info */}
                <div className="flex flex-row items-center justify-between gap-3">

                  <div className="min-w-0">
                    <p className="font-semibold text-gray-800 text-sm md:text-base break-words">
                      Order #{order.orderId}
                    </p>

                    <p className="text-xs md:text-sm text-gray-500 mt-1">
                      Placed on{" "}
                      {new Date(order.createdAt).toLocaleDateString("en-US", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>

                  {/* Status */}
                  <div className="w-fit">
                    <span
                      className={`px-3 py-1 text-xs md:text-sm rounded-full border font-medium capitalize whitespace-nowrap ${
                        order.status === "delivered"
                          ? "bg-green-100 text-green-700 border-green-600"
                          : order.status === "cancelled"
                          ? "bg-red-100 text-red-700 border-red-600"
                          : "bg-yellow-50 text-yellow-600 border-yellow-600"
                      }`}
                    >
                      {order.status === "newRequest"
                        ? "Ordered"
                        : capitalizeFirstLetter(order.status)}
                    </span>

                    <p className="text-sm md:text-base font-normal capitalize pt-2">
                      Payment:{" "}
                      <span
                        className={`font-medium ${paymentStatus.textColor}`}
                      >
                        {paymentStatus.label}
                      </span>
                    </p>
                  </div>

                </div>

                {/* Product Images */}
                <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pt-1">

                  {displayedImages.map((item, i) => (
                    <div
                      key={i}
                      className="min-w-[56px] w-14 h-14 rounded-lg overflow-hidden border bg-white"
                    >
                      <img
                        src={item.product.images?.[0].image || ""}
                        alt={item.product.productName || "Product"}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}

                  {extraCount > 0 && (
                    <div className="min-w-fit text-xs md:text-sm text-gray-600 font-medium px-2">
                      +{extraCount} more
                    </div>
                  )}

                </div>

              </div>

              {/* Bottom Section */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4">

                <div className="text-sm md:text-base text-gray-700">
                  Total Items:{" "}
                  <span className="font-semibold">
                    {order.items.length}
                  </span>
                </div>

                <button
                  className="w-full sm:w-auto px-4 py-2 text-sm rounded-lg border border-blue-600 bg-blue-50 text-blue-700 hover:bg-blue-100 transition"
                  onClick={() =>
                    navigate(`/orderdetail/${order.orderId}`, {
                      state: { activeStep: 1 },
                    })
                  }
                >
                  View Details
                </button>

              </div>

            </div>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg mb-4">
            You have no orders yet.
          </p>
          <Link to="/">
            <button className="px-5 py-2 bg-yellow-600 text-white rounded-md">
              Shop Now
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
