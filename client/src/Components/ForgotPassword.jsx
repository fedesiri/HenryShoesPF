import React, { useState } from 'react'
import { SubmitBtn } from '../styles/FormularioInicio'
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import Input from "./Input";
// import { forgotPassword } from '../redux/actions';
// import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const ForgotPassword = () => {
   const navigate = useNavigate()

    const [email, setEmail] = useState({ field: "", validated: null });
    console.log(email.field, "SOY EMAIL")

    const expression = {
        regexName: /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/g,
        regexEmail: /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/,
        regexLetra: /[A-z]/,
        regexMayuscula: /[A-Z]/,
        regexNumero: /\d/,
        regexLetrasYNumeros: /[^a-zA-Z0-9]/,
        regexPassword: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
      };

      const handleSubmit = async (e) =>{
        e.preventDefault();
        if (email === "") {
          return toast.error("Please complete all fields");
        } else {
           const response = await axios.put(
            `${process.env.REACT_APP_API_URL}/signin/forgot-password`, {email: email.field}
          );
           console.log("SOY RESPONSE de FORGOT", response)
           setEmail({
               field: "",
               validated: null,
            });
            toast(response.data.message);
            setTimeout(() => {
              navigate('/')
            }, 2000)
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
          label="Please enter your Email"
          placeholder="Email"
          name="email"
          errorText="Email is required."
          expresionRegular={expression.regexEmail}
        />
        <br />
        <SubmitBtn type="submit">Send</SubmitBtn>
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
    
      {/* </DivLogin> */}
    </div>
  )
}

export default ForgotPassword