
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
import LoginSuccess from "./Components/containers/LoginSuccess";
import ChangePassword from "./Components/ChangePassword";
import ForgotPassword from "./Components/ForgotPassword";
import WishList from "./Components/WishList/WishList"
import UserProfile from "./Components/User/UserProfile";
import VerifyPay from "./Components/ShoppingCart/VerifyPay";
import PaymentSuccess from "./Components/ShoppingCart/PaymentSuccess";
import PaymentCancel from "./Components/ShoppingCart/PaymentCancel";
import OrderDetail from "./Components/User/OrderDetail";

function App() {

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
        <Route path="/wish-list" element={<WishList />} />
        <Route path='/profile' element={<UserProfile />} />
        <Route path='/checkout' element={<VerifyPay />} />
        <Route path='/payment-success' element={<PaymentSuccess />} />
        <Route path='/payment-cancel' element={<PaymentCancel />} />
        <Route path='/detail/:orderId' element={<OrderDetail />} />
      </Routes>
    </ContentWrapper>

  );
}

export default App;


const ContentWrapper = styled.div`
  min-height: 100vh;
  padding: 3rem;
  @media (max-width:500px){
    padding: 0.2rem;
}  
`; 