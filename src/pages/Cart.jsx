import { Link, useNavigate } from "react-router-dom";
import { MdDelete, MdKeyboardBackspace } from "react-icons/md";
import { toast } from "react-toastify";;
import { useEffect, useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartData } from "../redux/actions/cartData";
import { removeFromCart } from "../service/addToCart";
import { fetchWishlistData } from "../redux/actions/wishlistData";
import { addToWishlist } from "../service/addToWishlist";
import { decrementQuantityOfCartProduct, incrementQuantityOfCartProduct } from "../service/Incre&DecrrQuantityINCart";
import { fetchLoggedUser } from "../redux/actions/loggedUserActions";
import { X, Tag, Ticket } from "lucide-react";
import axios from "axios";
import validateCouponCode from "../service/validteCoupon";

const Base_Url = import.meta.env.VITE_BASE_URL;


// function CouponModal({ isOpen, onClose, onSelect, couponData }) {
//   const [manualCode, setManualCode] = useState("");
//   const [appliedCoupon, setAppliedCoupon] = useState(null);

//   const handleManualApply = async () => {
//     const trimmed = manualCode.trim();

//     if (!trimmed) return;

//     await applyCoupon(trimmed);

//     setManualCode("");
//   };

//   const applyCoupon = async (couponCode) => {
//     try {
//       const result = await validateCouponCode(couponCode);

//       setAppliedCoupon({
//         couponCode: result.couponCode,
//         discount: result.discount,
//       });

//       onSelect({
//         couponId: result.couponId,
//         couponCode: result.couponCode,
//         discount: result.discount,
//       });

//       setTimeout(() => {
//         setAppliedCoupon(null);
//         onClose();
//       }, 2000);

//     } catch (err) {
//       toast.error(err.message || "Invalid coupon");
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
 
//       {appliedCoupon ? (
//         <div className="flex flex-col items-center justify-center py-12 px-6 bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[80vh]">

//           <div className="animate-bounce text-6xl">
//             🎉
//           </div>

//           <h3 className="mt-4 text-xl font-bold text-green-600">
//             Coupon Applied!
//           </h3>

//           <p className="mt-2 text-gray-600">
//             Code: <span className="font-semibold">{appliedCoupon.couponCode}</span>
//           </p>

//           <p className="mt-2 text-2xl font-bold text-green-600">
//             ₹{appliedCoupon.discount} OFF
//           </p>

//           <div className="mt-4 flex gap-2 text-2xl animate-pulse">
//             ✨ ⭐ ✨ ⭐ ✨
//           </div>
//         </div>
//       ) : (
//         <>
//           <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[80vh] flex flex-col">

//               {/* Header */}
//               <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
//                 <div className="flex items-center gap-2">
//                   <Ticket className="w-5 h-5 text-yellow-500" />
//                   <h2 className="text-lg font-semibold text-gray-800">Apply Coupon</h2>
//                 </div>
//                 <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 transition">
//                   <X className="w-5 h-5 text-gray-500" />
//                 </button>
//               </div>

//               <div className="overflow-y-auto flex-1 px-4 py-4 space-y-4">

//                 {/* Manual entry — always at top */}
//                 <div>
//                   <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
//                     Enter Code Manually
//                   </p>
//                   <div className="flex gap-2">
//                     <input
//                       type="text"
//                       value={manualCode}
//                       onChange={(e) => setManualCode(e.target.value.toUpperCase())}
//                       onKeyDown={(e) => e.key === "Enter" && handleManualApply()}
//                       placeholder="Type coupon code here..."
//                       className="flex-1 border border-gray-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-yellow-400 uppercase placeholder:normal-case"
//                     />
//                     <button
//                       onClick={handleManualApply}
//                       className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white text-sm font-semibold rounded-xl transition"
//                     >
//                       Apply
//                     </button>
//                   </div>
//                 </div>

//                 {/* Divider */}
//                 <div className="flex items-center gap-3">
//                   <div className="flex-1 border-t border-gray-200" />
//                   <p className="text-xs text-gray-400">or choose from below</p>
//                   <div className="flex-1 border-t border-gray-200" />
//                 </div>

//                 {/* Coupon list */}
//                 <div className="space-y-3">
//                   <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
//                     Available Coupons
//                   </p>
//                   {couponData.map((coupon) => (
//                     <button
//                       key={coupon.id}
//                       onClick={() => applyCoupon(coupon.code)}
//                       className="w-full text-left border border-yellow-200 rounded-xl p-4 hover:bg-yellow-50 hover:border-yellow-400 transition"
//                     >
//                       <p className="font-semibold text-gray-800 text-sm">{coupon.name}</p>
//                       <p className="text-gray-500 text-xs mt-0.5">{coupon.description}</p>
//                       <span className="inline-block mt-2 px-3 py-1 rounded-lg bg-yellow-100 border border-dashed border-yellow-400 text-yellow-700 font-bold text-xs tracking-widest">
//                         {coupon.code}
//                       </span>
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             </div>

