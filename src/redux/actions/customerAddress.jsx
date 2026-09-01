import axios from "axios";
import {
  FETCH_CUSTOMERADDRESS_SUCCESS,
  FETCH_CUSTOMERADDRESS_FAILURE,
} from "../actionTypes";
const Base_Url = import.meta.env.VITE_BASE_URL;

export const fetchCustomerAddress = () => {
  return async (dispatch) => {
    try {
      const token=localStorage.getItem("token");
      const res = await axios.get(`${Base_Url}/api/address/getAddresses`, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });

      dispatch({
        type: FETCH_CUSTOMERADDRESS_SUCCESS,
        payload: {
          address: Array.isArray(res.data.data) ? res.data.data : [],
          message: res.data.message || "address fetched successfully",
        },
      });
    } catch (err) {
      dispatch({
        type: FETCH_CUSTOMERADDRESS_FAILURE,
        payload: err.response?.data?.message || err.message,
      });
    }
  };
};
