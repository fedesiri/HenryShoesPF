import styled from "styled-components";
import { Link } from "react-router-dom";

export const BackBtn = styled.button`
    background-color: var(--background-color);
    border-radius: 10%;
    display: block;
    width: 70px;
    height: 40px;
    cursor:pointer;
    @media (max-width: 550px){
        width: 50%;
        height: 30px;
    }
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
    justify-content: space-evenly;
    flex-wrap: nowrap;
    padding-bottom:10px;
    @media (max-width: 550px){
        transform: scale(1);
    }
`;
export const BtnDiv = styled.div`
    display:flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 6px;
    @media (max-width: 550px){
        width: 100%;
        height: 100%;
        margin-bottom: 2px;
    }
`;
export const CardContainer = styled.div`
    display: flex;
    width: 350px;
    height: 350px;
    justify-content: center;
    flex-wrap: wrap;
    background-color: var(--background-color);
    border-radius: 0.8rem;
    border-style: solid;
    img {    
        position: center;    
        border-radius: 0.8rem;
        @media (max-width: 550px){
            width: 100px;
            height: 100px;
        }
    }
    @media (max-width: 550px){
        width: 100px;
        height: 120px;
    }
    :hover {
        background-color: rgba(192, 192, 192, 100);
    }
`;

export const CardImage = styled.div`
    display: flex;
    justify-content: center;
    @media (max-width: 550px){
        width: 100%;
        height: 100%;
    }
`;


export const CardDetail = styled(Link)`
    color: var(--text-color);
    text-decoration: none;
    flex-wrap:nowrap;
    
`;

export const CardInfo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: 60px;
    @media (max-width: 550px){
        height: 35px;
    }
    h1 {
        margin-top:7%;
        font-family: 'Poppins',sans-serif;
        font-size: 1.5rem;
        @media (max-width: 550px){
            margin-top:4%;
            margin-left:5%;
            font-size: 0.6rem;
        }
    }
    h2 {
        font-family: 'Poppins',sans-serif;
        font-size: 1.5rem;
        color: rgb(59, 220, 158);
        @media (max-width: 550px){
            margin-top:-4px;
            font-size: 0.8rem;
        }
    }
    h3 {
        font-family: 'Poppins',sans-serif;
        font-size: 1.1rem;
        color: red;
        @media (max-width: 550px){
            margin-top:-6px;
            font-size: 0.6rem;
        }
    }
    p {
        margin-top: 10%;
        margin-left: 55%;
        font-family: 'Poppins',sans-serif;
        font-size: 1.5rem;
        border-radius: 0.2rem 1.5rem 0.2rem 1.5rem;
        color: red; 
        padding: 0.7rem;
        background-color: yellow;
        @media (max-width: 550px){
            margin-top:-8px;
            margin-left:60%;
            font-size: 0.6rem;
            padding: 0.3rem;
            border-radius: 0.1rem 0.5rem 0.1rem 0.5rem;
        }
    }
`;