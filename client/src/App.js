import React from 'react'
import { Routes, Route } from "react-router-dom";

import LandingPage from './Components/LandingPage/LandingPage';

function App() {
    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/home" />
            <Route path="/details" />
            <Route path="/formInicio" />


        </Routes>
    );
}

export default App;
