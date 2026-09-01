import {
  FETCH_PROCESSORDERS_SUCCESS,
  FETCH_PROCESSORDERS_FAILURE,
} from "../actionTypes";

const initialState = {
  processedproducts: [],
  error: null,
  message: null,
};

export const orderProductProcessReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PROCESSORDERS_SUCCESS:
      return {
         ...state,
        processedproducts: action.payload.processedproducts,
        message: action.payload.message,       
     };

    case FETCH_PROCESSORDERS_FAILURE:
      return { 
        ...state,
        error: action.payload,
        message:null,
    };

    default:
      return state;
  }
};
