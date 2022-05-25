import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { postRegister } from "../redux/actions/index";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import Input from "./Input";
import { SubmitBtn } from "../styles/FormularioInicio";

const FormularioCrearCuenta = ({ closeCreateAccount }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { search } = useLocation();

  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";

  const [name, setName] = useState({ field: "", validated: null });
  const [lastname, setLastname] = useState({ field: "", validated: null });
  const [password, setPassword] = useState({ field: "", validated: null });
  const [confirmPassword, setConfirmPassword] = useState({
    field: "",
    validated: null,
  });
  const [email, setEmail] = useState({ field: "", validated: null });

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (
        name.field === "" ||
        lastname.field === "" ||
        password.field === "" ||
        confirmPassword.field === "" ||
        email.field === ""
      ) {
        return toast.error("Complete all fields");
      } else {
        const response = await dispatch(
          postRegister({
            name: name.field,
            lastname: lastname.field,
            password: password.field,
            email: email.field,
          })
        );
        setName({ field: "", validated: null });
        setLastname({ field: "", validated: null });
        setEmail({ field: "", validated: null });
        setPassword({ field: "", validated: null });
        setConfirmPassword({ field: "", validated: null, error: null });
        if (response) {
          window.localStorage.setItem(
            "userInfo",
            JSON.stringify(response.payload)
          );
          closeCreateAccount();
          navigate(redirect || "/");
        } else {
          return;
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  const showPassword = () => {
    var tipo = document.getElementById("register-password");
    if (tipo.type === "password") {
      tipo.type = "text";
    } else {
      tipo.type = "password";
    }
  };
  const showConfirmPassword = () => {
    var tipo = document.getElementById("register-confirm-password");
    if (tipo.type === "password") {
      tipo.type = "text";
    } else {
      tipo.type = "password";
    }
  };

  const expression = {
    regexName: /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/g,
    regexEmail: /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/,
    regexLetra: /[A-z]/,
    regexMayuscula: /[A-Z]/,
    regexNumero: /\d/,
    regexLetrasYNumeros: /[^a-zA-Z0-9]/,
    regexPassword: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
  };

  return (
    <div style={{ display: "flex", justifyContent: "Center" }}>
      <form onSubmit={(e) => handleSubmit(e)}>
        <Input
          id="register-name"
          state={name}
          setState={setName}
          type="text"
          label="Name"
          placeholder="Name"
          name="name"
          errorText="Name is required. Only letters."
          expresionRegular={expression.regexName}
        />

        <Input
          id="register-lastname"
          state={lastname}
          setState={setLastname}
          type="text"
          label="Lastname"
          placeholder="Lastname"
          name="lastname"
          errorText="Lastname is required. Only letters."
          expresionRegular={expression.regexName}
        />

        {/* //! colocar en profile component */}
        {/* <Input
          state={address}
          setState={setAddress}
          type="text"
          label="Address"
          placeholder="Address"
          name="address"
          errorText="Address is required."
          expresionRegular={expression.regexUsername}
        /> */}
        <Input
          id="register-email"
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
          id="register-password"
          state={password}
          setState={setPassword}
          type="password"
          label="Password"
          placeholder="Password"
          name="password"
          errorText="Password is required. Minimum eight characters, at least one letter and one number."
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

        <Input
          id="register-confirm-password"
          state={confirmPassword}
          setState={setConfirmPassword}
          type="password"
          label="Confirm Password"
          placeholder="Confirm Password"
          name="confirmPassword"
          errorText="Password doesn't match."
          match={password.field !== confirmPassword.field ? "false" : "true"}
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
            onClick={showConfirmPassword}
          >
            Show password
          </span>
        </div>
        <br />
        <SubmitBtn type="submit">Register</SubmitBtn>
        <br />
      </form>
      <div>
        <div></div>
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
    </div>
  );
};

export default FormularioCrearCuenta;
