import React from "react";
import Slider from "./Slider";
import Promotion from "./Promotion";
import BestSellers from "./BestSellers";
import { Link } from "react-router-dom";
import NavBar from "../NavBar";
import { filter } from "../../redux/actions";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllProducts, clearDetail } from "../../redux/actions";
import { Titulo, LandingDiv, FilterContainer, AdminDiv, PromotionDiv, BestSellersDiv, MenBtn, UnisexBtn, WomenBtn, ChildBtn, SliderDiv } from "../../styles/LandingPage";
import Footer from "../Footer";


const LandingPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userInfo);
    //  userInfo&&console.log(userInfo.email)
    //  console.log(userInfo)
  useEffect(() => {
    dispatch(clearDetail());
    dispatch(getAllProducts());
  }, [dispatch]);



  return (
    <LandingDiv>
      <NavBar />
      <AdminDiv>
        {userInfo && userInfo?.roleId === 1 && (
          <button>
            <Link to="/CreateProduct" > Create Product </Link>{" "}
          </button>
        )}
      </AdminDiv>
        <SliderDiv>
          <Slider />
        </SliderDiv>
      <Link to="/CatalogPage" text-decoration="none">
        <Titulo>
          <h1>Catalog Page</h1>
        </Titulo>
      </Link>
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
        <Titulo>
          <h1>On Sale</h1>
        </Titulo>
        <Promotion />
      </PromotionDiv>
      
      <BestSellersDiv>
        <Titulo>
          <h1>BestSellers</h1>
        </Titulo>
        <BestSellers />
      </BestSellersDiv> 

      <Footer/>
    </LandingDiv>
  );
};

export default LandingPage;