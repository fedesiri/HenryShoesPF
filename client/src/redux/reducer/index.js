
import { 
    GET_ALL_PRODUCTS,
    GET_PRODUCT_BY_ID, 
    FILTER_BY_BRANDS, 
    FILTER_BY_GENDER, 
    GET_ALL_BRANDS, 
    POST_LOG_IN, 
    ORDER_PRODUCTS,
    SET_CURRENT_PAGE,
} from "../actions/types";


const intialState = {
    products: [],
    allProducts: [],
    postMsj: [],
    details: {},
    page: 1,
    brands: [],
};

export default function rootReducer(state = intialState, { type, payload }) {
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

        case FILTER_BY_BRANDS:
            let productFiltersByBrands = state.allProducts;
            let shoesByBrand = [];
            if (payload !== "filterByBrands") {
                for (let i = 0; i < productFiltersByBrands?.length; i++) {
                    for (let j = 0; j < productFiltersByBrands[i].results.length; j++) {
                        if (productFiltersByBrands[i].results[j].brand === payload) {
                            shoesByBrand.push(productFiltersByBrands[i]);
                        }
                    }
                }
                return { ...state, products: shoesByBrand };
            }
        return { ...state, products: productFiltersByBrands };

        case FILTER_BY_GENDER:
            let productFiltersByGender = state.allProducts;
            let shoesByGender = [];
            if (payload !== "filterByGender") {
                for (let i = 0; i < productFiltersByGender?.length; i++) {
                    for (let j = 0; j < productFiltersByGender[i].results.length; j++) {
                        if (productFiltersByGender[i].results[j].gender === payload) {
                            shoesByGender.push(productFiltersByGender[i]);
                        }
                    }
                }
                return { ...state, products: shoesByGender };
            }
        return { ...state, products: productFiltersByGender }

        case ORDER_PRODUCTS:
            let ordered = state.products;
            payload === "Mayor precio" && ordered.sort((a, b) => {
                return b.prices - a.prices;
            });
            payload === "Menor precio" && ordered.sort((a, b) => {
                return a.prices - b.prices;
            });
            payload === "Mas recientes" && ordered.sort((a, b) => {
                return b.releaseDate - a.releaseDate;
            });
            payload === "Menos recientes" && ordered.sort((a, b) => {
                return a.releaseDate - b.releaseDate;
            })
            return { ...state, products: ordered };

        case GET_ALL_BRANDS:
            return {
                ...state,
                brands: payload
            }
        case SET_CURRENT_PAGE:
            return { ...state, page: payload};

        default:
            return { ...state };
    }
}








