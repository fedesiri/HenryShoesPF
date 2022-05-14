import {
    GET_ALL_PRODUCTS,
    GET_PRODUCT_BY_ID,
    FILTER,
    GET_ALL_BRANDS,
    POST_LOG_IN,
    ORDER_PRODUCTS,
    SET_CURRENT_PAGE,
    GET_ALL_PRODUCTS_BY_BRANDS,
    SELECT_OFERT,
    CLEAR_OFERT,
} from "../actions/types";

const intialState = {
    products: [],
    allProducts: [],
    productsByBrand: [],
    postMsj: [],
    details: {},
    page: 1,
    brands: [],
    ofertSelect: [],
    filter: { brand: "All", gender: "filterByGender" },
};

export default function rootReducer(state = intialState, { type, payload }) {
    switch (type) {
        case GET_ALL_PRODUCTS:
            return {
                ...state,
                products: payload,
                allProducts: payload,
                filter: { brand: "All", gender: "filterByGender" },
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

        case FILTER:
            //el payload es = {brand: String, gender: String}
            function filterByBrand(products, brand) {
                if (brand === "All") {
                    return products;
                } else {
                    return products.filter(product => product.brandName.includes(brand));
                }
            }

            function filterByGender(products, gender) {
                if (gender === "filterByGender") {
                    return products;
                } else {
                    return products.filter(product => product.gender.includes(gender));
                }

            }
            console.log("soy all", state.allProducts);
            const productsFilterByBrands = filterByBrand(state.allProducts, payload.brand);
            console.log("soy produt firlter by brands", productsFilterByBrands);
            const productsFilterByGender = filterByGender(productsFilterByBrands, payload.gender);
            console.log("soy produt firlter by GENDER", productsFilterByGender);

            return {
                ...state,
                products: productsFilterByGender,
                filter: { brand: payload.brand, gender: payload.gender },
            };

        case ORDER_PRODUCTS:
            let ordered = state.products;
            payload === "Mayor precio" &&
                ordered.sort((a, b) => {
                    return b.price - a.price;
                });
            payload === "Menor precio" &&
                ordered.sort((a, b) => {
                    return a.price - b.price;
                });
            payload === "Mas recientes" &&
                ordered.sort((a, b) => {
                    return b.releaseDate - a.releaseDate;
                });
            payload === "Menos recientes" &&
                ordered.sort((a, b) => {
                    return a.releaseDate - b.releaseDate;
                });
            return { ...state, products: ordered };

        case GET_ALL_BRANDS:
            return {
                ...state,
                brands: payload,
            };
        case SET_CURRENT_PAGE:
            return { ...state, page: payload };

        case CLEAR_OFERT:
            return {
                ...state,
                ofertSelect: []
            };


        case SELECT_OFERT:
            const auxState = state.allProducts;
            const infoChequear =
                payload.length <= 4 && auxState.filter(e => e.id === Number(payload));
            const infoModels = auxState.filter(
                e =>
                    e.model.toLocaleLowerCase().slice(0, 15) ===
                    payload.trim().toLocaleLowerCase().slice(0, 15)
            );

            return {
                ...state,
                ofertSelect: infoChequear ? infoChequear : infoModels,
            };

        default:
            return { ...state };
    }
}
