import styled from "styled-components";
import search from "../static/search.png";

export const SearchDiv = styled.div`
    padding:0;
    
    font-size: 1.2rem;
    width: 100%;
    p {
        margin: 0;
        font-weight: bold;
        font-size: 1rem;
    }
`;

export const SearchForm = styled.form`
display: flex;
justify-content: space-evenly;
align-content: center;
background-color: rgba(92, 98, 103, 0.5);
padding: 0.3rem 0.5rem;
margin: 0.2rem 0;
font-size: 1.2rem;
height: 2.5rem;
border-radius: 0.75rem;
width: 100%;
input {
    background-color: rgba(255, 255, 255, 1);
    align-items: center;
    border: none;
    outline: none;
    margin-right: 0.5rem;
    width: 100%;
    height: 100%;
    border-radius: 0.75rem;
    padding: 7px 10px;
    font-size: 1rem;
    font-family: "Quicksand", sans-serif;
}
`;

export const SearchBtn = styled.button`
    background-image: url(${search});
    background-size: 100%;
    background-repeat:no-repeat;
    background-attachment: scroll;
    background-color: transparent;
    border-style: none;
    border-radius: 50%;
    display: block;
    width: 30px;
    height: 30px;
`;