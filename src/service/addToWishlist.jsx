import axios from "axios";
import { fetchWishlistData } from "../redux/actions/wishlistData";
import { toast } from "react-toastify";
const Base_Url = import.meta.env.VITE_BASE_URL;

export const addToWishlist = (productId) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${Base_Url}/api/wishlist/addToWishlist`,
        { productId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success(res.data.message || "Product added to wishlist");
      dispatch(fetchWishlistData());
    } catch (err) {
      console.error("Failed to add to wishlist", err);
      if (err.response?.status === 400) {
        toast.info(err.response.data?.message || "Product already in wishlist");
      } else {
        toast.error(err.response?.data?.message || "Failed to add to wishlist");
      }
    }
  };
};

export const removeFromWishlist = (productId) => {
  return async (dispatch) => {
    try {   
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${Base_Url}/api/wishlist/removeFromWishlist`,
        { productId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.info(res.data.message || "Product removed from wishlist");
      dispatch(fetchWishlistData());
    } catch (err) {
      console.error("Failed to remove from wishlist", err);
      toast.error(err.response?.data?.message || "Failed to remove from wishlist");
    }
  };
};