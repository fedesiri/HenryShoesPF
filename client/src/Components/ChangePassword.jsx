import React, { useState } from 'react'
import { SubmitBtn } from '../styles/FormularioInicio'
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import Input from "./Input";
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';


const ChangePassword = () => {
  const {token} = useParams()
  const navigate = useNavigate()
    const [password, setPassword] = useState({ field: "", validated: null });
    console.log(password.field, "SOY PASSWORD")
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
        if (password === "") {
          return toast.error("Please complete all fields");
        } else {
           const response = await axios.put(
            `${process.env.REACT_APP_API_URL}/signin/new-password`, {newPassword: password.field}, {
              headers: {
                "reset": token
              }
            }
          );
           console.log("SOY RESPONSE de CHANGE", response)
          setPassword({
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
         id="password-login"
          state={password}
          setState={setPassword}
          type="password"
          label="New Password"
          placeholder="Password"
          name="password"
          errorText="Password is required."
          expresionRegular={expression.regexPassword}
        />
        <br />
        <SubmitBtn type="submit">Change</SubmitBtn>
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

export default ChangePassword