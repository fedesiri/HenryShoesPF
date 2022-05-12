import React from 'react'
import { Routes, Route } from "react-router-dom";
import CatalogPage from "./components/catalogPage/CatalogPage";
import LandingPage from './components/LandingPage/LandingPage';
import FormularioInicio from './components/FormularioInicio'


function App() {
    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<FormularioInicio />} />
            <Route path="/details/:id" element={<Details />} />
            <Route path="catalogPage" element={<CatalogPage/>} />
            <Route path="/formInicio" />
        </Routes>
    );
}

export default App;
