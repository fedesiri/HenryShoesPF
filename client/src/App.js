import React from 'react'
import { Routes, Route } from "react-router-dom";

import LandingPage from './Components/LandingPage/LandingPage';
import CreateProduct from './Components/CreateProduct';

function App() {
    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/home" />
            <Route path="/details" />
            <Route path="/formInicio" />
            <Route path="/CreateProduct" element={<CreateProduct/>}/>


        </Routes>
    );
}

export default App;
