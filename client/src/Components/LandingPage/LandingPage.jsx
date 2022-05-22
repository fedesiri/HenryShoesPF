import React from "react";
import Slider from "./Slider";
import Promotion from "./Promotion";
import BestSellers from "./BestSellers";
import { Link } from "react-router-dom";
import NavBar from "../NavBar";
import { filter, loginGoogle } from "../../redux/actions";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllProducts, clearDetail } from "../../redux/actions";
import { LandingDiv, FilterContainer, AdminDiv, PromotionDiv, BestSellersDiv, MenBtn, UnisexBtn, WomenBtn, ChildBtn, SliderDiv } from "../../styles/LandingPage";


const LandingPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userInfo);

  useEffect(() => {
    dispatch(clearDetail());
    dispatch(getAllProducts());
  }, [dispatch]);

  useEffect(() => {
    if (window.location.href === "http://localhost:3000/?login=true") {
      const cookies = document.cookie;
      const cookieSeparada = cookies.split(".");
      const token = cookieSeparada[1];
      const user = JSON.parse(atob(token));
   
      window.localStorage.setItem(
        "userInfo",
        JSON.stringify({
          user: {
            username: user.profile.displayName,
            email: user.profile.emails[0].value,
            name: user.profile.name.givenName,
            lastname: user.profile.name.familyName,
            roleId: user.roleId,
          },
        })
      );
      dispatch(loginGoogle());
     
    } else {
      const user = JSON.parse(window.localStorage.getItem("userInfo"));
      user ? console.log("logueado") : console.log("no logueado");
    }
  }, [dispatch]);


  return (
    <LandingDiv>
      <NavBar />
      <AdminDiv>
        {userInfo && userInfo?.user.roleId === 1 && (
          <button>
            <Link to="/CreateProduct"> Create Product </Link>{" "}
          </button>
        )}
      </AdminDiv>
        <SliderDiv>
          <Slider />
        </SliderDiv>
      <FilterContainer>
          <MenBtn
            onClick={() => {
              dispatch(filter({ brand: "All", gender: "men" }));
              navigate("/catalogPage");
            }}
          >                 
            <h1> MEN </h1>
          </MenBtn> 
          <UnisexBtn
            onClick={() => {
              dispatch(filter({ brand: "All", gender: "unisex" }));
              navigate("/catalogPage");
            }}
          > 
            <h1> UNISEX </h1>
          </UnisexBtn>
          <WomenBtn
            onClick={() => {
              dispatch(filter({ brand: "All", gender: "women" }));
              navigate("/catalogPage");
            }}
          >
            <h1> WOMEN </h1>
          </WomenBtn>
          <ChildBtn
            onClick={() => {
              dispatch(filter({ brand: "All", gender: "child" }));
              navigate("/catalogPage");
            }}
          >
            <h1> CHILD </h1>            
          </ChildBtn>
      </FilterContainer>
      
      <PromotionDiv>
        <h1>On Sale</h1>
        <Promotion />
      </PromotionDiv>
      
      <BestSellersDiv>
        <h1>BestSellers</h1>
        <BestSellers />
      </BestSellersDiv> 

    </LandingDiv>
  );
};

export default LandingPage;
