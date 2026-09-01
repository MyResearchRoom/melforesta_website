import axios from "axios";
import { toast } from "react-toastify";
import { fetchCartData } from "../redux/actions/cartData";
const Base_Url = import.meta.env.VITE_BASE_URL;

export const incrementQuantityOfCartProduct = (productId,variantId) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${Base_Url}/api/cart/incrementQuantity`,
        { productId,variantId},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(res.data.message || "Product quantity incremented successfully");
      dispatch(fetchCartData());
    } catch (err) {
      console.error("Failed to increment quantity", err);
      if (err.response?.status === 404) {
        toast.info(err.response.data?.message || "Product not found in cart");
      } else {
        toast.error(err.response?.data?.message || "Failed to increment quantity");
      }
    }
  };
};

export const decrementQuantityOfCartProduct = (productId,variantId) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${Base_Url}/api/cart/decrementQuantity`,
        { productId,variantId},
        { headers: { Authorization: `Bearer ${token}` } }
      );
        
      toast.warn(res.data.message || "Product quantity decremented successfully");
      dispatch(fetchCartData());
    } catch (err) {
      console.error("Failed to decrement quantity from cart", err);

      if (err.response?.status === 404) {
        toast.info(err.response.data?.message || "Product not found in cart");
      } else {
        toast.error(err.response?.data?.message || "Failed to decrement quantity");
      }
    }
  };
};