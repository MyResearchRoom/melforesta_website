import axios from "axios";
import { toast } from "react-toastify";
import { fetchCartData } from "../redux/actions/cartData";
const Base_Url = import.meta.env.VITE_BASE_URL;

export const addToCart = (productId,quantity=1,variantId) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${Base_Url}/api/cart/addToCart`,
        { productId, quantity, variantId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success(res.data.message || "Product added to cart");
      dispatch(fetchCartData());
    } catch (err) {
      console.error("Failed to add to cart", err);
      if (err.response?.status === 400) {
        toast.info(err.response.data?.message || "Product already in cart");
      } else {
        toast.error(err.response?.data?.message || "Failed to add to cart");
      }
    }
  };
};

export const removeFromCart = (productId,variantId, showToast = true) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.delete(`${Base_Url}/api/cart/removeFromCart`, {
        headers: { Authorization: `Bearer ${token}` },
        data: { productId, variantId},
      });
      
      dispatch(fetchCartData());
      if (showToast) {
        toast.warn(res.data.message || "Product removed from cart");
      }
    } catch (err) {
      console.error("Failed to remove from cart", err);
      toast.error(err.response?.data?.message || "Failed to remove from cart");
    }
  };
};