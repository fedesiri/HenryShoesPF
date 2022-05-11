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
                        type: "CALL_ID", payload: details
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
            type: "POST_RESULT",
            payload: result
        })

    }
}