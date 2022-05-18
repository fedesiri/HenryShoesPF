import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { postLogIn } from "../redux/actions/index";
import {
  // LoginForm,
  // DivLogin,
  // ErrorDiv,
  // LowerDiv,
  SubmitBtn,
} from "../styles/FormularioInicio";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import Input from "./Input";

const FormularioInicio = ({ closeLogin, openCreateAccount }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";

  // const userInfoState = useSelector((state) => state.userInfo);
  // console.log("soy userInfoState", userInfoState);

  const [email, setEmail] = useState({ field: "", validated: null });
  const [password, setPassword] = useState({ field: "", validated: null });

  // function handleChange(e) {
  //   e.preventDefault();
  //   setInput({
  //     ...input,
  //     [e.target.name]: e.target.value,
  //   });
  //   let objError = validate({ ...input, [e.target.name]: e.target.value });
  //   setError(objError);
  // }

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
        console.log("response", response);
        setEmail({
          email: "",
          validated: null,
        });
        setPassword({
          password: "",
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

  // function validate(input) {
  //   let errors = {};
  //   let regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;
  //   let regexLetra = /[A-z]/;
  //   let regexMayuscula = /[A-Z]/;
  //   let regexNumero = /\d/;

  //   if (!input.email) {
  //     errors.email = "Insert E-mail.";
  //   } else if (!regexEmail.test(input.email.trim())) {
  //     errors.email = "The E-mail is incorrect.";
  //   }

  //   if (!input.password) {
  //     errors.password = "Password is required.";
  //   } else if (input.password.trim().length < 8) {
  //     errors.password = "Password must have at least 8 characters.";
  //   } else if (!regexLetra.test(input.password.trim())) {
  //     errors.password = "at least one letter is required.";
  //   } else if (!regexMayuscula.test(input.password.trim())) {
  //     errors.password = "at least one uppercase letter is required.";
  //   } else if (!regexNumero.test(input.password.trim())) {
  //     errors.password = "at least one number is required.";
  //   }
  //   return errors;
  // }

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center"}}
    >
      {/* // <DivLogin> */}
      {/* // <LoginForm onSubmit={(e) => handleSubmit(e)}> */}
      <form onSubmit={(e) => handleSubmit(e)}>
        <Input
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
      {/* <LowerDiv>
        <ErrorDiv>
          {error.email && <p>{error.email} </p>}
          {error.password && <p>{error.password} </p>}
        </ErrorDiv>
      </LowerDiv> */}
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
