import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from 'react-router-dom';
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store/index";
// import { persistor } from './store';
import { PersistGate } from 'redux-persist/integration/react'


import { GlobalStyles } from "./GlobalStyles";



ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <BrowserRouter>
                <React.StrictMode>
                    <GlobalStyles />
                    <App />
                </React.StrictMode>
            </BrowserRouter>
        </PersistGate>

    </Provider>,
    document.getElementById("root")
);
