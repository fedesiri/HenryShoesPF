
import { 
    GET_ALL_PRODUCTS,
    GET_PRODUCT_BY_ID, 
    FILTER_BY_BRANDS, 
    FILTER_BY_GENDER, 
    GET_ALL_BRANDS, 
    POST_LOG_IN, 
    ORDER_PRODUCTS,
    SET_CURRENT_PAGE,
    GET_ALL_PRODUCTS_BY_BRANDS,
} from "../actions/types";


const intialState = {
    products: [],
    allProducts: [],
    productsByBrand: [],
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
        
        case GET_ALL_PRODUCTS_BY_BRANDS:
            return {
                ...state,
                productsByBrand: payload,
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
            const allProductsBrand = state.allProducts;
            const brandFilter = payload === "All"
                ? allProductsBrand.filter((product) => product.length >= 0)
                : allProductsBrand.filter((product) => (product.brand.name).includes(payload));
                return { ...state,
                    products: brandFilter,
                    
                };
        
        
        case FILTER_BY_GENDER:
            let productFiltersByGender = state.allProducts;
            let shoesByGender = [];
            if (payload !== "filterByGender") {
                // for (let i = 0; i < productFiltersByGender?.length; i++) {
                //     for (let j = 0; j < productFiltersByGender[i].results.length; j++) {
                //         if (productFiltersByGender[i].results[j].gender === payload) {
                //             shoesByGender.push(productFiltersByGender[i]);
                //         }
                //     }
                // }
                shoesByGender = productFiltersByGender.filter((product) => product.gender.includes(payload))
                return { ...state, products: shoesByGender };
            }
        return { ...state, products: productFiltersByGender }

        case ORDER_PRODUCTS:
            let ordered = state.products;
            payload === "Mayor precio" && ordered.sort((a, b) => {
                return b.price - a.price;
            });
            payload === "Menor precio" && ordered.sort((a, b) => {
                return a.price - b.price;
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








