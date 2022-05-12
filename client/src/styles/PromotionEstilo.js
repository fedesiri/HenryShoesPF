import styled from "styled-components";
import { Button } from "./Button";



export const BackBtn = styled.button`
  background-color: green;
  border-radius: 10%;
  display: block;
  width: 45px;
  height: 45px;
  cursor:pointer;
  

  :hover {
    opacity: 1;
    background-color: red;
    transform: translateY(0);
    transition-duration: 0.35s;
    box-shadow: 0px 0px 10px -2px rgba(222, 222, 222, 0.75);
  }
`;

export const Container = styled.div`
  
  display:flex;
  flex-direction: row;

  div {
    border:solid;
    width:20%;
    margin:1rem;
    height:25rem;
  }
`;
