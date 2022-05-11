import { GET_ALL_PRODUCTS, GET_PRODUCT_BY_ID, POST_RESULT } from "../actions/types";

const intialState = {
    products:[],
    allProducts:[],
    postMsj: [],
    details: {},
};

export default function rootReducer (state = intialState, {type, payload}){
    switch (type) {
        case GET_ALL_PRODUCTS:
            return {
                ...state,
                products: payload,
                allProducts: payload,
            };
        case GET_PRODUCT_BY_ID:
            return {
                ...state,
                details: payload,
            };
        case POST_LOG_IN:
            return {
                ...state,
                postMsj: payload,
            };
        default:
            return { ...state };
    }
}








