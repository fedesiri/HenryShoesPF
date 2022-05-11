export const FILTER_BY_BRANDS = "FILTER_BY_BRANDS";
export const FILTER_BY_GENDER = "FILTER_BY_GENDER";
export const CALL_ID = "CALL_ID";
export const POST_RESULT = "POST_RESULT"

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

export function callId(payload) {
    return function (dispatch) {
        try {
            // -----------------------
            // direccion a cambiar 
            //-----------------------------------
            return fetch(`http://localhost:3001/zapatillas/${payload}`)
                .then(response => response.json())
                .then(details => {
                    dispatch({
                        type: CALL_ID, payload: details
                    });
                })
        } catch (error) {
            throw new Error(error)
        }
    };
}

export function postInicioSesion(payload) {
    return async function (dispatch) {
        //----------------
        // cambiar la ruta
        //---------------------

        const result = await axios.post("http://localhost:3001/zapatillas", payload);
        return dispatch({
            type: POST_RESULT,
            payload: result
        })

    }
}
