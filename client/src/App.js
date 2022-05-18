
import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./Components/LandingPage/LandingPage";
import Catalog from "./Components/CatalogPage/CatalogPage";
import CargarOferta from "./Components/CargarOferta";
import CreateProduct from "./Components/CreateProduct";
import Details from "./Components/Details";
import EditProduct from "./Components/EditProduct";
import styled from "styled-components";

function App() {
  return (
    <ContentWrapper>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/edit/:id" element={<EditProduct />} />
        <Route path="/createOfert" element={<CargarOferta />} />
        <Route path="/catalogPage" element={<Catalog />} />
        <Route path="/createProduct" element={<CreateProduct />} />
      </Routes>
    </ContentWrapper>
  );
}

export default App;


const ContentWrapper = styled.div`
  min-height: 100vh;
  padding: 2rem;
  margin: auto;
`; 