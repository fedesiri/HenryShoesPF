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
        font-family: "Roboto";
        text-align: center;
        margin-bottom: 0.5px;
        padding: 0.5px;
        font-size: 1rem;
        font-weight: normal;
    }
`;