import { GET_ALL_PRODUCTS, ORDER_PRODUCTS } from "../actions/types";




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
        case ORDER_PRODUCTS:
            let ordered = state.products;
            payload === "Mayor precio" && ordered.sort((a,b)=>{
                return b.prices - a.prices;
            });
            payload === "Menor precio" && ordered.sort((a, b)=> {
                return a.prices - b.prices;
            });
            payload === "Mas recientes" && ordered.sort((a, b)=>{
                return b.releaseDate - a.releaseDate;
            });
            payload === "Menos recientes" && ordered.sort((a, b)=>{
                return a.releaseDate - b.releaseDate;
            })
            return { ...state, product: ordered};
        default: 
            return {
            ...state
            }
        
        }
}