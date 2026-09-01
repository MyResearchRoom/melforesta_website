import { MdKeyboardBackspace } from "react-icons/md";
import {useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import AllOrders from "./AllOrders";
import CancelledOrders from "./CancelledOrders";
import { FiChevronDown } from "react-icons/fi";
import ReturnsOrders from "./returnOrders";
export default function Section1()
{
    const navigate=useNavigate();
    const [statusFilter, setStatusFilter] = useState("");
    const [activeTab, setActiveTab] = useState(1);
    const steps = [
      { id: 1, label: "All Orders" },
      { id: 2, label: "Cancelled Orders" },
      { id: 3, label: "Returned Orders" },
    ];

    const location = useLocation();  

    const [openDropdown, setOpenDropdown] = useState(false);

    useEffect(() => {
  if (location.state?.activeStep) {
    setActiveTab(location.state.activeStep);
  }
}, [location.state]);

const statusOptions = [
  { label: "All Status", value: "All" },
  { label: "New Request", value: "newRequest" },
  { label: "Processing", value: "processing" },
  { label: "Shipped", value: "shipped" },
  { label: "Out For Delivery", value: "outForDelivery" },
  { label: "Delivered", value: "delivered" },
];


  return(
  <section className="py-5 md:py-8 px-4 md:px-8 xl:px-10 min-h-screen">
    <div className="flex flex-row items-center mb-5">
        <div className="flex flex-row space-x-2 items-center " onClick={()=>navigate(-1)}>
            <MdKeyboardBackspace className="text-sm md:text-base xl:text-lg" />
            <p className="text-sm md:text-base xl:text-lg font-medium ">My Orders</p>
        </div>        
    </div>

    <div className="flex flex-col lg:flex-row justify-between gap-4 lg:items-center mb-5">

  {/* Tabs */}
  <div className="w-full lg:w-auto overflow-x-auto scrollbar-hide">
    <div className="flex flex-row gap-3 min-w-max py-2">
      {steps.map((step) => (
        <button
          key={step.id}
          onClick={() => setActiveTab(step.id)}
          className={`px-4 py-2 rounded border border-gray-600 font-semibold whitespace-nowrap text-sm md:text-base ${
            activeTab === step.id
              ? "bg-primary text-white"
              : "bg-white text-gray-700"
          }`}
        >
          {step.label}
        </button>
      ))}
    </div>
  </div>

  {/* Filter */}
  <div className="w-full lg:w-auto flex justify-start lg:justify-end">
    {activeTab === 1 && (
      <div className="flex items-center gap-2 w-full sm:w-auto">

        <p className="font-semibold text-gray-700 whitespace-nowrap text-sm md:text-base">
          Filter by:
        </p>

        <div className="relative flex-1 sm:flex-none sm:w-56">

          {/* Selected Option */}
          <div
            onClick={() => setOpenDropdown(!openDropdown)}
            className="px-3 py-2 rounded-md border-2 border-yellow-200 bg-white cursor-pointer flex justify-between items-center"
          >
            <span className="text-sm md:text-base truncate">
              {
                statusOptions.find(
                  (item) => item.value === statusFilter
                )?.label || "All Status"
              }
            </span>

            <FiChevronDown className="text-gray-500 text-lg shrink-0" />
          </div>

          {/* Dropdown */}
          {openDropdown && (
            <div className="absolute mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden">

              {statusOptions.map((item) => (
                <div
                  key={item.value}
                  onClick={() => {
                    setStatusFilter(item.value);
                    setOpenDropdown(false);
                  }}
                  className="px-4 py-2 hover:bg-yellow-100 cursor-pointer text-sm md:text-base"
                >
                  {item.label}
                </div>
              ))}

            </div>
          )}

        </div>

      </div>
    )}
  </div>

</div>
   

    <div className="">
        {activeTab === 1 && (
          <AllOrders  statusFilter={statusFilter}/>
        )}
        {activeTab === 2 && (
          <CancelledOrders />
        )}
        {activeTab === 3 && (
          <ReturnsOrders />
        )}
    </div>
        
  </section>
  );
}