import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { postLogIn } from "../redux/actions/index";
import { SubmitBtn } from "../styles/FormularioInicio";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import Input from "./Input";
import GoogleLoginComponent from "./GoogleLoginComponent";


const FormularioInicio = ({ closeLogin, openCreateAccount }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";

  const [email, setEmail] = useState({ field: "", validated: null });
  const [password, setPassword] = useState({ field: "", validated: null });

  const expression = {
    regexName: /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/g,
    regexEmail: /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/,
    regexUsername: /^[A-Za-z0-9\s]+$/g,
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
        
        setEmail({
          field: "",
          validated: null,
        });
        setPassword({
          field: "",
          validated: null,
        });
        if (response) {
          window.localStorage.setItem(
            "userInfo",
            JSON.stringify(response.payload)
          );
          closeLogin();
          navigate(redirect || "/");
        } else {
          return;
        }
      }
    } catch (error) {
      console.error(error);
    }
  }


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
        <br />
        <SubmitBtn type="submit">Log In</SubmitBtn>
      </form>
     
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
      <GoogleLoginComponent />
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
