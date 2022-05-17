import React from "react";
import { Routes, Route } from "react-router-dom";

import LandingPage from "./Components/LandingPage/LandingPage";
import Catalog from "./Components/CatalogPage/CatalogPage";

import CargarOferta from "./Components/CargarOferta";
import CreateProduct from "./Components/CreateProduct";
import FormularioInicio from "./Components/FormularioInicio";
import Details from "./Components/Details";
import EditProduct from "./Components/EditProduct";
import FormularioCrearCuenta from "./Components/FormularioCrearCuenta"

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<FormularioInicio />} />
      <Route path="/register" element={<FormularioCrearCuenta />} />
      <Route path="/details/:id" element={<Details />} />
      <Route path="/edit/:id" element={<EditProduct />} />

      <Route path="/createOfert" element={<CargarOferta />} />

      <Route path="/catalogPage" element={<Catalog />} />
      <Route path="/login" />
      <Route path="/createProduct" element={<CreateProduct />} />
    </Routes>
  );
}

export default App;
