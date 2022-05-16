import React from "react";
import { Routes, Route } from "react-router-dom";

import LandingPage from "./Components/LandingPage/LandingPage";
import Catalog from "./Components/catalogPage/CatalogPage";

import CargarOferta from "./Components/CargarOferta";
import CreateProduct from "./Components/CreateProduct";
import FormularioInicio from "./Components/FormularioInicio";
import Details from "./Components/Details";
import EditProduct from "./Components/EditProduct";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<FormularioInicio />} />
      <Route path="/details/:id" element={<Details />} />
      <Route path="/edit/:id" element={<EditProduct />} />
      
      {/* Ruta para arreglar, genera error al enviar al back */}
      {/* <Route path="/cargarOferta" element={<CargarOferta />} /> */}

      <Route path="/catalogPage" element={<Catalog />} />
      <Route path="/login" />
      <Route path="/createProduct" element={<CreateProduct />} />
    </Routes>
  );
}

export default App;
