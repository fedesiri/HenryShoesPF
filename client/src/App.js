import React from "react";
import { Routes, Route } from "react-router-dom";

import catalogPage from "./components/catalogPage/catalogPage";
import LandingPage from "./components/LandingPage/LandingPage";
import Catalog from "./components/catalogPage/catalogPage";

import CargarOferta from "./components/CargarOferta";
import CreateProduct from "./components/CreateProduct";
import FormularioInicio from "./components/FormularioInicio";
import Details from "./components/Details";
import EditProduct from "./components/EditProduct";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<FormularioInicio />} />
      <Route path="/details/:id" element={<Details />} />
      <Route path="/edit/:id" element={<EditProduct />} />
      <Route path="/cargarOferta" element={<CargarOferta />} />

      <Route path="/catalogPage" element={<Catalog />} />
      <Route path="/login" />
      <Route path="/createProduct" element={<CreateProduct />} />
    </Routes>
  );
}

export default App;
