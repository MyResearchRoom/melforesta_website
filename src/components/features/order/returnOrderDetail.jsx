import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import DevicePhotosModal from '../../../model/devicePhotoModel';
import { MdKeyboardBackspace } from 'react-icons/md';
import { toast } from 'react-toastify';
import axios from 'axios';
import capitalizeFirstLetter from '../../common/capitalizeFirstLetter';
import formatPaymentMethod from '../../common/formatePaymentMethod';
import TableComponent from "../../common/tableComponent";;
const Base_Url = import.meta.env.VITE_BASE_URL;

function formatNumber(value) {
  const num = Number(value);
  return num % 1 === 0 ? num : num.toFixed(2);
}
export default function ReturnOrderDetail() {
    const {id}=useParams();
    const [returnProduct,setRetunrProduct]=useState(null);
    const navigate=useNavigate();
    const location = useLocation();
    const activeStep = location.state?.activeStep || 3;

    const [modalPhotoOpen, setModalPhotoOpen] = useState(false);
    const [selectedMedia,setSelectedMedia]=useState([]);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const [pickupPerson, setPickupPerson] = useState(null);

    useEffect(() => {
    const fetchProductDetails = async () => {
    if (!id) return;

    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `${Base_Url}/api/returnProductOrder/getReturnedProductById/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        setRetunrProduct(res.data.data);   
        if (res.data.data.pickupPersonId) {
          fetchPickupPerson(res.data.data.pickupPersonId, token);
        }
 
      } else {
        toast.error(res.data.message || "Failed to fetch product details");
      }
    } catch (err) {
      console.error("❌ Fetch return order product error:", err);
      toast.error(err.response?.data?.message || "Failed to load product details of cancel order");
    }
  };

  fetchProductDetails();
    }, [id]);

  const fetchPickupPerson = async (personId, token) => {
    try {
      const res = await axios.get(`${Base_Url}/api/auth/getStaffDetails/${personId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.success) {
        setPickupPerson(res.data.data);      
      } else {
        toast.error(res.data.message || "Failed to fetch pickup person details");
      }
    } catch (err) {
      console.error("❌ Fetch pickup person error:", err);
      toast.error(err.response?.data?.message || "Failed to load pickup person details");
    }
  };

    const columns = [
          {
            label: "Product Name",
            field: "productName",
            headerClassName: "text-left pl-2 border-l border-t border-b border-[#d3cccc]",
            className: "text-sm xl:text-base text-left pl-2 border-l border-[#d3cccc]",
            render: (row) => (
              <div className="flex flex-row space-x-4 items-center">
                <img 
                  src={row.product.images?.[0].image} 
                  alt={row.product.productName} 
                  className="hidden md:block w-20 h-16 rounded-md" 
                />
                <p>{capitalizeFirstLetter(row.product.productName)}</p>
              </div>
            ),
          },
          { 
            label: "Quantity", 
            field: "quantity", 
            headerClassName: "text-left pl-2 border-t border-b border-[#d3cccc]", 
            className: "lg:text-left md:text-center text-sm xl:text-base text-left pl-2" 
          },
          { 
            label: "Price", 
            field: "price",
            headerClassName: "text-left pl-2 border-t border-b border-[#d3cccc]", 
            className: "text-sm xl:text-base text-left pl-2", 
            render: (row) => `₹${formatNumber(row.price)}` 
          },
          { 
            label: "Discount Price", 
            field: "discountPrice", 
            headerClassName: "text-left pl-2 border-t border-b border-[#d3cccc]", 
            className: "lg:text-left md::text-center text-sm xl:text-base text-left pl-2", 
            render: (row) => `₹${formatNumber(row.discount)}` 
          },
          { 
            label: "Final Price", 
            field: "finalPrice", 
            headerClassName: "border-t border-b border-r border-[#d3cccc] text-left", 
            className: "border-[#d3cccc] border-r", 
            render: (row) => `₹${formatNumber(row.totalPrice)}` },
    ];

    const ProductCard = ({ item }) => (
      <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
        <div className="flex gap-3">
         
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-800 break-words">
              {capitalizeFirstLetter(
                item.product.productName
              )}
            </h3>

            <div className="grid grid-cols-2 gap-y-3 mt-3 text-sm">
              <div>
                <p className="text-gray-500">
                  Quantity
                </p>
                <p className="font-medium">
                  {item.quantity}
                </p>
              </div>

              <div>
                <p className="text-gray-500">
                  Price
                </p>
                <p className="font-medium">
                  ₹{formatNumber(item.price)}
                </p>
              </div>

              <div>
                <p className="text-gray-500">
                  Discount
                </p>
                <p className="font-medium">
                  ₹{formatNumber(item.discount)}
                </p>
              </div>

              <div>
                <p className="text-gray-500">
                  Final Price
                </p>
                <p className="font-semibold text-green-600">
                  ₹{formatNumber(item.totalPrice)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );

    if (!returnProduct) {
      return <div className="text-center text-gray-500 mt-10">Loading return product details</div>;
    }

  return (
    <section className="px-5 md:px-6 lg:px-14 py-5 bg-white-100 min-h-screen">   
        <button 
          className="flex flex-row space-x-2 items-center" 
           onClick={() => navigate("/orderpage", { state: { activeStep } })}
        >
            <MdKeyboardBackspace className="text-base md:text-lg xl:text-xl" />
            <h2 className="text-base md:text-lg xl:text-xl font-bold">Return Order detail</h2>
        </button>

        <div className='bg-yellow-50 p-4 rounded-xl mt-6 '>

        <div className='pt-4 flex flex-col md:flex-row justify-between items-start gap-2 md:gap-5'>
            <div className='flex flex-col space-y-1 font-medium w-full md:w-2/3'>
              <p className='text-sm lg:text-base'>Order id : {returnProduct.orderId}</p>
              <p className='text-sm lg:text-base pb-2'>Return reason : {returnProduct.reason}</p>
            </div>
            <div className='w-full flex flex-col space-y-2 items-start md:items-end md:w-1/3'>  
              <p className='font-medium'>
                Return Status :{" "}
                <span
                  className={`border rounded-md shadow font-medium bg-white px-3 py-1 ${
                    returnProduct.returnStatus === "pending"
                    ? "border-yellow-500 text-yellow-500"
                    : returnProduct.returnStatus === "accepted"
                    ? "border-green-500 text-green-500"
                    : returnProduct.returnStatus === "rejected"
                    ? "border-red-500 text-red-500"
                    : "border-gray-400 text-gray-400"
                  }`}
                >
                  {capitalizeFirstLetter(returnProduct.returnStatus)}
                </span>
              </p>
              <div className="flex flex-row justify-end space-x-2">
                    <p className="text-sm xl:text-base text-black font-medium">
                        Photos / Video uploded :
                    </p>
                    {returnProduct.images.length > 0 ? (
                      <button 
                          onClick={() => {
                                setModalPhotoOpen(true);
                                setSelectedMedia(returnProduct.images)
                          }}
                        className='border rounded-md border-[#A63F40] text-[#A63F40] px-2 py-0.5text-xs md:text-sm xl:text-base bg-white'
                      >
                        View
                      </button>
                    ) :(
                      <p className='text-xs md:text-sm xl:text-base text-black text-center'>No Media Available</p>
                    )
                  }
                    
               </div>
            </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-2 py-4'>
          <div className="bg-white rounded-md shadow border p-3 text-sm xl:text-base">
                <p className="text-sm xl:text-base text-[#A63F40] font-medium mb-2">Customer Detail</p>
                <p>Name: {capitalizeFirstLetter(returnProduct.user.name)}</p>
                <p>Mobile: {returnProduct.user.mobileNumber || "-"}</p>
                <p>Email: {returnProduct.user.email || "-"}</p>
                <p className="break-words">
                  Address: {`${returnProduct.order.address.buildingBlock.toUpperCase()} - ${returnProduct.order.address.flatNo}, ${returnProduct.order.address.buildingName}, ${returnProduct.order.address.landmark||""}, ${returnProduct.order.address.streetName||""}, ${returnProduct.order.address.city}, ${returnProduct.order.address.state}, ${returnProduct.order.address.pincode}`}
                </p>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
            <div className="bg-white rounded-md shadow border p-3">
                    <p className="text-sm xl:text-base text-[#A63F40] font-medium mb-2">Payment Detail</p>
                    <p className='text-sm xl:text-base'>
                        Payment Mode: {formatPaymentMethod(returnProduct.order.paymentMethod)}
                    </p>
                    {/* <p className='text-sm xl:text-base font-medium'>
                        Refund status: {capitalizeFirstLetter(returnProduct.refundStatus)}
                    </p> */}
                    <p className='text-sm xl:text-[15px] font-normal py-1.5'> Refund Status :{" "}
                      <span
                      className={`font-medium ${
                        returnProduct.refundStatus === "pending" 
                        ? "text-blue-500"    
                        : "text-green-500"   
                      }`}
                      >
                        {returnProduct.refundStatus==="pending"? "Not Initiated" : "Refund Completed"}
                      </span>
                    </p>
                    <p className='text-sm xl:text-base font-medium'>
                        Refund amount: ₹ {formatNumber(returnProduct.refundAmount)}
                    </p>
            </div>
          
            <div className="bg-white rounded-md shadow border p-3 flex flex-col space-y-2">
              <p className="text-sm xl:text-base text-[#A63F40] font-medium mb-2">
                Pick up detail
              </p>
              {returnProduct.pickupPersonId === null ? 
              (
                <p className="text-left text-sm xl:text-base">You Will get Detail when pickup assign</p>
              ) : pickupPerson ? (
                <div className="text-sm xl:text-base">
                  <p className='font-medium'>Date: {new Date(returnProduct.createdAt).toLocaleDateString("en-US", 
                    {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                    })} till {returnProduct.pickUpTime}</p>
                  <p>Name: {capitalizeFirstLetter(pickupPerson.name)}</p>

                  <p>Mobile: {pickupPerson.mobileNumber || '-'}</p>

                  <p className='break-words'>Email: {pickupPerson.email || '-'}</p>

                  <p className='text-sm xl:text-[15px] font-normal py-1.5'>
                    Pickup Status:{" "}
                    <span
                      className={`font-medium ${
                        returnProduct.pickupStatus === "pending"
                          ? "text-yellow-500"
                          : returnProduct.pickupStatus === "pickedUp"
                          ? "text-blue-600"
                          : returnProduct.pickupStatus === "completed"
                          ? "text-green-500"
                          : "text-gray-500"
                      }`}
                    >
                      {returnProduct.pickupStatus === "pending"
                        ? "In Progress"
                        : returnProduct.pickupStatus === "pickedUp"
                        ? "In PickedUp"
                        : returnProduct.pickupStatus === "completed"
                        ? "Completed"
                        : "Unknown"}
                    </span>
                  </p>

                </div>
              ) : (
                <p className="text-gray-500 text-sm">Loading pickup person details...</p>
              )}
            </div>
          </div>
            
        </div>

        <div className='hidden md:flex mt-2'>
            <TableComponent
                columns={columns} 
                data={[returnProduct.orderItem]} 
                headerBg="bg-[#f6f6f6]" 
            />
        </div>

        <div className="md:hidden">
          <ProductCard
            item={returnProduct.orderItem}
          />
        </div>

        

        <DevicePhotosModal
          isOpen={modalPhotoOpen}
          onClose={() => setModalPhotoOpen(false)}
          device={{ issue_photos: selectedMedia }} 
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
        />

          </div>
    </section>
  )
}
