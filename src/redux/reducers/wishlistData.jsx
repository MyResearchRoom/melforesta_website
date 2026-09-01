import {
  FETCH_WISHLISTDATA_SUCCESS,
  FETCH_WISHLISTDATA_FAILURES,
} from "../actionTypes";

const initialState = {
  wishlistData: [],
  wishlisterror: null,
  message: null,
};

export const wishlistDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_WISHLISTDATA_SUCCESS:
      return {
         ...state,
        wishlistData: action.payload.wishlistData,
        message: action.payload.message,
     };

    case FETCH_WISHLISTDATA_FAILURES:
      return { 
        ...state,
        wishlisterror: action.payload,
        message:null,
    };

    default:
      return state;
  }
};
