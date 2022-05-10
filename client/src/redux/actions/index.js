import { GET_ALL_PRODUCTS } from "./types"


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

