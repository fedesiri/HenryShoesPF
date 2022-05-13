import React from 'react'
import { Routes, Route } from "react-router-dom";
import CatalogPage from "./Components/catalogPage/catalogPage";
import LandingPage from './Components/LandingPage/LandingPage';
import CreateProduct from './Components/CreateProduct';
import FormularioInicio from './Components/FormularioInicio'
import Details from "./Components/Details";

function App() {
    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<FormularioInicio />} />
            <Route path="/details/:id" element={<Details />} />
            <Route path="/catalogPage" element={<CatalogPage/>} />
            <Route path="/formInicio" />
            <Route path="/CreateProduct" element={<CreateProduct/>}/>
        </Routes>
    );
}

export default App;
