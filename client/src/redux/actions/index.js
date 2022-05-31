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
  CLEAR_DETAIL,
  POST_REGISTER,
  ADD_SHOPPING_CART,
  REMOVE_SHOPPING_CART,
  REMOVE_ONE_PRODUCT_CART,
  ADD_ONE_PRODUCT_CART,
  COMBINE_STATE_CART,
  GET_SHOPPING_CART,
  FETCH_USER_AUTH,
  ADD_WISH_LIST,
  GET_WISH_LIST,
  FETCH_USER,
  PLACE_ORDER,
  CLEAR_SHOPPINGCART,
  GET_BACK_CART,
  REMOVE_BACK_CART,
  AUX_SHOPPING_CART,
  GET_ALL_SIZES
  FETCH_USER_DATA,
  GET_STATE_CART,

} from "./types";

export const getAllProducts = (name) => {
  return (dispatch) => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/products/?name=${name ? name : ""}`
      )
      .then((response) => {
        return dispatch({
          type: GET_ALL_PRODUCTS,
          payload: response.data,
        });
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };
};

export const getAllProductsByBrands = (brand) => {
  return (dispatch) => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/products/?brand=${brand ? brand : ""}`
      )
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
      return fetch(
        `${process.env.REACT_APP_API_URL}/products/details/${payload}`
      )
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
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/signin`,
        {
          email,
          password,
        }
      );
      return dispatch({
        type: POST_LOG_IN,
        payload: response.data,
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
      .get(`${process.env.REACT_APP_API_URL}/admin/brands`)
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

export const getAllSizes = () => {
  return (dispatch) => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/admin/sizes`)
      .then((response) => {
        return dispatch({
          type: GET_ALL_SIZES,
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
    const result = await axios.put(
      `${process.env.REACT_APP_API_URL}/admin/sale`,
      payload
    );
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
  const value = { id: payload };

  return async function (dispatch) {
    // cambiar la ruta
    const result = await axios.put(
      `${process.env.REACT_APP_API_URL}/admin/deleteDestacado`,
      value
    );
    return dispatch({
      type: DELETE_DESTACADO_PRODUCTS,
      payload: result,
    });
  };
}

export const deletePromotion = (payload) => {
  const value = { id: payload };
  return async function (dispatch) {
    // cambiar la ruta
    const result = await axios.put(
      `${process.env.REACT_APP_API_URL}/admin/deletePromotion`,
      value
    );
    return dispatch({
      type: DELETE_PROMOTION_PRODUCTS,
      payload: result,
    });
  };
};

export const clearDetail = () => {
  return {
    type: CLEAR_DETAIL,
  };
};

export const postRegister = ({ name, lastname, password, email, address }) => {
  return async function (dispatch) {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/signup`,
        {
          name,
          lastname,
          password,
          email,
          address,
        }
      );
      return dispatch({
        type: POST_REGISTER,
        payload: data,
      });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
};

export const addShoppingCart = (payload) => {
  return {
    type: ADD_SHOPPING_CART,
    payload,
  };
};

export const removeProductCart = (payload) => {
  return {
    type: REMOVE_SHOPPING_CART,
    payload,
  };
};

export const removeOneProductCart = (payload) => {
  return {
    type: REMOVE_ONE_PRODUCT_CART,
    payload,
  };
};

export const addOneProductCart = (payload) => {
  return {
    type: ADD_ONE_PRODUCT_CART,
    payload,
  };
};

export const combineStateCart = (payload) => {
  // console.log(payload)
  return async function (dispatch) {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/orders/create`,
        payload
      );
      return dispatch({
        type: COMBINE_STATE_CART,
        payload: []
      });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
};


export const getShoppingCart = () => {
  return {
    type: GET_SHOPPING_CART,
  };
};

export const fetchUserAuthenticated = () => {
  return async function (dispatch) {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/user/auth`,
        {
          withCredentials: true,
        }
      );

      return dispatch({
        type: FETCH_USER_AUTH,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const addWishList = (payload) => {
  // console.log(payload);
  return async function (dispatch) {
    // cambiar la ruta
    const result = await axios.post(
      `${process.env.REACT_APP_API_URL}/wishlist/add`,
      payload
    );
    // console.log(result);
    return dispatch({
      type: ADD_WISH_LIST,
      payload: result,
    });
  };
};

export const getWishList = (payload) => {
  return async function (dispatch) {
    // cambiar la ruta
    const result = await axios.post(
      `${process.env.REACT_APP_API_URL}/wishlist`,
      payload
    );
    return dispatch({
      type: GET_WISH_LIST,
      payload: result,
    });
  };
};

export const deleteWishList = (payload) => {
  // console.log(payload)
  return async function (dispatch) {
    let result = await axios.put(
      `${process.env.REACT_APP_API_URL}/wishlist/remove`,
      payload
    );
    return dispatch({
      type: ADD_WISH_LIST,
      payload: result,
    });
  };
};

export const fetchDataUserUpdated = (payload) => {
  // console.log(payload)
  return async function (dispatch) {
    const response = await axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}/user/${payload}`,
    });
    // console.log(response)
    return dispatch({
      type: FETCH_USER,
      payload: response.data,
    });
  };
};

export const placeOrder = (payload) => {
  // console.log(payload);
  return async function (dispatch) {
    const response = await axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}/orders/create`,
      data: payload,
    });
    toast(response.data.message)
    if (response.data.message === "Stock is not enough.") {
      setTimeout(() => {
        window.location.href = '/cart'
      }, 3000)
    }
    return dispatch({
      type: PLACE_ORDER,
      payload: response.data,
    });
  };
};

export const clearShoppingCart = () => {
  return {
    type: CLEAR_SHOPPINGCART,
  };
}


export const getCartBack = (payload) => {
  let info = { email: payload }
  return async function (dispatch) {
    // cambiar la ruta
    const result = await axios.post(
      `${process.env.REACT_APP_API_URL}/shoppingcart`,
      info
    );
    return dispatch({
      type: GET_BACK_CART,
      payload: result,
    });
  };
};


export const removeBackCart = (payload) => {
  // console.log(payload)
  return async function (dispatch) {
    // cambiar la ruta
    const result = await axios.put(
      `${process.env.REACT_APP_API_URL}/shoppingcart/remove`,
      payload
    );
    return dispatch({
      type: REMOVE_BACK_CART,
      payload: result,
    });
  };
};

export const stateAuxShoppingCart = (payload) => {
  // console.log(payload)
  return {
    type: AUX_SHOPPING_CART,
    payload
  };

}

export const fetchUserData = (payload) => {
  return async function (dispatch) {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/user/${payload}`);
      return dispatch({
        type: FETCH_USER_DATA,
        payload: response.data,
      });
      
    } catch (error) {
      console.log(error);
    }
  };
}

export const getStateCart = () =>{
  return {
    type: GET_STATE_CART
  }
}