import { GET_ALL_PRODUCTS } from "../actions/types";




const intialState = {
    products:[],
    allProducts:[],
};


export default function rootReducer (state = intialState, {type, payload}){
    switch (type) {
        case GET_ALL_PRODUCTS:
            return {
                ...state,
                products: payload,
                allProducts: payload,
            };
        default: 
            return {
            ...state
            }
        
        }
}