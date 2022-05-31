import React, { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

import Input from "../Input.jsx";
import axios from "axios";
import { Button } from "@material-ui/core";
import { useSelector } from "react-redux";

const ForgotPassword = () => {
    const userInfo = useSelector((state) => state.userInfo);
  const [email, setEmail] = useState({ field: "", validated: null });

  const expression = {
    regexName: /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/g,
    regexEmail: /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/,
    regexLetra: /[A-z]/,
    regexMayuscula: /[A-Z]/,
    regexNumero: /\d/,
    regexLetrasYNumeros: /[^a-zA-Z0-9]/,
    regexPassword: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email === "") {
      return toast.error("Please complete all fields");
    } else {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/signin/forgot-password`,
        { email: email.field }
      );
      setEmail({
        field: "",
        validated: null,
      });
      toast(response.data.message);
      setTimeout(() => {
        window.location.href = "/signin";
      }, 2000);
    }
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        alignContent: "center",
        justifyContent: "center",
      }}
    >
      {!userInfo ? (
        <>
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
            <Button type="submit">Send</Button>
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
        </>
      ) : null}

      {/* </DivLogin> */}
    </div>
  );
};

export default ForgotPassword;
