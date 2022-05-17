import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postLogIn } from "../redux/actions/index";
import { LoginForm, DivLogin, ErrorDiv, LowerDiv, SubmitBtn } from "../styles/FormularioInicio";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const FormularioInicio = ({closeLogin}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";

  const userInfoState = useSelector((state) => state.userInfo);
  // console.log("soy userInfoState", userInfoState);

  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  let [error, setError] = useState("");

  function handleChange(e) {
    e.preventDefault();
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    let objError = validate({ ...input, [e.target.name]: e.target.value });
    setError(objError);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (input.email === "" || input.password === "") {
        return toast.error("Complete los campos");
      } else {
        const response = await dispatch(postLogIn(input));
        console.log("response", response);
        setInput({
          email: "",
          password: "",
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

  // useEffect(() => {
  //   if (userInfoState) {
  //     navigate(redirect);
  //   }
  // }, [userInfoState, navigate, redirect]);

  function validate(input) {
    let errors = {};
    let regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;
    let regexLetra = /[A-z]/;
    let regexMayuscula = /[A-Z]/;
    let regexNumero = /\d/;

    if (!input.email) {
      errors.email = "Insert E-mail.";
    } else if (!regexEmail.test(input.email.trim())) {
      errors.email = "The E-mail is incorrect.";
    }

    if (!input.password) {
      errors.password = "Password is required.";
    } else if (input.password.trim().length < 8) {
      errors.password = "Password must have at least 8 characters.";
    } else if (!regexLetra.test(input.password.trim())) {
      errors.password = "at least one letter is required.";
    } else if (!regexMayuscula.test(input.password.trim())) {
      errors.password = "at least one uppercase letter is required.";
    } else if (!regexNumero.test(input.password.trim())) {
      errors.password = "at least one number is required.";
    }
    return errors;
  }

  return (
    <DivLogin>
      <LoginForm onSubmit={(e) => handleSubmit(e)}>
        <label>
          Email:{" "}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={input.email}
            onChange={(e) => handleChange(e)}
          />
        </label>
        

        <label>
        {"  "}Password:{"  "}  
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={input.password}
            onChange={(e) => handleChange(e)}
          />
        </label>
        <SubmitBtn type="submit">Log In</SubmitBtn>    
      </LoginForm>
      <LowerDiv>
        <ErrorDiv>
          {error.email && <p>{error.email} </p>}
          {error.password && <p>{error.password} </p>}
        </ErrorDiv>
      
      </LowerDiv>
              
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
      />
    </DivLogin>
  );
};

export default FormularioInicio;