//         </>
//       )}
//     </div>
//   );
// }

export default function CartPage() {
  const navigate=useNavigate();
  const [loading, setLoading] = useState(false);
  // const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);
  // const [selectedCoupon, setSelectedCoupon] = useState(null);

  const {cartData=[], carterror,}=useSelector((state)=>state.cartState);

  // const [couponData, setCouponData] = useState([]);

  // useEffect(() => {
  //   const fetchCoupons = async () => {
  //     try {
  //       const token = localStorage.getItem("token");

  //       const res = await axios.get(
  //         `${Base_Url}/api/coupon/getValidCoupons`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         }
  //       );

  //       if (res.data.success) {
  //         setCouponData(res.data.coupons || []);
  //       }
  //     } catch (err) {
  //       console.error("Failed to fetch coupons", err);
  //     }
  //   };

  //   fetchCoupons();
  // }, []);

  const calculateCartTotals = () => {
    const totals = cartData.reduce(
      (totals, item) => {
        const originalPrice = parseFloat(item.originalPrice) || 0;
        const discountedPrice = parseFloat(item.discountedPrice) || 0;
        const quantity = parseInt(item.quantity) || 0;

        const gstPercent = parseFloat(item.product?.gstPercent) || 0;
        const handlingCharge = parseFloat(item.product?.handlingCharges) || 0;

        const itemSubtotal = originalPrice * quantity;
        const discountedSubtotal = discountedPrice * quantity;
        const itemDiscount = (originalPrice - discountedPrice) * quantity;
        const itemGst = (discountedSubtotal * gstPercent) / 100;
        const itemHandling = handlingCharge * quantity;

        return {
          subtotal: totals.subtotal + itemSubtotal,
          discount: totals.discount + itemDiscount,
          totalGst: totals.totalGst + itemGst,
          totalHandling: totals.totalHandling + itemHandling,
          grandTotal:
            totals.grandTotal +
            discountedSubtotal +
            itemGst,
        };
      },
      {
        subtotal: 0,
        discount: 0,
        totalGst: 0,
        totalHandling: 0,
        grandTotal: 0,
      }
    );

    // if(selectedCoupon?.discount > 0 ){
    //   totals.grandTotal -= selectedCoupon.discount;
    // }

    if (totals.subtotal < 1000) {
      totals.grandTotal += totals.totalHandling;
    }

    return totals;
  };

  const {
    subtotal,
    discount,
    totalGst,
    totalHandling,
    grandTotal,
  } = calculateCartTotals();

  const dispatch=useDispatch();

  const { user, error } = useSelector(
      (state) => state.loggedUserState
  );

  useEffect(() => {
    const fetchData = async () => {
      dispatch(fetchLoggedUser());  
    };
    fetchData();
  }, [dispatch]);

  const {wishlistData=[], wishlisterror,}=useSelector((state)=>state.wishlistState);
    
  const isInWishlist = (productId) => {
    return wishlistData.some(item => item.product.id === productId);
  };
      
  useEffect(() => {
      const fetchData = async () => {
        try {
          setLoading(true);
          await dispatch(fetchCartData());
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
    }, [dispatch]);

  const RemoveFromCart=(productId,variantId)=>{
    dispatch(removeFromCart(productId,variantId));
  }

  const MOveTOWishlist = (productId,variantId) => {  
    dispatch(addToWishlist(productId));
    dispatch(removeFromCart(productId,variantId,false));
  };

  const UpdateQuantity = (id, type,variantId) => {
    if (type === "increment") {
      dispatch(incrementQuantityOfCartProduct(id,variantId));
    } else if (type === "decrement") {
      dispatch(decrementQuantityOfCartProduct(id,variantId));
    }
  };

  const handleCouponSelect = (coupon) => {
    setSelectedCoupon(coupon);
    console.log("Applied Coupon:", coupon);
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#fffaf0] to-[#fef3c7] px-4">
        
        <div className="bg-white shadow-xl rounded-2xl p-8 md:p-10 max-w-md w-full text-center border border-yellow-100">
          
          <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-full bg-yellow-100 text-yellow-600 text-2xl mb-4">
            🔒
          </div>

          <h2 className="text-2xl md:text-3xl font-semibold text-[#3E2C1C]">
            Login Required
          </h2>

          <p className="mt-3 text-gray-500 text-sm md:text-base">
            Please sign in to continue and access this page.  
            It only takes a moment ✨
          </p>

          <button
            onClick={() => navigate("/login")}
            className="mt-6 w-full py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-medium rounded-lg transition duration-300 shadow-sm"
          >
            Go to Login
          </button>

          {/* Optional secondary link */}
          <p className="mt-4 text-sm text-gray-400">
            Don’t have an account?{" "}
            <span
              onClick={() => navigate("/signup")}
              className="text-yellow-600 cursor-pointer hover:underline"
            >
              Sign up
            </span>
          </p>

        </div>
      </div>
    );
  }

  if(carterror)
  {
    if(user)
    return(
      <p className="text-red-600">Cart error : {carterror}</p>
    );
  }

  if(wishlisterror)
  {
    if(user)
    return(
      <p className="text-red-600">Wishlist error : {wishlisterror}</p>
    );
  }

  {error && (
  <p className="text-red-600">
    {typeof error === "string" ? error : error.message || "Something went wrong"}
  </p>
  )}

  return (
    <div className="px-4 md:px-6 lg:px-8 py-6 bg-gray-100 min-h-screen">
      
      <div className="flex items-center gap-2 mb-6 cursor-pointer" onClick={() => navigate(-1)}>
        <MdKeyboardBackspace className="text-xl" />
        <p className="font-semibold text-lg">Your Cart</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">

        <div className="flex-1 space-y-4">
        {loading ? (
          Array.from({ length: 4 }).map((_, index) => (
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
          ))
        ) : ( cartData.length === 0 ? (
            <div className="text-center">
              <p className="text-gray-600">Your cart is empty</p>
              <Link to="/productpage">
                <button className="mt-4 px-4 py-2 bg-custom-gradient2 hover:bg-custom-gradient2-hover text-white rounded">
                  Continue Shopping
                </button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {cartData.map((item) => (
              <div
                key={item.id}
                className="bg-white p-2 md:p-3 lg:p-4 rounded-lg shadow flex flex-col gap-4"
              >
                <div className="flex justify-between space-x-3 md:space-x-4 xl:space-x-5 flex-row">
                    <Link to={`/productdetail/${item.product?.id}`}>
                    <img
                        src={item.product?.images?.[0].image}
                        alt={item.product?.productName}
                        className="w-28 h-28 object-cover rounded"
                    />
                    </Link>

                    
                    <div className="flex flex-col justify-between flex-1">
                    <Link to={`/productdetail/${item.product?.id}`}>
                    <div>
                        <p className="font-semibold text-gray-800 text-sm md:text-base">
                        {item.product?.productName}
                        </p>
                        <p className="text-gray-500 text-xs md:text-sm">
                        Category: {item.product?.category?.name}
                        </p>

                        <p className="text-gray-500 text-xs md:text-sm">
                        Weight: {item.selectedWeight ?? "-"}
                        </p>

                        <div className="flex items-center gap-2 mt-1 justify-between">
                            <p className="font-semibold text-gray-800">
                                ₹{Math.round(item.discountedPrice)}
                            </p>
                            {Number(item.discountPercent)>0 &&
                              <p className="text-gray-400 line-through text-sm">
                                ₹{Math.round(item.originalPrice)}
                              </p>
                            }
                            {Number(item.discountPercent)>0 &&
                            <p className="text-green-600 font-semibold text-xs">
                                {Math.round(item.discountPercent)}% OFF
                            </p>
                            }
                        </div>
                    </div>
                    </Link>
                    <div className="flex flex-col items-start mt-1">
                        <div className="flex items-center border border-gray-400/80 rounded-md overflow-hidden">
                            <button 
                              className={`px-3 py-0.5 lg:py-1
                                ${item.quantity < 2 ? "cursor-not-allowed" : "cursor-pointer"}`}
                              onClick={() => UpdateQuantity(item.product?.id, "decrement",item.variantId)}
                              disabled={item.quantity <= 1}
                            >
                              -
                            </button>
                            <span className="px-3 py-0.5 lg:py-1 border-x border-gray-400/80">{item.quantity}</span>
                            <button 
                              className="px-3 py-0.5 lg:py-1"
                              // disabled={item.quantity===item.totalAvailableStock}
                              onClick={() => UpdateQuantity(item.product?.id, "increment",item.variantId)}
                            >
                              +
                            </button>
                        </div>
                    </div>
                    </div>
                </div>

                <div className="flex flex-row justify-between">
                    <button 
                      onClick={() => {
                      if (isInWishlist(item.product?.id)) {
                        toast.info("Already in wishlist");
                      } else {
                        MOveTOWishlist(item.product?.id,item.variantId);
                      }
                      }} 
                      className="flex flex-row space-x-2 items-center justify-center w-1/2 cursor-pointer text-sm md:text-base lg:text-base"
                    >
                        <AiOutlineHeart/>
                        <p className="text-start">Move to Wishlist</p>
                    </button>
                    <button 
                      onClick={() => RemoveFromCart(item.product?.id,item.variantId)}
                      className="flex flex-row space-x-2 items-center justify-center w-1/2 cursor-pointer text-sm md:text-sm lg:text-base text-red-500"
                    >
                        <MdDelete/>
                        <p className="">Remove</p>
                    </button>
                </div>
              </div>
            
            ))}
            </div>
          ))}
        </div>

        {cartData.length > 0 && (
          <div className="lg:w-1/3 bg-white p-6 rounded-lg shadow h-max space-y-4">
            <h3 className="text-lg font-semibold">Order Summary</h3>

            <div className="bg-yellow-100 text-yellow-800 border border-yellow-300 rounded-lg py-2 text-center font-semibold my-2 text-sm md:text-base">
              🚚 Get FREE shipping on purchases above ₹1,000.
            </div>

            {/* {selectedCoupon ? (
              <div className="flex items-center justify-between px-4 py-3 rounded-xl border border-yellow-400 bg-yellow-50">
                <div className="flex flex-col gap-1">
                  <p className="text-xs text-gray-500">Coupon Applied</p>
                  <span className="inline-block px-3 py-0.5 rounded-lg bg-yellow-100 border border-dashed border-yellow-400 text-yellow-700 font-bold text-xs tracking-widest w-fit">
                    {selectedCoupon.couponCode}
                  </span>
                  <p className="text-xs text-green-600 font-medium">You have saved Rs.{Number(selectedCoupon.discount)}</p>
                </div>
                <button
                  onClick={() => setSelectedCoupon(null)}
                  className="p-1.5 rounded-lg hover:bg-yellow-100 transition"
                >
                  <X className="w-4 h-4 text-gray-500" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsCouponModalOpen(true)}
                className="w-full flex items-center justify-between px-4 py-3 rounded-xl border border-dashed border-yellow-400 bg-yellow-50 hover:bg-yellow-100 transition"
              >
                <div className="flex items-center gap-2 text-yellow-700 font-semibold text-sm">
                  <Tag className="w-4 h-4" />
                  Apply Coupon
                </div>
                <span className="text-yellow-600 text-xs font-medium">View all offers →</span>
              </button>
            )} */}

            {/* Item list */}
            <div>
              <ul className="pl-5">
                {cartData.map((item) => (
                  <li key={item.id} className="list-disc">
                    <div className="flex flex-row justify-between items-start">
                      <p className="font-normal text-xs md:text-sm xl:text-base">
                        {item.product?.productName} x {item.quantity}
                      </p>
                      <p className="font-normal text-xs md:text-sm xl:text-base">
                        ₹{Math.round(item.discountedPrice * item.quantity)}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Totals */}
            <div className="space-y-2 text-sm border-t-2 pt-3">
              <div className="flex justify-between">
                <p>Total Item:</p>
                <p>{cartData.length} items</p>
              </div>
              <div className="flex justify-between">
                <p>Subtotal amount:</p>
                <p>₹{Number(subtotal.toFixed(2))}</p>
              </div>
              {Number(totalGst) > 0 && (
                <div className="flex justify-between">
                  <p>GST amount:</p>
                  <p>₹{Number(totalGst.toFixed(2))}</p>
                </div>
              )}
              {Number(totalHandling) > 0 && Number(subtotal) < 1000 && (
                <div className="flex justify-between">
                  <p>Shipping charges:</p>
                  <p>₹{Number(totalHandling.toFixed(2))}</p>
                </div>
              )}
              {Number(subtotal) >= 1000 && (
                <div className="flex justify-between">
                  <p>Shipping charges:</p>
                  <p>Free</p>
                </div>
              )}
              {Number(discount) > 0 && (
                <div className="flex justify-between">
                  <p>Discount Amount:</p>
                  <p>- ₹{Number(discount.toFixed(2))}</p>
                </div>
              )}

              {/* {Number(selectedCoupon?.discount)>0 && (
                <div className="flex justify-between">
                  <p>Coupon Discount:</p>
                  <p>- ₹{Number(selectedCoupon?.discount.toFixed(2))}</p>
                </div>
              ) 
              } */}
              <div className="flex justify-between border-t-2 pt-3">
                <p>Total (Payable amount):</p>
                <p>₹{Number(grandTotal.toFixed(2))}</p>
              </div>
            </div>

            <button
              className="w-full bg-custom-gradient2 text-white py-2 rounded mt-2"

              onClick={() =>
                navigate("/checkout", {
                  // state: {
                  //   selectedCoupon,
                  // },
                })
              }
            >
              Proceed to Checkout
            </button>

            <button
              className="w-full border border-primary text-primary py-2 rounded mt-2"
              onClick={() => navigate("/productpage")}
            >
              Add More Items
            </button>
          </div>
        )}
      </div>

      {/* <CouponModal
        isOpen={isCouponModalOpen}
        onClose={() => setIsCouponModalOpen(false)}
        onSelect={handleCouponSelect}
        couponData={couponData}
      /> */}
    </div>
  );
}
