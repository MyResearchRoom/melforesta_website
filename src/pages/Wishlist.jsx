import { IoCartOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { MdKeyboardBackspace, MdOutlineShoppingCart } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchWishlistData } from "../redux/actions/wishlistData";
import { removeFromWishlist } from "../service/addToWishlist";
import { addToCart } from "../service/addToCart";
import { fetchLoggedUser } from "../redux/actions/loggedUserActions";
export default function WishlistPage() {
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const storedUser = localStorage.getItem("user");
  const [loading, setLoading] = useState(false);
  const {wishlistData=[], wishlisterror,}=useSelector((state)=>state.wishlistState);
  const { user, error } = useSelector(
    (state) => state.loggedUserState
  );
 

  useEffect(() => {
      const fetchData = async () => {
        try {
          setLoading(true);
          await dispatch(fetchWishlistData());
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
    }, [dispatch]);

  const RemoveProduct=(productId)=>{
    dispatch(removeFromWishlist(productId));
  }

  const toggleCart = (productId,quantity,variantId) => {
      if (!storedUser) {
        toast.warning("Please login to manage wishlist");
        setTimeout(() => navigate("/login"), 1000);
        return;
      }
      dispatch(addToCart(productId,quantity,variantId));
  };

  useEffect(() => {
    const fetchData = async () => {
      dispatch(fetchLoggedUser());  
    };
    fetchData();
  }, [dispatch]);

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
  
  if(wishlisterror)
  {
    return(
      <p className="text-red-600">Wishlisr error : {wishlisterror}</p>
    );
  }

  {error && (
  <p className="text-red-600">
    {typeof error === "string" ? error : error.message || "Something went wrong"}
  </p>
  )}

  return (
    <section className="px-5 md:px-10 xl:px-16 py-10 bg-gray-50 min-h-screen">

      <div
        className="flex items-center gap-2 mb-6 cursor-pointer"
        onClick={() => navigate(-1)}
      >
        <MdKeyboardBackspace className="text-2xl xl:text-3xl" />
        <h2 className="text-xl xl:text-2xl font-bold">My Wishlist</h2>
      </div>

      <div className="grid gap-x-3 md:gap-x-8 gap-y-7 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
      {loading ? (
        Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="bg-white rounded-xl border p-4 animate-pulse"
        >
          <div className="w-full h-48 bg-gray-200 rounded-md"></div>

          <div className="mt-4 space-y-2">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-3 bg-gray-200 rounded w-full"></div>
          </div>

          <div className="flex justify-between mt-3">
            <div className="h-4 w-16 bg-gray-200 rounded"></div>
            <div className="h-4 w-12 bg-gray-200 rounded"></div>
          </div>
          <div className="flex gap-2 mt-4">
            <div className="h-8 w-full bg-gray-200 rounded-md"></div>
            <div className="h-8 w-full bg-gray-200 rounded-md"></div>
          </div>
        </div>
        ))
      ): ( wishlistData.length === 0 ? (
        <div className="text-center text-gray-600 flex flex-col space-y-4">
          <p>Your Wishlist is empty.</p>
          <Link to="/productpage">
            <button className="px-6 py-2 bg-custom-gradient2 text-white rounded-lg hover:bg-custom-gradient2-hover transition">
              Explore Products
            </button>
          </Link>
        </div>
      ) : (
        wishlistData.map((item) => (
            <div
              key={item.id}
              className="group bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.08)] 
              hover:shadow-[0_4px_16px_rgba(0,0,0,0.12)] 
              transform hover:-translate-y-1 transition-all duration-300 
              overflow-hidden border"
            >
              <Link to={`/productdetail/${item.productId}`}>
                <div className="relative w-full h-48  bg-gray-100 overflow-hidden">
                  <img
                    src={item.product?.images?.[0].image}
                    alt={item.product?.productName}
                    className="object-cover w-full h-full transition-transform duration-500 
                    group-hover:scale-110"
                  />
                  {/* {Number(item.product?.variants?.[0]?.discountPercent || 0) > 0 && (
                    <span className="absolute top-2 left-2 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                      {Math.round(item.product?.variants?.[0].discountPercent)}% OFF
                    </span>
                  )} */}
                  {Number(item.product?.variants?.[0].discountPercent) >0 && 
                  <span className="absolute top-2 left-2 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                      {Math.round(item.product?.variants?.[0].discountPercent)}% OFF
                    </span>
                  }
                </div>

                <div className="p-4 flex flex-col flex-1">
                  <h3 className="font-semibold text-sm md:text-base xl:text-lg truncate">
                    {item.product?.productName} 
                  </h3>
                  <p className="text-gray-500 text-xs md:text-sm truncate mt-1">
                    {item.product?.description}
                  </p>

                  <div className="flex items-center justify-between mt-2 space-x-2 flex-wrap">
                    <span className="text-gray-800 font-semibold">
                      ₹ {Math.round(item.product?.variants?.[0].discountedPrice)}
                    </span>
                    {Number(item.product?.variants?.[0].discountPercent) >0 && 
                    <span className="line-through text-gray-500 text-sm">
                      ₹ {Math.round(item.product?.variants?.[0]?.price)}
                    </span>
                    }
                    <span
                    className={`mt-1 text-xs md:text-sm font-medium ${
                      item.totalStock > 0 ? "text-green-600" : "text-red-600"
                    }`}
                    >
                      {item.totalStock > 0 ? "In Stock" : "Out of Stock"}
                    </span>
                  </div>
                </div>
              </Link>

              <div className="flex gap-2 p-4">
                
                <button
                  onClick={() =>
                    toggleCart(item.product.id,1,item.product?.variants?.[0]?.id)
                  }
                  className={`flex items-center justify-center gap-1 bg-custom-gradient1 text-sm text-white py-2 rounded-md flex-1 hover:bg-custom-gradient2-hover transition ${
                    item.totalStock < 1 ? "cursor-not-allowed bg-opacity-60" : ""
                  }`}
                  disabled={item.totalStock < 1}
                >
                  <IoCartOutline />
                  Add to Cart
                </button>

                <button
                  onClick={() => RemoveProduct(item.productId)}
                  className="flex-1 border border-primary text-primary rounded-md hover:bg-primary hover:text-white transition"
                >
                  Remove
                </button>
              </div>
            </div>
        ))
      ))}
      </div>
    </section>
  );
}
