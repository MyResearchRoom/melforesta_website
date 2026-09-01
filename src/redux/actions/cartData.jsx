import axios from "axios";
import {
  FETCH_CARTDATA_SUCCESS,
  FETCH_CARTDATA_FAILURES,
} from "../actionTypes";

const Base_Url = import.meta.env.VITE_BASE_URL;

export const fetchCartData = () => {
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
      const res = await axios.get(`${Base_Url}/api/cart/getCartItems`, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });

      dispatch({
        type: FETCH_CARTDATA_SUCCESS,
        payload: {
          cartData: Array.isArray(res.data.data) ? res.data.data : [],
          message: res.data.message || "cart data fetched successfully",
        },
      });
    } catch (err) {
      dispatch({
        type: FETCH_CARTDATA_FAILURES,
        payload: err.response?.data?.message || err.message,
      });
    }
  };
};
