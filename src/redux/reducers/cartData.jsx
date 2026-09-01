import {
  FETCH_CARTDATA_SUCCESS,
  FETCH_CARTDATA_FAILURES,
} from "../actionTypes";

const initialState = {
  cartData: [],
  carterror: null,
  message: null,
};

export const cartDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CARTDATA_SUCCESS:
      return {
         ...state,
        cartData: action.payload.cartData,
        message: action.payload.message,
     };

    case FETCH_CARTDATA_FAILURES:
      return { 
        ...state,
        carterror: action.payload,
        message:null,
    };

    default:
      return state;
  }
};
