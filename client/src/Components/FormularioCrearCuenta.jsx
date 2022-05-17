import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
 import { useDispatch} from "react-redux";
 import { postRegister } from "../redux/actions/index";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const FormularioCrearCuenta = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";


  const [input, setInput] = useState({
    name: "",
    lastname: "", 
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    address: "",
    // role: "",
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
    if(input.password !== input.confirmPassword){
        toast.error("password doesn't match")
        return;
    }
    try {
      if (input.name === "" || input.lastname === "" || input.username === "" || input.password === "" || input.confirmPassword === "" || input.email === "" || input.address === "") {
        return toast.error("Complete all fields");
      } else {
        const response = await dispatch(postRegister(input));
        console.log("response", response);
        setInput({
          name: "",
          lastname: "",
          username: "",
          password: "",
          confirmPassword: "",
          email: "",
          address: "",
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

  function validate(input) {
    let errors = {};
    let regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;
    let regexLetra = /[A-z]/;
    let regexMayuscula = /[A-Z]/;
    let regexNumero = /\d/;
    let regexLetrasYNumeros = /[^a-zA-Z0-9]/;


    if(!input.name){
        errors.name = 'Insert Name'
    } else if(!regexLetra.test(input.name.trim())){
        errors.name = 'The name is incorrect'
    }
    if(!input.lastname){
        errors.lastname = 'Insert Lastname'
    } else if(!regexLetra.test(input.lastname.trim())){
        errors.lastname = 'The lastname is incorrect'
    }
    if(!input.username){
        errors.username = 'Insert Userame'
    } else if(!regexLetra.test(input.username.trim())){
        errors.username = 'The name is incorrect'
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

    if (!input.email) {
      errors.email = "Insert E-mail.";
    } else if (!regexEmail.test(input.email.trim())) {
      errors.email = "The E-mail is incorrect.";
    }

    if(!input.address){
        errors.address = 'Insert Adress';
    } 

    return errors;
  }

 console.log(input.name)
 console.log(input.password)
  return (
    <div>
    <form onSubmit={(e) => handleSubmit(e)}>
      <label>
        Name:{" "}
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={input.name}
          onChange={(e) => handleChange(e)}
        />
      </label>
      {error.name && <p>{error.name} </p>}

      <label>
        Lastname:{" "}
        <input
          type="text"
          name="lastname"
          placeholder="Lastname"
          value={input.lastname}
          onChange={(e) => handleChange(e)}
        />
      </label>
      {error.lastname && <p>{error.lastname} </p>}

      <label>
        Username:{" "}
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={input.username}
          onChange={(e) => handleChange(e)}
        />
      </label>
      {error.username && <p>{error.username} </p>}

      <label>
        E-mail:{" "}
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
      {"  "}Password:{"  "}  
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={input.password}
          onChange={(e) => handleChange(e)}
        />
      </label>
      {error.password && <p>{error.password} </p>}

      <label>
      {"  "}confirmPassword:{"  "}  
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={input.confirmPassword}
          onChange={(e) => handleChange(e)}
        />
      </label>
      {error.confirmPassword && <p>{error.confirmPassword} </p>}

      <label>
      addres:{"  "}  
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={input.address}
          onChange={(e) => handleChange(e)}
        />
      </label>
        {error.address && <p>{error.address} </p>}

      <button type="submit">Register</button>    
    </form>
    <div>
      <div>      
        
        
        
        
      </div>
    
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
  )
}

export default FormularioCrearCuenta