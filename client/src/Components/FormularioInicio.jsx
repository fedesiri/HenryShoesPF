import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { postLogIn } from "../redux/actions/index";
import { SubmitBtn } from "../styles/FormularioInicio";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import Input from "./Input";
import GoogleLoginComponent from "./GoogleLoginComponent";


const FormularioInicio = ({ closeLogin, openCreateAccount }) => {
  const dispatch = useDispatch();


  const [email, setEmail] = useState({ field: "", validated: null });
  const [password, setPassword] = useState({ field: "", validated: null });

  const expression = {
    regexName: /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/g,
    regexEmail: /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/,
    regexLetra: /[A-z]/,
    regexMayuscula: /[A-Z]/,
    regexNumero: /\d/,
    regexLetrasYNumeros: /[^a-zA-Z0-9]/,
    regexPassword: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
  };

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (email === "" || password === "") {
        return toast.error("Please complete all fields");
      } else {
        const response = await dispatch(
          postLogIn({
            email: email.field,
            password: password.field,
          })
        );
        console.log(response, "SOY DATA")
        
        setEmail({
          field: "",
          validated: null,
        });
        setPassword({
          field: "",
          validated: null,
        });
        if (response?.payload) {
          window.localStorage.setItem(
            "userInfo",
            //! extraer solo la info necesaria del response.payload
            JSON.stringify(response.payload)
          );
          closeLogin();
          // navigate(-1);
        } else {
          return;
        }
      }
    } catch (error) {
      console.error(error);
    }
  }
  const showPassword = () => {
    var tipo = document.getElementById("password-login");
    if (tipo.type === "password") {
      tipo.type = "text";
    } else {
      tipo.type = "password";
    }
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <form onSubmit={(e) => handleSubmit(e)}>
        <Input
        id="email-login"
          state={email}
          setState={setEmail}
          type="email"
          label="Email"
          placeholder="Email"
          name="email"
          errorText="Email is required."
          expresionRegular={expression.regexEmail}
        />
        <Input
         id="password-login"
          state={password}
          setState={setPassword}
          type="password"
          label="Password"
          placeholder="Password"
          name="password"
          errorText="Password is required."
          expresionRegular={expression.regexPassword}
        />
        <div
          style={{
            backgroundColor: "#303030",
            width: "100px",
            height: "25px",
            alignItems: "center",
            borderRadius: "10px",
            marginTop: "5px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <span
            style={{ cursor: "pointer", fontSize: "12px", color: "white" }}
            onClick={showPassword}
          >
            Show password
          </span>
        </div>
        <br />
        <SubmitBtn type="submit">Log In</SubmitBtn>
      </form>
      <Link style={{textDecoration:"none"}} to="/forgot-password">
      <p style={{ cursor: "pointer", color: "#00bcd4", }} >Forgot your password?</p>
      </Link>
     
      <br />
      <div>
        <span>If you still haven't an account,</span>
        <span
          style={{ cursor: "pointer", color: "#00bcd4" }}
          onClick={() => {
            closeLogin();
            openCreateAccount();
          }}
        >
          {" "}
          sign up.{" "}
        </span>
      </div>
      <br />
      <GoogleLoginComponent closeLogin={closeLogin} />
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
      />
      {/* </DivLogin> */}
    </div>
  );
};

export default FormularioInicio;
