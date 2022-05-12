import {
    GET_ALL_PRODUCTS,
    GET_ALL_PRODUCTS_BY_BRANDS,
    GET_PRODUCT_BY_ID,
    CREATE_CATEGORY,
    POST_LOG_IN,
    FILTER_BY_BRANDS,
    FILTER_BY_GENDER,
    ORDER_PRODUCTS,
    SET_CURRENT_PAGE,
    GET_ALL_BRANDS,
} from "./types";
const axios = require('axios')


export const getAllProducts = (name) => {
    return dispatch => {
        axios
            .get(`http://localhost:3001/products/?name=${name ? name : ""}`)
            .then(response => {
                return dispatch({
                    type: GET_ALL_PRODUCTS,
                    payload: response.data,
                });
            })
            .catch(error => {
                alert(error.response.data.message);
            });
    };
};

export const getAllProductsByBrands = (brand) => {
    return dispatch => {
        axios
            .get(`http://localhost:3001/products/?brand=${brand ? brand : ""}`)
            .then(response => {
                return dispatch({
                    type: GET_ALL_PRODUCTS_BY_BRANDS,
                    payload: response.data,
                });
            })
            .catch(error => {
                alert(error.response.data.message);
            });
    };
};

export function getProductById(payload) {
    return function (dispatch) {
        try {
            // direccion a cambiar
            return fetch(`http://localhost:3001/products/details/${payload}`)
                .then(response => response.json())
                .then(details => {
                    dispatch({
                        type: GET_PRODUCT_BY_ID,
                        payload: details.data,
                    });
                });
        } catch (error) {
            alert(error.details.data.message);
        }
    };
}

export const createCategory = category => {
    return async dispatch => {
        try {
            await axios.post("base de datos HenryShoes", category);
            return dispatch({
                type: CREATE_CATEGORY,
            });
        } catch (error) {
            console.log(error);
        }
    };
};

export const filterByBrands = filter => {
    return {
        type: FILTER_BY_BRANDS,
        payload: filter,
    };
};

export const filterByGender = filter => {
    return {
        type: FILTER_BY_GENDER,
        payload: filter,
    };
};

export function postLogIn(payload) {
    return async function (dispatch) {
        // cambiar la ruta
        const result = await axios.post("http://localhost:3001/models", payload);
        return dispatch({
            type: POST_LOG_IN,
            payload: result,
        });
    };
}

export const orderProducts = payload => {
    return {
        type: ORDER_PRODUCTS,
        payload,
    };
};

export const setCurrentPage = payload => {
    return {
        type: SET_CURRENT_PAGE,
        payload,
    };
};

export const getAllBrands = () => {
    return dispatch => {
        axios
            .get("http://localhost:3001/brand")
            .then(response => {
                return dispatch({
                    type: GET_ALL_BRANDS,
                    payload: response.data,
                });
            })
            .catch(error => {
                alert(error.response.data.message);
            });
    };
};