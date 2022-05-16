import React from "react";
import "./LandinPage.css";
import Slider from "./Slider";
import Promotion from "./Promotion";
import BestSellers from "./BestSellers";
import { Link } from "react-router-dom";
import NavBar from "../NavBar";
import Filter from "../Filters";
import { filter } from "../../redux/actions";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllProducts, postLogOut } from "../../redux/actions";

const LandingPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userInfo);
  // console.log(userInfo);
  const signOutHandler = () => {
    dispatch(postLogOut());
    window.localStorage.removeItem("userInfo");
  };

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);
  return (
    <>
      <NavBar />

      <div>
        {userInfo ? (
          <span>{userInfo.user.username}</span>
        ) : (
          <button>
            <Link to="/login"> Login </Link>
          </button>
        )}

        <button>
          <Link to="/shopping_cart"> Chart </Link>{" "}
        </button>

        {userInfo && userInfo.user.roleId === 1 && (
          <button>
            <Link to="/CreateProduct"> Create Product </Link>{" "}
          </button>
        )}

        {userInfo ? <button onClick={signOutHandler}>Sign Out</button> : null}
      </div>

      <>
        <Slider />
      </>
      <hr />
      <div>
        <img
          src="https://muyfit.com/wp-content/uploads/2020/06/mejores-zapatillas-para-correr-para-hombre.jpg"
          width="30%"
          height="30%"
          alt="img not found"
        ></img>
        <h2> Men </h2>
        <button
          onClick={() => {
            dispatch(filter({ brand: "All", gender: "men" }));
            navigate("/catalogPage");
          }}
        >
          All View
        </button>
      </div>

      <div>
        <img
          src="https://i0.wp.com/solotendencias.net/wp-content/uploads/2021/10/Nike-Air-Jordan-1.jpg?ssl=1"
          width="30%"
          height="30%"
          alt="img not found"
        ></img>
        <h2> Women </h2>
        <button
          onClick={() => {
            dispatch(filter({ brand: "All", gender: "women" }));
            navigate("/catalogPage");
          }}
        >
          All View
        </button>
      </div>

      <div>
        <img
          src="https://thumbs.dreamstime.com/b/ni%C3%B1os-y-ni%C3%B1as-con-coloridos-trajes-deportivos-zapatillas-est%C3%A1n-tomados-de-la-mano-corriendo-aislados-en-un-fondo-blanco-estudio-183091704.jpg"
          width="30%"
          height="30%"
          alt="img not found"
        ></img>
        <h2> Child </h2>
        <button
          onClick={() => {
            dispatch(filter({ brand: "All", gender: "child" }));
            navigate("/catalogPage");
          }}
        >
          All View
        </button>
      </div>

      <hr />
      <h2>On Sale</h2>
      <Promotion />
      <hr />

      <h2>BestSellers</h2>
      <BestSellers />
    </>
  );
};

export default LandingPage;
