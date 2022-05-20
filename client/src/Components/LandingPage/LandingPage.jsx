import React from "react";
import "./LandinPage.css";
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
      console.log(user);
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
      console.log("hola");
    } else {
      const user = JSON.parse(window.localStorage.getItem("userInfo"));
      user ? console.log("logueado") : console.log("no logueado");
    }
  }, [dispatch]);

  return (
    <>
      <NavBar />

      <div>
        {userInfo && userInfo?.user.roleId === 1 && (
          <button>
            <Link to="/CreateProduct"> Create Product </Link>{" "}
          </button>
        )}
      </div>

      <>
        <Slider />
      </>
      <hr />
      <div className="FilterContainer">
        <div className="Men">
          <img
            src="https://muyfit.com/wp-content/uploads/2020/06/mejores-zapatillas-para-correr-para-hombre.jpg"
            width="70%"
            height="70%"
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
            width="70%"
            height="70%"
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
            width="70%"
            height="70%"
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
