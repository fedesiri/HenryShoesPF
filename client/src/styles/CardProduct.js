import styled from "styled-components";
import { Link } from "react-router-dom";

export const CardContainer = styled.div`
    width: 250px;
    height: 250;
    backdrop-filter: saturate(50%);
    background-color: var(--background-color);
    border-radius: 0.8rem;
    border-style: solid;
    transition: all 0.2s 0s ease;
    img {    
        position: center;    
        height: 150px;
        border-radius: 0.8rem;
    }
    :hover {
        background-color: rgba(192, 192, 192, 100);
    }
`;
export const CardImage = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    :hover  {
        transform: scale(1.3);
    transition: all 500ms;
    
    }
`;


export const CardDetail = styled(Link)`
    color: var(--text-color);
    text-decoration: none;
`;

export const CardInfo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
    height: 100px;
    div {
        margin: 0;
        padding:0;
        display: flex;
        align-items: center;
        
    }
    p{
        font-family: 'Poppins',sans-serif;
        text-align: center;
        margin-bottom: 0.5px;
        padding: 0.5px;
        font-size: 1rem;
        font-weight: bold;
    }
`;

export const ButtonHeart = styled.button`
 
            cursor: pointer;
            z-index: 99;
            border: none;
            background:transparent;
            position: absolute;
            right: 0.5rem;
            top:0.5rem;
            font-size: 1.5rem;
            color: rgb(128, 128, 128);
            :hover{
                color:rgb(94, 103, 196);
                font-size:2rem
            }

  
`;
export const ButtonHe = styled.button`
 
            cursor: pointer;
            z-index: 99;
            border: none;
            background:transparent;
            position: absolute;
            right: 0.5rem;
            top:0.5rem;
            font-size: 2rem;
            color:rgb(94, 103, 196);          
  
`;