import axios from "axios";
import { toast } from "react-toastify";
const Base_Url = import.meta.env.VITE_BASE_URL;
const validateCouponCode = async (couponCode) => {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.get(
      `${Base_Url}/api/coupon/applyCoupon/${couponCode}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res.data;
  } catch (err) {
    throw err.response?.data || err;
  }
};

export default validateCouponCode;
