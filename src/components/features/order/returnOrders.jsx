import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { fetchReturnOrderProducts } from '../../../redux/actions/returnedOrderAction';
import capitalizeFirstLetter from '../../common/capitalizeFirstLetter';

export default function ReturnsOrders() {
  const itemsPerPage=10;
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const { returnedproduct=[],totalRecords, error } = useSelector(
    (state) => state.returnProductState
  );

  useEffect(() => {
  const fetchData = async () => {
    try {
      setLoading(true);
      dispatch(fetchReturnOrderProducts(currentPage, itemsPerPage));
    } finally {
      setLoading(false);
    }
  };

  fetchData();
  }, [dispatch,currentPage, itemsPerPage]);

  const totalPages = Math.ceil(totalRecords/ itemsPerPage);

  if (loading) {
    return <p className="text-center mt-10">Loading Return orders...</p>;
  }

  if(error){
    return(<p className="text-red-600">{error}</p>);
  }

  if(!returnedproduct){
    return <p className="text-center mt-10">Loading Return orders...</p>;
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "border-yellow-500";
      case "accepted":
        return "border-green-500";
      case "rejected":
        return "border-red-500";
      default:
        return "border-gray-400";
    }
  };

  return (
    <div className="py-4 px-4">
      {/* <h2 className="text-lg font-semibold mb-6">Returned Orders ({totalRecords})</h2> */}

      {returnedproduct.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-y-8">
          {returnedproduct.map((order, idx) => (
            <div
              key={idx}
              className={`flex flex-col md:flex-row items-center md:items-start bg-heroPrimary/40 border border-gray-300 shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow  `}
            >
              <div className={`w-2 ${getStatusColor(order.returnStatus)}`}></div>

              {/* Order Details */}
              <div className="flex-1 p-4 flex flex-col justify-between">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                  <p className="font-medium text-base">Order Id : {order.orderId}</p>
                  <p className="text-sm text-gray-500 mt-1 md:mt-0">
                    {new Date(order.createdAt).toLocaleDateString("en-US", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>

                <p className="font-semibold mt-2 text-sm md:text-base">
                  {capitalizeFirstLetter(order.orderItem.product.productName)}
                </p>

                <div className="flex flex-wrap mt-2 gap-2">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${order.returnStatus === "pending" ? "bg-yellow-100 text-yellow-800" : order.returnStatus === "accepted" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                    Return: {capitalizeFirstLetter(order.returnStatus)}
                  </span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${order.pickupStatus === "pending" ? "bg-gray-100 text-gray-700" : order.pickupStatus === "pickedUp" ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"}`}>
                    Pickup: {capitalizeFirstLetter(order.pickupStatus)}
                  </span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${order.refundStatus === "pending" ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"}`}>
                    Refund: {order.refundStatus === "pending" ? "Not Initiated" : "Completed"}
                  </span>
                </div>

                <div className="flex justify-between items-center mt-3">
                  <p className="text-sm font-medium">
                    ₹{Math.round(order.refundAmount)} Refund Amount
                  </p>
                  <button
                    className="px-3 py-1 rounded-md bg-custom-gradient1 text-white text-sm hover:bg-custom-gradient1-hover transition-colors"
                    onClick={() =>
                      navigate(`/return-order-detail/${order.id}`, { state: { activeStep: 3 } })
                    }
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center mt-10 space-y-3">
          <p className="text-gray-600 text-lg">No returned orders found.</p>
          <Link to="/">
            <button className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition-colors">
              Explore Products
            </button>
          </Link>
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-10 flex-wrap">
          <button
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
            className="px-2 py-1 text-sm rounded border hover:bg-yellow-600 hover:text-white disabled:text-gray-400"
          >
            {"<<"}
          </button>
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-2 py-1 text-sm rounded border hover:bg-yellow-600 hover:text-white disabled:text-gray-400"
          >
            {"<"}
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter((page) =>
              page === 1 ||
              page === totalPages ||
              Math.abs(currentPage - page) <= 1
            )
            .reduce((acc, page, i, arr) => {
              if (i > 0 && page - arr[i - 1] > 1) acc.push("...");
              acc.push(page);
              return acc;
            }, [])
            .map((page, i) =>
              page === "..." ? (
                <span key={`dots-${i}`} className="px-2 py-1 text-sm text-gray-500">...</span>
              ) : (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1 text-sm rounded border font-medium ${
                    currentPage === page
                      ? "bg-yellow-600 text-white"
                      : "hover:bg-pink-100"
                  }`}
                >
                  {page}
                </button>
              )
            )}

          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-2 py-1 text-sm rounded border hover:bg-yellow-600 hover:text-white disabled:text-gray-400"
          >
            {">"}
          </button>
          <button
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
            className="px-2 py-1 text-sm rounded border hover:bg-yellow-600 hover:text-white disabled:text-gray-400"
          >
            {">>"}
          </button>
        </div>
      )}
    </div>
  );
}
