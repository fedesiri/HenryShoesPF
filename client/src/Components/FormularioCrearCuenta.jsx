import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { postRegister } from "../redux/actions/index";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import Input from "./Input";
import { SubmitBtn } from "../styles/FormularioInicio";


const FormularioCrearCuenta = ({closeCreateAccount}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { search } = useLocation();

  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";

  const [name, setName] = useState({ field: "", validated: null });
  const [lastname, setLastname] = useState({ field: "", validated: null });
  const [username, setUsername] = useState({ field: "", validated: null });
  const [password, setPassword] = useState({ field: "", validated: null });
  const [confirmPassword, setConfirmPassword] = useState({
    field: "",
    validated: null,
  });
  const [email, setEmail] = useState({ field: "", validated: null });
  const [address, setAddress] = useState({ field: "", validated: null });

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (
        name.field === "" ||
        lastname.field === "" ||
        username.field === "" ||
        password.field === "" ||
        confirmPassword.field === "" ||
        email.field === "" ||
        address.field === ""
      ) {
        return toast.error("Complete all fields");
      } else {
        const response = await dispatch(
          postRegister({
            name: name.field,
            lastname: lastname.field,
            username: username.field,
            password: password.field,
            email: email.field,
            address: address.field,
          })
        );
        console.log("response", response);
        setName({ field: "", validated: null });
        setLastname({ field: "", validated: null });
        setUsername({ field: "", validated: null });
        setEmail({ field: "", validated: null });
        setPassword({ field: "", validated: null });
        setConfirmPassword({ field: "", validated: null, error: null });
        setAddress({ field: "", validated: null });
        if (response) {
          window.localStorage.setItem(
            "userInfo",
            JSON.stringify(response.payload)
          );
          closeCreateAccount()
          navigate(redirect || "/");
        } else {
          return;
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

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

  return (
    <div style={{display: "flex", justifyContent: "Center"}}>
      <form onSubmit={(e) => handleSubmit(e)}>
        <Input
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
          state={lastname}
          setState={setLastname}
          type="text"
          label="Lastname"
          placeholder="Lastname"
          name="lastname"
          errorText="Lastname is required. Only letters."
          expresionRegular={expression.regexName}
        />
        <Input
          state={username}
          setState={setUsername}
          type="text"
          label="Username"
          placeholder="Username"
          name="username"
          errorText="Username is required. Only letters and numbers."
          expresionRegular={expression.regexUsername}
        />
        <Input
          state={address}
          setState={setAddress}
          type="text"
          label="Address"
          placeholder="Address"
          name="address"
          errorText="Address is required."
          expresionRegular={expression.regexUsername}
        />
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
          errorText="Password is required. Minimum eight characters, at least one letter and one number."
          expresionRegular={expression.regexPassword}
        />
        <Input
          state={confirmPassword}
          setState={setConfirmPassword}
          type="password"
          label="Confirm Password"
          placeholder="Confirm Password"
          name="confirmPassword"
          errorText="Password doesn't match."
          match={password.field !== confirmPassword.field ? "false" : "true"}
        />

        <SubmitBtn type="submit">Register</SubmitBtn>
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
