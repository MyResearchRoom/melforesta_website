import axios from "axios";
import {
   FETCH_PRODUCT_SUCCESS,
   FETCH_PRODUCT_FAILURE
} from "../actionTypes";




const Base_Url = import.meta.env.VITE_BASE_URL;

export const fetchProducts = (page = 1, limit = 20, searchTerm = "",categoryId="",minPrice, maxPrice) => {
  return async (dispatch) => {
    try {
      const params = {
        page,
        limit,
        search: searchTerm,
        minPrice, 
        maxPrice,
      };

      if (categoryId !== "all") {
        params.categoryId = categoryId;
      }
      const token=localStorage.getItem("token");
      const res = await axios.get(`${Base_Url}/api/product/getProductList`, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
        params,
      });
      
      const availableProducts = Array.isArray(res.data.data)
        ? res.data.data.filter((product) => !product.isBlock) 
        : [];
        // console.log("product",res);
        
      dispatch({
        type: FETCH_PRODUCT_SUCCESS,
        payload: {
          product: availableProducts,
          message: res.data.message || "Product fetched successfully",
          totalPages: res.data.totalPages,
          totalRecords: res.data.totalRecords,
          currentPage: res.data.currentPage,
        },
      });
    } catch (err) {
      dispatch({
        type: FETCH_PRODUCT_FAILURE,
        payload: err.response?.data?.message || err.message,
      });
    }
  };
};




// export const fetchProducts = () => {
//   return async (dispatch) => {
//     try {
//       // Instead of API call, just dispatch dummy data
//       dispatch({
//         type: FETCH_PRODUCT_SUCCESS,
//         payload: {
//           product: honeyproducts,
//           message: "Dummy products loaded",
//           totalPages: 1,
//           currentPage: 1,
//           totalRecords: honeyproducts.length,
//         },
//       });
//     } catch (err) {
//       dispatch({
//         type: FETCH_PRODUCT_FAILURE,
//         payload: "Failed to load dummy data",
//       });
//     }
//   };
// };