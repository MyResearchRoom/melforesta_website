import {
  FETCH_CUSTOMERADDRESS_SUCCESS,
  FETCH_CUSTOMERADDRESS_FAILURE,
} from "../actionTypes";

const initialState = {
  address: [],
  error: null,
  message: null,
};

export const customerAddressReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CUSTOMERADDRESS_SUCCESS:
      return {
        ...state,
        address: action.payload.address, 
        message: action.payload.message,
        error: null,
      };
    case FETCH_CUSTOMERADDRESS_FAILURE:
      return {
        ...state,
        address: null,
        error: action.payload,     
        message: null,
      };
    default:
      return state;
  }
};


