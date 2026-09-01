import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import OrderConfirmedModal from "../../../model/orderConfirm";
import { fetchCartData } from "../../../redux/actions/cartData";
import { useDispatch, useSelector } from "react-redux";
import { decrementQuantityOfCartProduct, incrementQuantityOfCartProduct } from "../../../service/Incre&DecrrQuantityINCart";
import { removeFromCart } from "../../../service/addToCart";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import axios from "axios";
import formatPaymentMethod from "../../../components/common/formatePaymentMethod";
import capitalizeFirstLetter from "../../common/capitalizeFirstLetter";
import { loadRazorpayScript } from "../../../service/razorpay";
import { X, Tag, Ticket } from "lucide-react";
import validateCouponCode from "../../../service/validteCoupon";

const Base_Url = import.meta.env.VITE_BASE_URL;

function formatNumber(value) {
  const num = Number(value);
  return num % 1 === 0 ? num : num.toFixed(2);
}


function CouponModal({ isOpen, onClose, onSelect, couponData }) {
  const [manualCode, setManualCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  const handleManualApply = async () => {
    const trimmed = manualCode.trim();
    if (!trimmed) return;
    await applyCoupon(trimmed);
    setManualCode("");
  };

  const applyCoupon = async (couponCode) => {
    try {
      const result = await validateCouponCode(couponCode);

      setAppliedCoupon({
        couponCode: result.couponCode,
        discount: result.discount,
      });

      onSelect({
        couponId: result.couponId,
        couponCode: result.couponCode,
        discount: result.discount,
      });

      setTimeout(() => {
        setAppliedCoupon(null);
        onClose();
      }, 2000);
    } catch (err) {
      toast.error(err.message || "Invalid coupon");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      {appliedCoupon ? (
        <div className="flex flex-col items-center justify-center py-12 px-6 bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[80vh]">
          <div className="animate-bounce text-6xl">🎉</div>
          <h3 className="mt-4 text-xl font-bold text-green-600">Coupon Applied!</h3>
          <p className="mt-2 text-gray-600">
            Code: <span className="font-semibold">{appliedCoupon.couponCode}</span>
          </p>
          <p className="mt-2 text-2xl font-bold text-green-600">
            ₹{appliedCoupon.discount} OFF
          </p>
          <div className="mt-4 flex gap-2 text-2xl animate-pulse">✨ ⭐ ✨ ⭐ ✨</div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[80vh] flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <Ticket className="w-5 h-5 text-yellow-500" />
              <h2 className="text-lg font-semibold text-gray-800">Apply Coupon</h2>
            </div>
            <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 transition">
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <div className="overflow-y-auto flex-1 px-4 py-4 space-y-4">
            {/* Manual entry */}
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                Enter Code Manually
              </p>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={manualCode}
                  onChange={(e) => setManualCode(e.target.value.toUpperCase())}
                  onKeyDown={(e) => e.key === "Enter" && handleManualApply()}
                  placeholder="Type coupon code here..."
                  className="flex-1 border border-gray-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-yellow-400 uppercase placeholder:normal-case"
                />
                <button
                  onClick={handleManualApply}
                  className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white text-sm font-semibold rounded-xl transition"
                >
                  Apply
                </button>
              </div>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="flex-1 border-t border-gray-200" />
              <p className="text-xs text-gray-400">or choose from below</p>
              <div className="flex-1 border-t border-gray-200" />
            </div>

            {/* Coupon list */}
            <div className="space-y-3">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Available Coupons
              </p>
              {couponData.map((coupon) => (
                <button
                  key={coupon.id}
                  onClick={() => applyCoupon(coupon.code)}
                  className="w-full text-left border border-yellow-200 rounded-xl p-4 hover:bg-yellow-50 hover:border-yellow-400 transition"
                >
                  <p className="font-semibold text-gray-800 text-sm">{coupon.name}</p>
                  <p className="text-gray-500 text-xs mt-0.5">{coupon.description}</p>
                  <span className="inline-block mt-2 px-3 py-1 rounded-lg bg-yellow-100 border border-dashed border-yellow-400 text-yellow-700 font-bold text-xs tracking-widest">
                    {coupon.code}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── PaymentPage ───────────────────────────────────────────────────────────────
export default function PaymentPage({ selectedAddress, goBack }) {
  const [address, setAddress] = useState(null);
  const [selectedMethod, setSelectedMethod] = useState("card");
  const [showOrderConfirmedModal, setShowOrderConfirmedModal] = useState(false);

  // Coupon state
  const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [couponData, setCouponData] = useState([]);

  const methods = ["card", "netbanking", "upi"];

  const dispatch = useDispatch();
  const { cartData = [], carterror } = useSelector((state) => state.cartState);

  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);

  // Fetch available coupons
  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${Base_Url}/api/coupon/getValidCoupons`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.data.success) {
          setCouponData(res.data.coupons || []);
        }
      } catch (err) {
        console.error("Failed to fetch coupons", err);
      }
    };
    fetchCoupons();
  }, []);

  // Fetch address details
  useEffect(() => {
    const fetchAddressDetails = async () => {
      if (!selectedAddress) return;
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `${Base_Url}/api/address/getAddress/${selectedAddress}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (res.data.success) {
          setAddress(res.data.data);
        } else {
          toast.error(res.data.message || "Failed to fetch address details");
        }
      } catch (err) {
        console.error("❌ Fetch address error:", err);
        toast.error(err.response?.data?.message || "Failed to load address details");
      }
    };
    fetchAddressDetails();
  }, [selectedAddress]);

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
          grandTotal: totals.grandTotal + discountedSubtotal + itemGst,
        };
      },
      { subtotal: 0, discount: 0, totalGst: 0, totalHandling: 0, grandTotal: 0 }
    );

    if (selectedCoupon?.discount > 0) {
      totals.grandTotal -= selectedCoupon.discount;
    }

    if (totals.subtotal <= 1000) {
      totals.grandTotal += totals.totalHandling;
    }

    return totals;
  };

  const { subtotal, discount, totalGst, totalHandling, grandTotal } = calculateCartTotals();

  const UpdateQuantity = (id, type, variantId) => {
    if (type === "increment") dispatch(incrementQuantityOfCartProduct(id, variantId));
    else if (type === "decrement") dispatch(decrementQuantityOfCartProduct(id, variantId));
  };

  const RemoveFromCart = (productId, variantId) => {
    dispatch(removeFromCart(productId, variantId));
  };

  const formatAddress = (addr) => {
    if (!addr) return "";
    return [
      addr.buildingBlock ? addr.buildingBlock.toUpperCase() : "",
      addr.flatNo || "",
      addr.buildingName || "",
      addr.landmark || "",
      addr.streetName || "",
      addr.city || "",
      addr.pincode || "",
    ]
      .filter(Boolean)
      .join(", ");
  };

  const handleConfirmOrder = async () => {
    if (!selectedAddress) {
      toast.warning("Please select a delivery address.");
      return;
    }
    if (grandTotal <= 0) {
      toast.error("Invalid order amount");
      return;
    }

    const token = localStorage.getItem("token");
    const orderItems = cartData.map((item) => ({
      productId: item.product.id,
      quantity: item.quantity,
      variantId: item.variantId,
    }));

    if (selectedMethod === "cod") {
      try {
        await axios.post(
          `${Base_Url}/api/productOrder/placeOrder`,
          {
            addressId: selectedAddress,
            paymentMethod: selectedMethod,
            items: orderItems,
            couponCode: selectedCoupon?.couponCode || "",
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setShowOrderConfirmedModal(true);
      } catch (err) {
        console.error("Failed to place order", err);
        if (err.response?.status === 404) {
          toast.info(err.response.data?.message || "Product not found in cart");
        } else if (err.response?.status === 400) {
          toast.info(err.response.data?.message);
        } else {
          toast.error(err.response?.data?.message || "Failed to place order");
        }
      }
      return;
    }

    try {
      const isLoaded = await loadRazorpayScript();
      if (!isLoaded) {
        toast.error("Failed to load Razorpay SDK");
        return;
      }

      const { data } = await axios.post(
        `${Base_Url}/api/productOrder/create-order`,
        {
          amount: Number(grandTotal.toFixed(2)),
          addressId: selectedAddress,
          items: orderItems,
          paymentMethod: selectedMethod,
          couponCode: selectedCoupon?.couponCode || "",
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: data.razorpayOrder.amount,
        currency: data.razorpayOrder.currency,
        name: "Mel-Foresta Honey",
        description: `Order payment for order ${data.orderId}`,
        order_id: data.razorpayOrder.id,
        handler: async function (response) {
          try {
            const res = await axios.post(
              `${Base_Url}/api/productOrder/verify-payment`,
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                productOrderId: data.orderId,
              },
              { headers: { Authorization: `Bearer ${token}` } }
            );
            if (res.data.success) {
              toast.success(res.data.message || "Payment successful. Order placed!");
              setShowOrderConfirmedModal(true);
            } else {
              toast.error("Fail to place order");
            }
          } catch (error) {
            toast.error(error.response?.data?.message || "Payment verification failed");
          }
        },
      };

      const razor = new window.Razorpay(options);
      razor.on("payment.failed", async function (response) {
        try {
          await axios.post(
            `${Base_Url}/api/productOrder/payment-failed`,
            {
              orderId: data.orderId,
              razorpay_order_id: response.error.metadata.order_id,
              razorpay_payment_id: response.error.metadata.payment_id,
              reason: response.error.description,
            },
            { headers: { Authorization: `Bearer ${token}` } }
          );
        } catch (error) {
          console.error("Failed to save failed payment", error);
        }
        toast.error(response.error.description);
      });

      razor.open();
    } catch (err) {
      console.error("Failed to place order", err);
      if (err.response?.status === 404) {
        toast.info(err.response.data?.message || "Product not found in cart");
      } else if (err.response?.status === 400) {
        toast.info(err.response.data?.message);
      } else {
        toast.error(err.response?.data?.message || "Failed to place order");
      }
    }
  };

  if (carterror) {
    return <p className="text-red-600">Cart error : {carterror}</p>;
  }

  return (
    <>
      <div className="flex flex-col md:flex-row border space-x-0 space-y-5 md:space-x-5 md:space-y-0 xl:space-x-7 border-gray-500 p-3 md:p-7 xl:p-8 rounded-lg w-full items-start">

        <div className="w-full md:w-1/2">
          <div className="flex flex-row items-center space-x-2 mb-4">
            <button onClick={() => goBack()}>
              <MdOutlineKeyboardBackspace className="text-base lg:text-lg text-black" />
            </button>
            <h2 className="text-sm md:text-base xl:text-xl font-semibold">Product Details</h2>
          </div>

          <div className="grid grid-cols-1 gap-5 w-full max-h-[400px] overflow-y-auto scrollbar-hide pr-2">
            {cartData.map((item) => (
              <div key={item.id} className="bg-heroPrimary/30 p-3 md:p-5 rounded shadow flex flex-col justify-between">
                <div className="flex flex-row justify-between items-start gap-4 w-full">
                  <div className="relative">
                    <img
                      src={item.product?.images?.[0].image}
                      alt={item.product?.productName}
                      className="w-24 h-24 object-contain rounded"
                    />
                  </div>
                  <div className="flex flex-col space-y-1">
                    <p className="font-semibold text-xs md:text-sm lg:text-base">
                      {capitalizeFirstLetter(item.product?.productName)}
                    </p>
                    <div className="flex flex-col items-start text-xs lg:text-sm py-2">
                      <p className="text-xs md:text-sm xl:text-base">Weight: {item.selectedWeight ?? "-"}</p>
                      <p className="text-xs md:text-sm xl:text-base">Category: {item.product?.category?.name}</p>
                    </div>
                    <div className="flex flex-row justify-between items-center">
                      <div className="flex items-center rounded overflow-hidden w-auto border border-gray-400">
                        <button
                          onClick={() => UpdateQuantity(item.product?.id, "decrement", item.variantId)}
                          className="px-2"
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <span className="px-3 border-x border-gray-400">{item.quantity}</span>
                        <button
                          onClick={() => UpdateQuantity(item.product?.id, "increment", item.variantId)}
                          className="px-2"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col justify-between space-y-3">
                    <p className="text-gray-900">₹{formatNumber(item.discountedPrice)}</p>
                    {Number(item.discountPercent) > 0 && (
                      <p className="font-semibold text-gray-600 line-through">₹{formatNumber(item.originalPrice)}</p>
                    )}
                    {Number(item.discountPercent) > 0 && (
                      <p className="text-green-600 font-semibold text-xs">{Math.round(item.discountPercent)}% OFF</p>
                    )}
                    <button
                      className="text-xs md:text-sm text-red-600 border border-red-600 rounded-md px-2 py-1"
                      onClick={() => RemoveFromCart(item.product?.id, item.variantId)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col space-y-3 mt-5 md:mt-8">
            <h2 className="text-sm md:text-base xl:text-xl font-semibold">Delivery Location</h2>
            <p className="border border-gray-300 text-black p-2 rounded bg-gray-100 text-xs md:text-sm xl:text-base">
              {formatAddress(address)}
            </p>
          </div>
        </div>

        <div className="w-full md:w-1/2">
          <h2 className="text-sm md:text-base xl:text-xl font-semibold mb-4">Payment Method</h2>
          <div className="flex flex-col lg:flex-row divide-y lg:divide-x border border-primary rounded overflow-hidden">
            {methods.map((method) => (
              <div
                key={method}
                onClick={() => setSelectedMethod(method)}
                className={`flex-1 text-center py-2 cursor-pointer text-sm md:text-base font-medium transition-all duration-200 ${
                  selectedMethod === method
                    ? "bg-custom-gradient2 text-white border-primary"
                    : "bg-white text-gray-700"
                }`}
              >
                {formatPaymentMethod(method)}
              </div>
            ))}
          </div>

          <div className="flex justify-end mt-5 md:mt-10 text-xs md:text-sm xl:text-base">
            <button
              className="bg-custom-gradient1 hover:bg-custom-gradient1-hover rounded-lg py-2 px-14 text-white text-center"
              onClick={handleConfirmOrder}
            >
              Pay & Confirm Order
            </button>
          </div>

          <h2 className="text-sm md:text-base xl:text-xl font-semibold mb-4 mt-6">Payment Summary</h2>
          <div className="w-full lg:w-3/4 border border-gray-300 shadow-md rounded px-5 py-5 space-y-2 text-sm md:text-sm xl:text-base">

            <p className="col-span-2 text-yellow-800 font-semibold text-sm md:text-base mb-2">
              🚚 Get FREE shipping on purchases above ₹1,000.
            </p>

            {selectedCoupon ? (
              <div className="flex items-center justify-between px-4 py-3 rounded-xl border border-yellow-400 bg-yellow-50">
                <div className="flex flex-col gap-1">
                  <p className="text-xs text-gray-500">Coupon Applied</p>
                  <span className="inline-block px-3 py-0.5 rounded-lg bg-yellow-100 border border-dashed border-yellow-400 text-yellow-700 font-bold text-xs tracking-widest w-fit">
                    {selectedCoupon.couponCode}
                  </span>
                  <p className="text-xs text-green-600 font-medium">
                    You have saved ₹{Number(selectedCoupon.discount)}
                  </p>
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
            )}

            {/* Totals */}
            <div className="grid grid-cols-2 gap-x-2 gap-y-2 pt-2">
              <p>Total Item:</p>
              <p>{cartData.length} items</p>

              <p>Subtotal amount:</p>
              <p>₹{Number(subtotal.toFixed(2))}</p>

              {Number(totalGst) > 0 && (
                <>
                  <p>GST amount:</p>
                  <p>₹{Number(totalGst.toFixed(2))}</p>
                </>
              )}

              {Number(totalHandling) > 0 && Number(subtotal) < 1000 && (
                <>
                  <p>Shipping charges:</p>
                  <p>₹{Number(totalHandling.toFixed(2))}</p>
                </>
              )}

              {Number(subtotal) >= 1000 && (
                <>
                  <p>Shipping charges:</p>
                  <p>Free</p>
                </>
              )}

              {Number(discount) > 0 && (
                <>
                  <p>Discount Amount:</p>
                  <p>- ₹{Number(discount.toFixed(2))}</p>
                </>
              )}

              {Number(selectedCoupon?.discount) > 0 && (
                <>
                  <p>Coupon Discount:</p>
                  <p>- ₹{Number(selectedCoupon.discount.toFixed(2))}</p>
                </>
              )}

              <hr className="col-span-2" />
              <p>Total (Payable amount):</p>
              <p>₹{Number(grandTotal.toFixed(2))}</p>
            </div>
          </div>
        </div>
      </div>

      {showOrderConfirmedModal && (
        <OrderConfirmedModal onClose={() => setShowOrderConfirmedModal(false)} />
      )}

      <CouponModal
        isOpen={isCouponModalOpen}
        onClose={() => setIsCouponModalOpen(false)}
        onSelect={(coupon) => setSelectedCoupon(coupon)}
        couponData={couponData}
      />
    </>
  );
}