import axios from "axios";
import {
  FETCH_LOGGEDUSER_FAILURE,
  FETCH_LOGGEDUSER_SUCCESS,
  LOGOUT_USER,
} from "../actionTypes";

const Base_Url = import.meta.env.VITE_BASE_URL;
export const fetchLoggedUser = () => {
  const storedUser = localStorage.getItem("user");

  return async (dispatch) => {
    try {
      const parsedUser = storedUser ? JSON.parse(storedUser) : null;
      if (!parsedUser || parsedUser.role !== "CUSTOMER") {
      // if (!role || role !== "CUSTOMER") {
        console.log("Skipped API call — user is not a CUSTOMER");
        return;
      }
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token not found");
      }

      const res = await axios.get(`${Base_Url}/api/auth/getUser`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      dispatch({
        type: FETCH_LOGGEDUSER_SUCCESS,
        payload: {
          user: res.data.data || null,
          message: res.data.message || "User fetched successfully",
        },
      });
    } catch (err) {
      dispatch({
        type: FETCH_LOGGEDUSER_FAILURE,
        payload: err.response?.data?.message || err.message,
      });
    }
  };
};

export const logoutUser = () => {
  return {
    type: LOGOUT_USER
  };
};
