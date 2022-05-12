import React from 'react'
import { Routes, Route } from "react-router-dom";

import LandingPage from './Components/LandingPage/LandingPage';
import FormularioInicio from './Components/FormularioInicio'

function App() {
    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/home" />
            <Route path="/login" element={<FormularioInicio />} />

            <Route path="/details" />
            <Route path="/formInicio" />


        </Routes>
    );
}

export default App;
