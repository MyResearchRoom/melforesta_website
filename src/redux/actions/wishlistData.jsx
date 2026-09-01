import axios from "axios";
import {
  FETCH_WISHLISTDATA_SUCCESS,
  FETCH_WISHLISTDATA_FAILURES,
} from "../actionTypes";

const Base_Url = import.meta.env.VITE_BASE_URL;

export const fetchWishlistData = () => {
  const storedUser = localStorage.getItem("user");
  return async (dispatch) => {
    try {
      const parsedUser = storedUser ? JSON.parse(storedUser) : null;
      if (!parsedUser || parsedUser.role !== "CUSTOMER") {
        console.log("Skipped API call — user is not a CUSTOMER");
        return;
      }
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token not found");
      }
      const res = await axios.get(`${Base_Url}/api/wishlist/getWishlistItems`, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
      console.log("wishlist",res);

      dispatch({
        type: FETCH_WISHLISTDATA_SUCCESS,
        payload: {
          wishlistData: Array.isArray(res.data.data) ? res.data.data : [],
          message: res.data.message || "Wishlist data fetched successfully",
        },
      });
    } catch (err) {
      dispatch({
        type: FETCH_WISHLISTDATA_FAILURES,
        payload: err.response?.data?.message || err.message,
      });
    }
  };
};
