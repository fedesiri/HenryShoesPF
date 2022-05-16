import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postLogIn } from "../redux/actions/index";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const FormularioInicio = () => {
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
          navigate(redirect || "/");
        } else {
          return;
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (userInfoState) {
      navigate(redirect);
    }
  }, [userInfoState, navigate, redirect]);

  function validate(input) {
    let errors = {};
    let regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;
    let regexLetra = /[A-z]/;
    let regexMayuscula = /[A-Z]/;
    let regexNumero = /\d/;

    if (!input.email) {
      errors.email = "El email es requerido.";
    } else if (!regexEmail.test(input.email.trim())) {
      errors.email = "El email es incorrecto.";
    }

    if (!input.password) {
      errors.password = "La contraseña es requerida.";
    } else if (input.password.trim().length < 8) {
      errors.password = "La contraseña debe tener al menos 8 caracteres.";
    } else if (!regexLetra.test(input.password.trim())) {
      errors.password = "Es necessario al menos una letra.";
    } else if (!regexMayuscula.test(input.password.trim())) {
      errors.password = "Es necesario al menos una letra en mayuscula.";
    } else if (!regexNumero.test(input.password.trim())) {
      errors.password = "Es necesario al menos un número.";
    }
    return errors;
  }

  return (
    <div>
      <h3>Login</h3>

      <form onSubmit={(e) => handleSubmit(e)}>
        <label>
          Email:
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={input.email}
            onChange={(e) => handleChange(e)}
          />
        </label>
        {error.email && <p>{error.email} </p>}

        <label>
          Password:
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={input.password}
            onChange={(e) => handleChange(e)}
          />
        </label>
        {error.password && <p>{error.password} </p>}

        <button type="submit">Login</button>
        <Link to="/create_cuenta">
          {" "}
          <div> Create account</div>{" "}
        </Link>
      </form>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
      />
    </div>
  );
};

export default FormularioInicio;
