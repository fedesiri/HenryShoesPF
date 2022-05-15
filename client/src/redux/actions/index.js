import axios from "axios";
import { toast } from "react-toastify";
import {

    GET_ALL_PRODUCTS,
    GET_ALL_PRODUCTS_BY_BRANDS,
    GET_PRODUCT_BY_ID,
    CREATE_CATEGORY,
    POST_LOG_IN,
    FILTER,
    ORDER_PRODUCTS,
    SET_CURRENT_PAGE,
    GET_ALL_BRANDS,
    SELECT_OFERT,
    SEND_OFERT_BACK,
    CLEAR_OFERT,
    FILTER_OFERT_DESTACADO,
    CLEAR_OFERT_DESTACADO,
    DELETE_DESTACADO_PRODUCTS,
    DELETE_PROMOTION_PRODUCTS,
   POST_LOG_OUT,

} from "./types";

export const getAllProducts = (name) => {
  return (dispatch) => {
    axios
      .get(`http://localhost:3001/products/?name=${name ? name : ""}`)
      .then((response) => {
        return dispatch({
          type: GET_ALL_PRODUCTS,
          payload: response.data,
        });
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  };
};

export const getAllProductsByBrands = (brand) => {
  return (dispatch) => {
    axios
      .get(`http://localhost:3001/products/?brand=${brand ? brand : ""}`)
      .then((response) => {
        return dispatch({
          type: GET_ALL_PRODUCTS_BY_BRANDS,
          payload: response.data,
        });
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  };
};

export function getProductById(payload) {
  return function (dispatch) {
    try {
      // direccion a cambiar
      return fetch(`http://localhost:3001/products/details/${payload}`)
        .then((response) => response.json())
        .then((details) => {
          dispatch({
            type: GET_PRODUCT_BY_ID,
            payload: details,
          });
        });
    } catch (error) {
      alert(error.details.data.message);
    }
  };
}

export const createCategory = (category) => {
  return async (dispatch) => {
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

export const filter = (filter) => {
  return {
    type: FILTER,
    payload: filter,
  };
};

export function postLogIn({ email, password }) {
  return async function (dispatch) {
    try {
      const { data } = await axios.post("http://localhost:3001/auth/login", {
        email,
        password,
      });
      return dispatch({
        type: POST_LOG_IN,
        payload: data,
      });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

export const postLogOut = () => {
  return {
    type: POST_LOG_OUT,
  };
};

export const orderProducts = (payload) => {
  return {
    type: ORDER_PRODUCTS,
    payload,
  };
};

export const setCurrentPage = (payload) => {
  return {
    type: SET_CURRENT_PAGE,
    payload,
  };
};

export const getAllBrands = () => {
  return (dispatch) => {
    axios
      .get("http://localhost:3001/brands")
      .then((response) => {
        return dispatch({
          type: GET_ALL_BRANDS,
          payload: response.data,
        });
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  };
};

export const selectOfert = (payload) => {
  return {
    type: SELECT_OFERT,
    payload,
  };
};

export function sendOfertToBack(payload) {

    return async function (dispatch) {
        // cambiar la ruta
        const result = await axios.put("http://localhost:3001/products/ofert", payload);
        return dispatch({
            type: SEND_OFERT_BACK,
            payload: result,
        });
    };

}

export const clearOfertSelect = (payload) => {
  return {
    type: CLEAR_OFERT,
    payload,
  };
};

export const clearOfertDestacado = (payload) => {
  return {
    type: CLEAR_OFERT_DESTACADO,
    payload,
  };
};

export const filterOfertDestacado = (payload) => {
  return {
    type: FILTER_OFERT_DESTACADO,
    payload,
  };
};



export function deleteDestacado(payload) {
    const value = { id: payload }
    console.log("verDestacado a Eliminar", value)
    return async function (dispatch) {
        // cambiar la ruta
        const result = await axios.put("http://localhost:3001/products/deleteDestacado", value);
        return dispatch({
            type: DELETE_DESTACADO_PRODUCTS,
            payload: result,
        });
    };
}





export const deletePromotion = payload => {
    const value = { id: payload }
    console.log("verDestacado a Eliminar", value)
    return async function (dispatch) {
        // cambiar la ruta
        const result = await axios.put("http://localhost:3001/products/deletePromotion", value);
        return dispatch({
            type: DELETE_PROMOTION_PRODUCTS,
            payload: result,
        });
    };
};