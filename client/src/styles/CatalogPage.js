import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import reload from "../static/reload.svg";

export const ContainerHome = styled.div`
    padding: 2rem;
    min-height: 100vh; 
`;

export const Btns = styled.div`
    display: flex;
    justify-content: left;
    gap: 1rem;
`;

export const Products = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 0.2rem;
    padding: 1rem ;
    border-radius: 0;
    h2 {
        color: var(--text-color);
    }
`;

export const NoResult = styled.div`
    border-radius: 1rem;
    backdrop-filter: blur(16px) saturate(180%);
    background-color: rgba(17, 25, 40, 0.75);
    padding: 1.5rem 1rem;
    text-align: center;
    img {
        width: 100%;
    }
`;

export const ReloadBtn = styled.button`
background-image: url(${reload});
background-size: 80%;
background-position: center;
background-repeat:no-repeat;
background-attachment: scroll;
background-color: transparent;
font-size: 2rem;
border-style: none;
border-radius: 50%;
display: block;
width: 30px;
height: 30px;
`;

export const Button = styled.button`
    background-color: var(--main-color);
    display: flex;
    width:150px;
    justify-content: center;
    align-items: center;
    border-style: none;
    cursor: pointer;
    white-space: wrap;
    font-size: 1rem;
    font-weight: 600;
    gap: 1rem;
    padding: 0.2rem;
    border-radius: 0.5rem;
    color: var(--text-color);
    svg {
        margin: 0;
        font-size: 1rem;
    }
    span {
        display: none;
    }
    :hover {
        opacity: 1;
        transform: translateY(0);
        transition-duration: 0.30s;
        box-shadow: 0px 0px 10px -2px rgba(222, 222, 222, 0.75);
    }

    
`;

