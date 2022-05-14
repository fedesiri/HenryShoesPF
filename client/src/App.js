import React from "react";
import { Routes, Route } from "react-router-dom";
import CatalogPage from "./components/catalogPage/catalogPage";
import LandingPage from "./components/LandingPage/LandingPage";

import CargarOferta from "./components/CargarOferta";
import CreateProduct from "./components/CreateProduct";
import FormularioInicio from "./components/FormularioInicio";
import Details from "./components/Details";

function App() {
    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<FormularioInicio />} />
            <Route path="/details/:id" element={<Details />} />

            <Route path="/CargarOferta" element={<CargarOferta />} />

            <Route path="/catalogPage" element={<CatalogPage />} />
            <Route path="/formInicio" />
            <Route path="/CreateProduct" element={<CreateProduct />} />
        </Routes>
    );
}

export default App;
