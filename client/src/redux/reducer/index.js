const intialState = {
    details: [],
};

export default function rootReducer(state = intialState, { type, payload }) {
    switch (type) {


        case "CALL_ID":
            return {
                ...state,
                details: payload,
            }



        default:
            return {
                ...state
            }

    }
}








