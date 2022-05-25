
import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./Components/LandingPage/LandingPage";
import Catalog from "./Components/CatalogPage/CatalogPage";
import CargarOferta from "./Components/CreateOfertAdmin/CargarOferta";
import CreateProduct from "./Components/CreateProduct";
import Details from "./Components/Details";
import EditProduct from "./Components/EditProduct";
import CreateCategory from "./Components/CreateCategory";
import styled from "styled-components";
import ShoppingCart from "./Components/ShoppingCart/ShoppingCart";
import { useSelector } from "react-redux";
import LoginSuccess from "./Components/containers/LoginSuccess";
import ChangePassword from "./Components/ChangePassword";
import ForgotPassword from "./Components/ForgotPassword";


function App() {
  const userInfo = useSelector((state) => state.userInfo);

  return (
    <ContentWrapper>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/edit/:id" element={<EditProduct />} />
        <Route path="/catalogPage" element={<Catalog />} />
        <Route path="/create-product" element={<CreateProduct />} />
        <Route path="/create-category" element={<CreateCategory />} />
        <Route path="/cart" element={<ShoppingCart />} />
        <Route path="/create-oferta" element={<CargarOferta />} />
        <Route exact path="/signin/success" element={<LoginSuccess />} />
        <Route path="/reset-password/:token" element={<ChangePassword />} />
        <Route exact path="/forgot-password" element={<ForgotPassword />} />
        
      </Routes>
    </ContentWrapper>

  );
}

export default App;


const ContentWrapper = styled.div`
  min-height: 100vh;
  padding: 3rem;
  
`; 