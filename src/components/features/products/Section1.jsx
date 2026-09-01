import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { MdOutlineShoppingCart } from "react-icons/md";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../../redux/actions/prodcutAction";
import { fetchCategories } from "../../../redux/actions/categoryActions";
import { toast } from "react-toastify";

import { FaShoppingCart, FaArrowRight } from "react-icons/fa";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../../service/addToWishlist";
import { addToCart } from "../../../service/addToCart";
import { fetchCartData } from "../../../redux/actions/cartData";
import capitalizeFirstLetter from "../../common/capitalizeFirstLetter";
import { FiChevronDown } from "react-icons/fi";
import { fetchWishlistData } from "../../../redux/actions/wishlistData";

export default function SectionTwo() {
  const [openDropdown, setOpenDropdown] = useState(false);
  const location = useLocation();
  const storedUser = localStorage.getItem("user");
  const navigate = useNavigate();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOptions, setFilterOptions] = useState({
    category: "all",
    minPrice: "",
    maxPrice: "",
  });

  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await dispatch(fetchProducts(currentPage, 12, searchTerm, filterOptions.category, filterOptions.minPrice, filterOptions.maxPrice));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch, currentPage, searchTerm, filterOptions.category,filterOptions.category, filterOptions.minPrice, filterOptions.maxPrice]);

  useEffect(() => {
    setCurrentPage(1);
   
  }, [searchTerm, filterOptions]);

  const parsePrice = (price) => {
    if (!price) return 0;
    if (typeof price === "number") return price;
    const cleaned = price.replace(/[₹,]/g, "").trim();
    return parseFloat(cleaned) || 0;
  };

  const { categories = [] } = useSelector((state) => state.categoryState);

  const { wishlistData = [], wishlisterror } = useSelector(
    (state) => state.wishlistState,
  );

  useEffect(() => {
    dispatch(fetchCategories(1, "all", ""));
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchWishlistData());
  }, [dispatch]);

  const { product, totalRecords, error ,totalPages} = useSelector(
    (state) => state.productState,
  );

  useEffect(() => {
    setCurrentPage(1);
  }, []);

  const isInWishlist = (productId) => {
    return wishlistData.some((item) => item.product.id === productId);
  };

  const toggleWishlist = (productId) => {
    if (!storedUser) {
      toast.warning("Please login to manage wishlist");
      setTimeout(() => navigate("/login"), 1000);
      return;
    }
    if (isInWishlist(productId)) {
      dispatch(removeFromWishlist(productId));
    } else {
      dispatch(addToWishlist(productId));
    }
  };

  const toggleCart = (productId,quantity,variantId) => {
    if (!storedUser) {
      toast.warning("Please login to manage wishlist");
      setTimeout(() => navigate("/login"), 1000);
      return;
    }
    dispatch(addToCart(productId,quantity,variantId));
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [currentPage]);

  const changePage = (page) => {
    setCurrentPage(page);
  };

  if (error) {
    return <p className="text-red-600">product error : {error}</p>;
  }

  if (wishlisterror) {
    if (storedUser)
      return <p className="text-red-600">Wishlist error : {wishlisterror}</p>;
  }

  return (
    <section className="bg-white pb-5 my-2 md:my-10">
      <div className="px-5 lg:px-10 pb-5 mb-5 md:mb-10 bg-white shadow-sm  flex flex-col md:flex-row md:items-center justify-between gap-2 lg:gap-4">
        <div className="flex items-center gap-2 w-auto">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
           className="flex items-center gap-2 border-2 border-yellow-600 px-4 py-1.5 font-semibold text-yellow-600  rounded-lg
          hover:bg-yellow-600 hover:text-white transition-transform duration-300 hover:scale-105"
          >
            <HiOutlineAdjustmentsHorizontal className="text-xl" />
            Filter
          </button>

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            className={`flex items-center gap-2 border-2 border-yellow-600 px-4 py-1.5 font-semibold text-yellow-600  rounded-lg hover:bg-yellow-600 hover:text-white transition-transform duration-300 hover:scale-105 ${
              currentPage === totalPages
                ? "text-gray-400 cursor-not-allowed"
                : "hover:bg-primary/70 hover:text-white"
            }`}
            disabled={currentPage === totalPages}
          >
            <FaArrowRight className="text-sm lg:text-lg" />
            Explore More
          </button>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <label className="hidden md:block font-medium text-gray-900">
            Search product:
          </label>
          <input
            type="text"
            placeholder="Search product"
            className="flex-1 md:flex-none w-full md:w-72 px-3 py-1.5 border border-yellow-600 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-0"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-start w-full">
        {isFilterOpen && (
          <div
            className="px-4 py-6 bg-white/70 backdrop-blur-xl shadow-xl border border-white/40 
                  rounded-2xl ml-5 mb-8 w-auto mr-5 md:mr-0 md:w-60 animate-fadeIn border-t border-t-gray-100"
          >
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              Filters
            </h3>

            <div className="space-y-5">
              <div className="relative w-full">
                {/* Selected */}
                <div
                  onClick={() => setOpenDropdown(!openDropdown)}
                  className="px-3 py-2 border border-yellow-400 rounded-lg bg-white cursor-pointer flex justify-between items-center"
                >
                  <span className="capitalize">
                    {filterOptions.category === "all"
                      ? "All"
                      : categories.find(cat => cat.id === filterOptions.category)?.name || "Select Category"}
                  </span>
                  <FiChevronDown className="text-gray-500 text-lg" />
                </div>

                {openDropdown && (
                  <div className="absolute mt-1 w-full bg-white border border-yellow-200 rounded-lg shadow-lg z-50 max-h-72 overflow-y-auto">
                     <div
                      onClick={() => {
                        setFilterOptions({ ...filterOptions, category: "all" });
                        setOpenDropdown(false);
                      }}
                      className="px-4 py-2 hover:bg-yellow-200 cursor-pointer font-medium"
                    >
                      All
                    </div>

                    {categories.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => {
                          setFilterOptions({ ...filterOptions, category: item.id });
                          setOpenDropdown(false);
                        }}
                        className="px-4 py-2 hover:bg-yellow-200 cursor-pointer capitalize"
                      >
                        {item.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-700">
                  Price Range
                </label>
                <div className="flex gap-2 mt-1">
                  <input
                    type="number"
                    placeholder="Min"
                    value={filterOptions.minPrice}
                    onChange={(e) =>
                      setFilterOptions({
                        ...filterOptions,
                        minPrice: e.target.value,
                      })
                    }
                    className="w-1/2 px-3 py-2 rounded-lg bg-white/70 border border-yellow-400 
                       focus:ring-1 focus:ring-yellow-500 focus:outline-none shadow-sm"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={filterOptions.maxPrice}
                    onChange={(e) =>
                      setFilterOptions({
                        ...filterOptions,
                        maxPrice: e.target.value,
                      })
                    }
                    className="w-1/2 px-3 py-2 rounded-lg bg-white/70 border border-yellow-400 
                       focus:ring-1 focus:ring-yellow-500 focus:outline-none shadow-sm"
                  />
                </div>
              </div>

            </div>

            <div className="mt-6 flex flex-col gap-3">
             <button
              onClick={() => {
                setFilterOptions({
                  category: "all",
                  discount: "all",
                  minPrice: "",
                  maxPrice: "",
                  sortOption: "",
                });
                setSearchTerm("");
                setCurrentPage(1);
                setOpenDropdown(false);
              }}
              className="px-4 py-2 bg-gray-200 border border-gray-300 rounded-lg text-sm font-semibold hover:bg-gray-300"
            >
              Reset
            </button>

              <button
                onClick={() => setIsFilterOpen(false)}
                className="px-4 py-2 bg-yellow-600 text-white rounded-lg text-sm font-semibold 
                   hover:bg-yellow-800 shadow-md"
              >
                Apply Filters
              </button>
            </div>
          </div>
        )}

        <div
          className={`grid gap-6 lg:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 px-5 md:px-6 xl:px-10
          ${isFilterOpen ? "md:w-[calc(100%-18rem)]" : "w-full"}
          `}
        >
          {loading ? (
            Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl border border-gray-200 p-4 animate-pulse"
              >
                <div className="aspect-square w-full rounded-xl bg-gray-200"></div>

                <div className="mt-4 space-y-2">
                  <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  <div className="h-3 bg-gray-200 rounded w-full"></div>
                </div>

                <div className="mt-4 flex justify-between items-center">
                  <div className="h-4 w-16 bg-gray-200 rounded"></div>
                  <div className="h-8 w-24 bg-gray-200 rounded-lg"></div>
                </div>
              </div>
            ))
          ) : (product.length === 0 ? (
            <p className="text-center col-span-full text-gray-700 font-semibold py-8">
              No products found.
            </p>
          ) : (
            product.map((product, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-2xl border border-gray-200 p-4
                transition-all duration-300 hover:shadow-xl hover:border-amber-200
                flex flex-col h-full cursor-pointer"
              >
                {/* Wishlist */}
                <div
                  onClick={() => toggleWishlist(product.id)}
                  className="absolute top-2 right-2 z-20 pointer-events-auto bg-white p-2 rounded-full shadow cursor-pointer hover:bg-red-50 transition"
                >
                                {isInWishlist(product.id) ? (
                                  <AiFillHeart className="text-xl text-red-600" />
                                ) : (
                                  <AiOutlineHeart className="text-xl text-red-600" />
                                )}
                </div>

                {/* Image */}
                <Link to={`/productdetail/${product.id}`}>
                  <div className="aspect-square w-full rounded-xl overflow-hidden bg-[#fbf4eb]">
                    <img
                      src={product.images?.[0]?.image}
                      alt={product.productName}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                </Link>

                {/* Content */}
                <div className="mt-6 flex flex-col flex-grow text-left min-h-[120px] p-2">
                  <Link to={`/productdetail/${product.id}`}>
                    <span className="text-xs uppercase tracking-widest text-[#d4a017] font-bold mb-1 block">
                      {product.category?.name}
                    </span>

                    <h3 className="text-xl font-serif font-bold text-gray-900 capitalize line-clamp-1">
                      {capitalizeFirstLetter(product.productName)}
                    </h3>

                    <p className="mt-2 text-gray-500 text-sm line-clamp-2">
                      {product.description}
                    </p>
                  </Link>
                </div>

                {/* Bottom */}
                <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between p-2">
                  
                  <Link to={`/productdetail/${product.id}`}>
                    <div>
                      <span className="text-base font-semibold text-gray-400 block">
                        {product?.variants?.[0]?.weight}
                      </span>

                      <p className="text-xl font-bold text-[#D4A017]">
                      ₹{Math.round(Number(product?.variants?.[0]?.discountedPrice || 0))}
                      </p>
                    </div>
                  </Link>

                  <button
                    className={`flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white rounded-xl transition-all
                    ${
                      product?.variants?.[0]?.currentAvailableStock < 1
                        ? "bg-gray-400 cursor-not-allowed opacity-70"
                        : "bg-amber-600 hover:bg-amber-700"
                    }`}
                    onClick={() =>
                      toggleCart(
                        product.id,
                        1,
                        product?.variants?.[0]?.id
                      )
                    }
                    disabled={product?.variants?.[0]?.currentAvailableStock < 1}
                  >
                    <MdOutlineShoppingCart className="text-lg" />
                    {product?.variants?.[0]?.currentAvailableStock < 1
                      ? "Out of Stock"
                      : "Add to Cart"}
                  </button>
                </div>
              </div>
            ))
          ))}
        </div>
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-10 flex-wrap">
          <button
            onClick={() => changePage(1)}
            disabled={currentPage === 1}
            className={`px-2 py-1 text-sm font-bold text-black rounded border hover:bg-yellow-600 hover:text-white disabled:text-gray-400 ${currentPage === 1 ? "cursor-not-allowed hover:bg-gray-200" : "cursor-pointer hover:bg-yellow-600"}`}
          >
            {"<<"}
          </button>
          <button
            onClick={() => changePage(Math.max(currentPage - 1, 1))}
            disabled={currentPage === 1}
            className={`px-2 py-1 text-sm font-bold text-black rounded border hover:bg-yellow-600 hover:text-white disabled:text-gray-400 ${currentPage === 1 ? "cursor-not-allowed hover:bg-gray-200" : "cursor-pointer hover:bg-yellow-600"}`}
          >
            {"<"}
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter(
              (page) =>
                page === 1 ||
                page === totalPages ||
                Math.abs(currentPage - page) <= 1 ||
                (currentPage <= 1 && page <= 2) ||
                (currentPage >= totalPages - 1 && page >= totalPages - 2),
            )
            .reduce((acc, page, index, arr) => {
              if (index > 0 && page - arr[index - 1] > 1) acc.push("...");
              acc.push(page);
              return acc;
            }, [])
            .map((page, i) =>
              page === "..." ? (
                <span
                  key={`dots-${i}`}
                  className="px-2 py-1 text-sm text-gray-500"
                >
                  ...
                </span>
              ) : (
                <button
                  key={page}
                  onClick={() => changePage(page)}
                  className={`px-3 py-1 text-sm rounded border font-medium ${
                    currentPage === page
                      ? "bg-yellow-600 text-white"
                      : "hover:bg-yellow-100"
                  }`}
                >
                  {page}
                </button>
              ),
            )}

          <button
            onClick={() => changePage(Math.min(currentPage + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={`px-2 py-1 text-sm font-bold text-black rounded border hover:bg-yellow-600 hover:text-white disabled:text-gray-400 ${currentPage === totalPages ? "cursor-not-allowed hover:bg-gray-200" : "cursor-pointer hover:bg-yellow-600"}`}
          >
            {">"}
          </button>
          <button
            onClick={() => changePage(totalPages)}
            disabled={currentPage === totalPages}
            className={`px-2 py-1 text-sm font-bold text-black rounded border hover:text-white disabled:text-gray-400 ${currentPage === totalPages ? "cursor-not-allowed hover:bg-gray-200" : "cursor-pointer hover:bg-yellow-600"}`}
          >
            {">>"}
          </button>
        </div>
      )}
    </section>
  );
}
