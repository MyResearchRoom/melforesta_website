import { useNavigate, useParams } from "react-router-dom";
import { MdKeyboardBackspace, MdOutlineShoppingCart } from "react-icons/md";
import { useEffect, useState } from "react";
import { IoCartOutline, IoStar } from "react-icons/io5";
import { LuSquareEqual } from "react-icons/lu";
import capitalizeFirstLetter from "../../common/capitalizeFirstLetter";
import { FcOk } from "react-icons/fc";
import { addToCart } from "../../../service/addToCart";
import { useDispatch } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import {tick} from "../../../assets/product/index"
import { Link } from "react-router-dom";
import Section2 from "./Section2";  

const Base_Url = import.meta.env.VITE_BASE_URL;
export default function ProductDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading,setLoading]=useState(false);
  const dispatch = useDispatch();
  const [currentProduct, setCurrentProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [isZoomed, setIsZoomed] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const storedUser = localStorage.getItem("user");

  const [formData, setFormData] = useState({
      name: "",
      email: "",
      mobileNumber: "",
      requirements:"",
      address:"",
  });

  // const currentProduct = honeyproducts.find((item) => item.id === Number(id));

  useEffect(() => {
    const fetchProductDetails = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `${Base_Url}/api/product/getProductDetails/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.data.success) {
          const product = res.data.data;
          setCurrentProduct(product);
          if (product.images && product.images.length > 0) {
            setSelectedImage(product.images[0].image);
          }

          if (product.variants && product.variants.length > 0) {
            setSelectedVariant(product.variants[0]);
          }
        } else {
          toast.error(res.data.message || "Failed to fetch product details");
        }
      } catch (err) {
        console.error("❌ Fetch product error:", err);
        toast.error(err.response?.data?.message || "Failed to load product details");
      }finally {
        setLoading(false);
      }
    };
    fetchProductDetails();
  }, [id]);

  const [selectedImage, setSelectedImage] = useState();
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [pinCode,setPinCode]=useState(null);
  const [deliveryData, setDeliveryData] = useState(null);
  const [pincodeLoading, setPincodeLoading] = useState(false);

  const [openModal, setOpenModal] = useState(false);

  const renderStarIcons = (rating) => (
    <div className="flex space-x-1">
      {Array.from({ length: 5 }, (_, index) => (
        <IoStar
          key={index}
          className={`w-4 h-3 md:w-5 md:h-5 ${index < rating ? "text-yellow-500" : "text-gray-300"}`}
        />
      ))}
    </div>
  );

  const handleMouseMove = (e) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setPosition({ x, y });
  };

  const [quantity, setQuantity] = useState(1);

    const increaseQty = () => {
        setQuantity(quantity + 1);
    };

    const decreaseQty = () => {
      if (quantity > 1) {
        setQuantity(quantity - 1);
      }
    };
  
    const [error, setError] = useState("");
  
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      if (
        !formData.name ||
        !formData.email ||
        !formData.mobileNumber ||
        !formData.requirements ||
         !formData.address 
      ) {
        setError("All fields are required.");
        return;
      }
  
      console.log("Form Submitted Data:", formData);
     toast.success("Message Sent Succesfully")
      setError("");
  
      setFormData({
        name: "",
        email: "",
        mobileNumber: "",
        requirements:"",
        address:""
      });
       setOpenModal(false);
    };

    const toggleBuyNow=(productId)=>{
      toggleCart(productId);
      navigate("/checkout");
    }

    const toggleCart=(productId)=>{
      if (!storedUser) {
        toast.warning("Please login to manage wishlist");
        setTimeout(() => navigate("/login"), 1000);
        return;
      }
      dispatch(addToCart(productId,quantity,selectedVariant.id));
    };

    const checkPincode = async () => {
      try {
        setPincodeLoading(true);
        setError("");
        setDeliveryData(null);

        if (!pinCode) {
          setError("Please enter pincode");
          return;
        }

        if (!/^\d{6}$/.test(pinCode)) {
          setError("Pincode must be 6 digits");
          return;
        }

        const response = await axios.post(
          `${Base_Url}/api/pincode/checkDeliveryAvailability`,
          {
            pinCode,
          }
        );

        if (response.data.success) {
          setDeliveryData(response.data.data);
        } else {
          setError(response.data.message);
        }

      } catch (err) {
        setError(
          err.response?.data?.message ||
          "Failed to check delivery availability"
        );
      } finally {
        setPincodeLoading(false);
      }
    };

    if (loading) {
      return (
        <div className="flex flex-col md:flex-row bg-white py-6 px-4 rounded shadow-lg animate-pulse gap-8">

          <div className="w-full md:w-1/2">
            <div className="w-full h-[420px] bg-gray-200 rounded-lg" />

            <div className="flex gap-4 mt-4">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="w-16 h-16 bg-gray-200 rounded-md"
                />
              ))}
            </div>
          </div>

          <div className="w-full md:w-1/2 space-y-5">

            <div className="h-4 w-28 bg-gray-200 rounded" />

            <div className="space-y-3">
              <div className="h-8 w-3/4 bg-gray-200 rounded" />
              <div className="h-8 w-1/2 bg-gray-200 rounded" />
            </div>

  
            <div className="space-y-2">
              <div className="h-8 w-32 bg-gray-200 rounded" />
              <div className="h-4 w-24 bg-gray-200 rounded" />
            </div>

            <div className="space-y-2">
              <div className="h-4 w-full bg-gray-200 rounded" />
              <div className="h-4 w-full bg-gray-200 rounded" />
              <div className="h-4 w-2/3 bg-gray-200 rounded" />
            </div>

            <div className="space-y-3">
              <div className="h-5 w-36 bg-gray-200 rounded" />

              <div className="flex">
                <div className="h-12 w-full bg-gray-200 rounded-l-md" />
                <div className="h-12 w-28 bg-gray-300 rounded-r-md" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="border rounded-md p-4 space-y-2"
                >
                  <div className="h-4 w-24 bg-gray-200 rounded" />
                  <div className="h-3 w-32 bg-gray-200 rounded" />
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="w-32 border rounded-md p-4 space-y-2"
                >
                  <div className="h-4 w-16 bg-gray-200 rounded" />
                  <div className="h-5 w-20 bg-gray-200 rounded" />
                  <div className="h-4 w-14 bg-gray-200 rounded" />
                </div>
              ))}
            </div>

            <div className="flex gap-4">
              <div className="h-12 w-36 bg-gray-200 rounded-md" />
              <div className="h-12 w-full bg-gray-300 rounded-md" />
            </div>

            <div className="h-12 w-full bg-gray-300 rounded-md" />

          </div>
        </div>
      );
    }

    if (!currentProduct) {
      return (
        <div className="text-center text-red-500 mt-10">Product not found</div>
      );
    }

  return (
    <section className="px-5 py-5 bg-gray-100">
      <div className="flex flex-row justify-between items-center mb-5">
        <div
          className="flex flex-row space-x-2 items-center cursor-pointer"
          onClick={() => navigate(-1)}
        >
          <h2 className="text-base md:text-lg xl:text-xl hover:scale-105 flex items-center gap-1 duration-200 hover:text-yellow-600">
            {" "}
            <MdKeyboardBackspace className="text-base md:text-lg xl:text-xl"/>
            Back
          </h2>
        </div>
      </div>

      <div className="flex flex-col md:flex-row bg-white py-6 px-2 rounded shadow-lg h-auto">
        <div className="w-full md:w-1/2 flex-shrink-0 flex flex-col items-center">
          {/* <div
            className="relative w-full md:px-5 lg:px-12 flex items-center justify-center h-[450px] overflow-hidden"
            onMouseEnter={() => setIsZoomed(true)}
            onMouseLeave={() => setIsZoomed(false)}
            onMouseMove={handleMouseMove}
          >
            <img
              src={selectedImage || currentProduct.images[0]?.image}
              alt={currentProduct.productName}
              className="max-h-full max-w-full object-contain border border-yellow-600 rounded"
            />

            {isZoomed && (
              <div
                className="absolute w-16 h-16 border-2 border-yellow-600 bg-white bg-opacity-30 pointer-events-none"
                style={{
                  top: `${position.y}%`,
                  left: `${position.x}%`,
                  transform: "translate(-50%, -50%)",
                }}
              />
            )}
          </div> */}

          <div
            className="relative w-full md:px-5 lg:px-12 flex items-center justify-center"
            onMouseEnter={() => setIsZoomed(true)}
            onMouseLeave={() => setIsZoomed(false)}
            onMouseMove={handleMouseMove}
          >
            
            <div className="w-full h-[330px] md:h-[450px] border border-yellow-600 rounded bg-white flex items-center justify-center overflow-hidden relative">

              <img
                src={selectedImage || currentProduct.images[0]?.image}
                alt={currentProduct.productName}
                className="w-auto h-auto md:max-w-[100%] md:max-h-[100%] object-contain"
              />

              {isZoomed && (
                <div
                  className="absolute w-16 h-16 border-2 border-yellow-600 bg-white/30 pointer-events-none"
                  style={{
                    top: `${position.y}%`,
                    left: `${position.x}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                />
              )}

            </div>

          </div>

          <div className="flex gap-2 xl:gap-6 mt-4">
            {currentProduct.images.map((img, i) => (                                                           
              <img
                key={i}
                src={img.image}
                onClick={() => setSelectedImage(img.image)}
                className={`w-[52px] h-[52px] md:h-14 md:w-14 xl:h-20 xl:w-20 object-cover border border-gray-500 rounded cursor-pointer ${
                  selectedImage === img.image ? "border-2 border-yellow-600" : ""
                }`}
                alt={`thumb-${i}`}
              />
            ))}
          </div>
         
        </div>

        {isZoomed && (
          <div className="block absolute top-[200px] md:top-[80px] right-2 xl:right-2 w-[280px] md:w-[360px] lg:w-[500px] xl:w-[650px] h-[300px] md:h-[500px] lg:h-[500px] xl:h-[550px] border bg-opacity-100 border-yellow-600 rounded overflow-hidden bg-white shadow-lg z-50 ">
            <img
              src={selectedImage}
              alt="Zoom Preview"
              className="w-full h-full object-cover"
              style={{
                transform: `translate(-${position.x}%, -${position.y}%) scale(2)`, // zoom level
                transformOrigin: "top left",
              }}
            />
          </div>
        )}

        <div className="w-full lg:w-1/2 mt-6 md:mt-0 md:pl-9 space-y-5">
          <div className="flex flex-col space-y-4">
            <h2 className="text-yellow-600 text-xl">
              {" "}
              {capitalizeFirstLetter(currentProduct.category?.name)}
            </h2>
            <h1 className="text-base md:text-xl xl:text-3xl font-semibold flex flex-row flex-wrap text-[#3E2C1C] font-serif">
              <p>{capitalizeFirstLetter(currentProduct.productName)}</p>              
            </h1>

            <div className="flex justify-between items-start gap-4 lg:pr-6">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3 flex-wrap">
                  <p className="text-3xl md:text-4xl font-bold text-gray-900">
                    ₹{Math.round(Number(selectedVariant?.discountedPrice || 0))}
                  </p>

                  {selectedVariant?.discountPercent > 0 && (
                    <>
                      <span className="line-through text-gray-400 text-xl">
                        ₹{Math.round(Number(selectedVariant?.price || 0))}
                      </span>                
                    </>
                  )}
                </div>

                {selectedVariant?.discountPercent > 0 && (
                  <div className="flex items-center gap-2">
                    <span className="text-green-600 font-semibold text-base lg:text-lg">
                      You Save ₹
                      {(
                        Number(selectedVariant?.price || 0) -
                        Number(selectedVariant?.discountedPrice || 0)
                      ).toFixed(2)}
                    </span>

                    <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded-md">
                      Best Deal
                    </span>
                  </div>
                )}
              </div>

              {selectedVariant?.discountPercent > 0 && (
                <div className=" text-white p-2 rounded-xl border-2 border-dashed border-orange-400">
                  <div className="text-center p-2 lg:p-3 bg-custom-gradient2 rounded-xl shadow-lg">
                    <p className="text-base lg:text-xl font-extrabold leading-none">
                      {Number(selectedVariant.discountPercent)}%  OFF
                    </p>
                    {/* <p className="text-xs uppercase tracking-wide">
                     
                    </p> */}
                  </div>
                </div>
              )}
            </div>

            <p className="text-gray-600 text-xs md:text-sm">
              Inclusive of all taxes. Shipping charges calculated at checkout.
            </p>
     
          </div> 

          <p className="capitalize">{currentProduct.description}</p>

          <div className="mt-4 flex flex-col gap-1">
            <p className="font-semibold">
              Delivery Details
            </p>

            <div className="flex md:w-1/2 border border-gray-300 rounded-md overflow-hidden focus-within:ring-1 focus-within:ring-primary focus-within:border-primary transition">

              <input
                type="text"
                maxLength={6}
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
                placeholder="Enter pincode"
                className="w-full px-3 py-2 outline-none border-none"
              />

              <button
                onClick={checkPincode}
                disabled={loading}
                className="bg-primary text-white px-4 py-2 hover:bg-primary/90 transition whitespace-nowrap"
              >
                {loading ? "Checking..." : "Check"}
              </button>

            </div>

            {deliveryData && (
              <div className=" text-green-600 text-sm">
                <p>
                  {/* ✅ Order now and receive it by{" "} */}
                  ✅ Estimated delivery on{" "}
                  <span className="font-semibold">
                    {deliveryData.estimatedDeliveryDate}
                  </span>
                </p>
              </div>
            )}

            {error && (
              <div className=" text-red-500 text-sm">
                ❌ {error}
              </div>
            )}
          </div>

          {currentProduct.specifications && (
          <div className="mt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {currentProduct.specifications.map((spec) => (
              <div
                key={spec.key}
                className="flex items-start gap-2 p-2 pt-3 border border-primary/50 rounded-md bg-gray-50"
              >
                <FcOk size={20} />
                <div className="-mt-2 text-xs md:text-sm xl:text-base">
                  <p className="font-medium capitalize">
                    {capitalizeFirstLetter(spec.key)}
                  </p>

                  <p className="text-gray-600 capitalize">
                    {Array.isArray(spec.value)
                      ? spec.value.filter(v => v !== "").join(", ")
                      : spec.value
                    }
                  </p>
                </div>
              </div>
            ))}
            </div>
          </div>
          )}

          <div className="flex flex-row flex-wrap gap-4">
            {currentProduct.variants.map((variant) => {
              const isSelected = selectedVariant?.id === variant.id;

              return (
                <div
                  key={variant.id}
                  onClick={() => setSelectedVariant(variant)}
                  className={`flex flex-col gap-1 border p-3 rounded-md px-4 cursor-pointer transition 
                  ${
                    isSelected
                      ? "border-yellow-500 bg-yellow-50 shadow-md"
                      : "border-gray-300 hover:border-yellow-400"
                  }`}
                >
                  <p className="font-medium text-gray-800">{variant.weight}</p>
                  <div className="flex items-center gap-2">
                    <p className="text-lg font-semibold text-[#3e2c1c]">
                     ₹{Math.round(Number(variant.discountedPrice))}
                    </p>
                    {variant.discountPercent > 0 && (
                      <p className="text-sm text-gray-400 line-through">
                        ₹{Math.round(Number(variant.price))}
                      </p>
                    )}
                  </div>
                  <p
                    className={`text-xs font-medium px-2 py-1 rounded-full w-fit capitalize ${
                      variant.stockStatus === "inStock"
                        ? "bg-green-100 text-green-700"
                        : variant.stockStatus === "lowStock"
                        ? "bg-yellow-100 text-yellow-700"
                        : variant.stockStatus === "outOfStock"
                        ? "bg-red-100 text-red-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {variant.stockStatus}
                  </p>
                </div>
              );
            })}
          </div>

          <div
            className={`mt-6 flex justify-between w-full gap-4 lg:gap-12 text-xs md:text-sm xl:text-base rounded-md py-2 transition-opacity`}
          >
            <div className="flex items-center gap-3">
              <button
                onClick={decreaseQty}
                disabled={quantity<=1}
                className={`w-10 h-10 flex items-center justify-center bg-yellow-600 rounded hover:bg-yellow-700 text-white ${quantity<=1 ? "cursor-not-allowed opacity-60" : "cursor-pointer"}`}
              >
                -
              </button>

              <span className="px-4 py-2 border border-yellow-600 rounded text-sm">
                {quantity}
              </span>

              <button
                onClick={increaseQty}
                disabled={selectedVariant.currentAvailableStock < 1 || selectedVariant?.stockStatus === "outOfStock"}
                className={`w-10 h-10 flex items-center justify-center bg-yellow-600 rounded hover:bg-yellow-700 text-white ${selectedVariant.currentAvailableStock < 1 || selectedVariant?.stockStatus === "outOfStock" ? "cursor-not-allowed opacity-60" : "cursor-pointer"}`}
              >
                +
              </button>
            </div>

            <button
               className={`bg-yellow-600 hover:bg-yellow-800 text-white px-5 py-2 rounded flex flex-row space-x-2 items-center w-full justify-center gap-3 
                        ${selectedVariant.currentAvailableStock < 1 || selectedVariant?.stockStatus === "outOfStock" ? "cursor-not-allowed opacity-60" : "cursor-pointer"}`}
              onClick={() => toggleCart(currentProduct.id)}
              disabled={selectedVariant.currentAvailableStock < 1 || selectedVariant?.stockStatus === "outOfStock"}
            >
              <MdOutlineShoppingCart className="text-xl" /> Add to cart
            </button>
          </div>
          
           <div
            className={`mt-6 flex flex-wrap w-full gap-4 lg:gap-12 text-xs md:text-sm xl:text-base rounded-md py-2 transition-opacity`}
          >

            <button
              // onClick={() => setOpenModal(true)}
               onClick={() => toggleBuyNow(currentProduct.id)}
              className={`bg-yellow-600 hover:bg-yellow-800 text-white px-5 py-2 rounded flex flex-row items-center w-full justify-center gap-3 ${
                selectedVariant.currentAvailableStock < 1 || selectedVariant?.stockStatus === "outOfStock"
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              disabled={
                selectedVariant.currentAvailableStock < 1 || selectedVariant?.stockStatus === "outOfStock"
              }
            >
              <LuSquareEqual />
              {selectedVariant?.stockStatus === "outOfStock" ? "Out of Stock" : "Buy Now"}
            </button>

            {openModal && (
              <div
                className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4"
                onClick={() => setOpenModal(false)}
              >
                {/* Modal Box */}
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="bg-white shadow-2xl rounded-2xl p-6 md:p-8 space-y-6 
                  w-full max-w-3xl max-h-[90vh] overflow-y-auto relative animate-fadeIn no-scrollbar"
                >
                  
                  {/* Close Button */}
                  <button
                    onClick={() => setOpenModal(false)}
                    className="absolute top-3 right-4 text-gray-400 hover:text-black text-xl"
                  >
                    ✕
                  </button>

                  {/* Heading */}
                  <h2 className="text-2xl md:text-3xl font-bold text-[#3E2C1C] text-center">
                    Send us a Message
                  </h2>

                  {/* Form */}
                  <form className="space-y-5" onSubmit={handleSubmit}>
                    
                    <div className="grid grid-cols-2 gap-4">

                  
                    <div>
                      <label className="text-base font-medium text-[#3E2C1C]">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={handleChange}
                        className="mt-1 w-full border border-[#fde6a8] px-3 py-2 rounded-lg 
                        focus:border-[#c69311] outline-none bg-[#fcf7f2]"
                      />
                    </div>

                    <div>
                      <label className="text-base font-medium text-[#3E2C1C]">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        placeholder="example@mail.com"
                        value={formData.email}
                        onChange={handleChange}
                        className="mt-1 w-full border border-[#fde6a8] px-3 py-2 rounded-lg 
                        focus:border-[#c69311] outline-none bg-[#fcf7f2]"
                      />
                    </div>

                  

                    <div>
                      <label className="text-base font-medium text-[#3E2C1C]">
                        Mobile Number
                      </label>
                      <input
                        type="text"
                        name="mobileNumber"
                        placeholder="Enter number"
                        value={formData.mobileNumber}
                        onChange={handleChange}
                        className="mt-1 w-full border border-[#fde6a8] px-3 py-2 rounded-lg 
                        focus:border-[#c69311] outline-none bg-[#fcf7f2]"
                      />
                    </div>

                    <div>
                      <label className="text-base font-medium text-[#3E2C1C]">
                        Address/City
                      </label>
                      <input
                        type="text"
                        name="address"
                        placeholder="Address"
                        value={formData.address}
                        onChange={handleChange}
                        className="mt-1 w-full border border-[#fde6a8] px-3 py-2 rounded-lg 
                        focus:border-[#c69311] outline-none bg-[#fcf7f2]"
                      />
                    </div>

                      </div>

                    <div>
                      <label className="text-base font-medium text-[#3E2C1C]">
                        Requirements
                      </label>
                      <textarea
                        rows="4"
                        name="requirements"
                        placeholder="Write here..."
                        value={formData.requirements}
                        onChange={handleChange}
                        className="mt-1 w-full border border-[#fde6a8] px-3 py-2 rounded-lg 
                        focus:border-[#c69311] outline-none bg-[#fcf7f2]"
                      />
                    </div>

                    {error && <p className="text-red-500 text-sm">{error}</p>}

                    <button
                      type="submit"
                      className="w-full py-3 bg-[#c49110] text-white font-semibold rounded-lg 
                      hover:bg-[#a3780d] transition"
                    >
                      Send Message
                    </button>
                  </form>
                </div>
              </div>
            )}
                    
          </div>
        </div>
        
      </div>
      <Section2 />
    </section>
  );
}
