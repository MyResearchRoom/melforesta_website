import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link} from 'react-router-dom';
import { fetchCancelOrderProducts } from '../../../redux/actions/cancelOrderAction';

function formatNumber(value) {
  const num = Number(value);
  return num % 1 === 0 ? num : num.toFixed(2);
}

export default function CancelledOrders() {
  const itemsPerPage=10;
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const dispatch=useDispatch();

  const { canceledproduct=[],totalRecords, error } = useSelector(
    (state) => state.cancleProductState
  );

  useEffect(() => {
  const fetchData = async () => {
    try {
      setLoading(true);
      dispatch(fetchCancelOrderProducts(currentPage, itemsPerPage));
    } finally {
      setLoading(false);
    }
  };

  fetchData();
  }, [dispatch,currentPage, itemsPerPage]);

  const totalPages = Math.ceil(totalRecords/ itemsPerPage);

  if (loading) {
    return <p className="text-center mt-10">Loading Cancel orders...</p>;
  }

  if(error){
    return(<p className="text-red-600">{error}</p>);
  }

  return (
    <div className="py-4 px-3">

      {canceledproduct.length > 0 ? (
       <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-8">

  {canceledproduct.map((row, idx) => (
    <div
      key={idx}
      className="flex flex-col sm:flex-row gap-4 bg-heroPrimary/40 border border-gray-300 rounded-xl p-4 shadow-sm hover:shadow-md transition"
    >

      {/* Image */}
      <div className="w-full sm:w-40 md:w-44 lg:w-40 xl:w-44 shrink-0">
        <div className="w-full aspect-square rounded-lg overflow-hidden bg-white border">
          <img
            src={row.orderItem.product.images?.[0]}
            alt={row.orderItem.product.productName}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-between min-w-0">

        <div>

          {/* Top */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">

            <p className="text-sm md:text-base font-semibold break-words">
              Order ID: {row.orderId}
            </p>

            <span
              className={`w-fit px-3 py-1 text-xs md:text-sm rounded-xl border font-medium ${
                row.status === "pending"
                  ? "bg-blue-100 text-blue-600 border-blue-600"
                  : "bg-green-100 text-green-600 border-green-600"
              }`}
            >
              {row.status === "pending"
                ? "Refund Not Initiated"
                : "Refund Completed"}
            </span>

          </div>

          {/* Product Name */}
          <p className="mt-2 text-sm md:text-base font-semibold text-gray-800 line-clamp-2">
            {row.orderItem.product.productName}
          </p>

          {/* Details */}
          <div className="mt-2 space-y-1">
            <p className="text-xs md:text-sm text-gray-600">
              Quantity: {row.orderItem.quantity}
            </p>

            <p className="text-xs md:text-sm text-gray-600">
              Refund Amount: ₹{formatNumber(row.refundAmount)}
            </p>

            <p className="text-xs md:text-sm text-gray-600">
              Cancelled On:{" "}
              {new Date(row.createdAt).toLocaleDateString("en-US", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </p>
          </div>

        </div>

        {/* Reason */}
        <div className="mt-4 border-t pt-3">
          <p className="text-sm md:text-base text-gray-700">
            <span className="font-semibold">Cancel Reason:</span>{" "}
            <span className="break-words">{row.reason}</span>
          </p>
        </div>

      </div>
    </div>
  ))}

</div>
      ) : (
        <div className="text-gray-600 flex flex-col items-center justify-center py-12 space-y-4 w-full">
          <p className="text-lg font-medium">No Cancelled Orders Found</p>
          <Link to="/">
            <button className="px-5 py-2.5 bg-custom-gradient1 text-white rounded-md shadow-sm hover:bg-custom-gradient1-hover transition">
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
