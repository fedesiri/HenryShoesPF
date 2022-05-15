import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "../reducer/index";

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
); // rootReducer is the function that returns the state
export default store;
