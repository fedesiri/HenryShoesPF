import styled from "styled-components";
import back from "../static/back.svg";



export const DetailContainer = styled.div`
 display: flex;
 justify-content: center;
 align-items: center;
 height: 100vh;
 padding; 0 20px; 
 background: linear-gradient(to bottom, grey, white);
`;

export const FormContainer = styled.form`
 margin-top: 10px;
 margin-left: 400px;
 margin-right: 400px;
flex-direction: row;
//flex-wrap: nowrap;
align-content: center;
justify-content: center;
align-items: center;
display: flex;
font-family: Roboto;
width: 100%;
font-size: 18px;
padding: 40px;
background-color: #FFF;
border-radius: 10px;
box-sizing; border-box;
box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.2)
`;

export const BackBtn = styled.button`
    background-image: url(${back});
    background-size: 100%;
    background-repeat:no-repeat;
    background-attachment: scroll;
    background-color: transparent;
    border-color:rgba(255, 255, 255, 0)
    border-style: none;
    border-radius: 50%;
    display: block;
    width: 30px;
    height: 30px;
    margin-top: 10px;
    margin-left: 30;
`;