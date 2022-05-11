const intialState = {
    details: [],
    postmsj: [],
};

export default function rootReducer(state = intialState, { type, payload }) {
    switch (type) {


        case "CALL_ID":
            return {
                ...state,
                details: payload,
            }

        case "POST_RESULT":
            return {
                ...state,
                postmsj: payload,

            };

        default:
            return {
                ...state
            }

    }
}








