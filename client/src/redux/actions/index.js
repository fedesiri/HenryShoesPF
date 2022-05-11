import {
    GET_ALL_PRODUCTS,
    GET_PRODUCT_BY_ID,
    POST_LOG_IN,
    FILTER_BY_BRANDS,
    FILTER_BY_GENDER,
} from "./types";

export const getAllProducts = () => {
    return dispatch => {
        axios
            .get("http://localhost:3001/models")
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

export function getProductById(payload) {
    return function (dispatch) {
        try {
            // direccion a cambiar
            return fetch(`http://localhost:3001/models/${payload}`)
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
