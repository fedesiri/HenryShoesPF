import { CREATE_CATEGORY, GET_ALL_PRODUCTS, ORDER_PRODUCTS } from "./types"


export const getAllProducts = ()=>{
    return (dispatch) =>{
        axios.get("base de datos Henryshoes")
        .then((response)=>{
            return dispatch({
            type: GET_ALL_PRODUCTS,
            payload: response.data,
            });
        })
        .catch((error) => {
            alert(error.response.data.message);
        });
    }
};

export const orderProducts = (payload)=>{
    return {
        type: ORDER_PRODUCTS,
        payload,
    };
};

export const createCategory = (category)=>{
    return async (dispatch)=>{
        try {
            await axios.post("base de datos HenryShoes", category);
            return dispatch({
                type: CREATE_CATEGORY,
            });
        } catch (error) {

            console.log(error)
        }
    }
};
