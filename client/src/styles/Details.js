import styled from "styled-components";
import back from "../static/back.svg";



export const DetailContainer = styled.div`
    
    color: var(--text-color);
    min-height: 100vh;
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
`;

export const Content1 = styled.div`
    flex-direction: row;
    flex-wrap: nowrap;
    align-content: normal;
    justify-content: flex-end;
    align-items: center;
    display: flex;
    align-self: flex-start;
    justify-content: right;
    img {    
        position: center;    
        
        width:60%;
        border-radius: 0.8rem;
    }
    }
    @media (min-width: 800px) {
        flex-direction: column;
        justify-content: end;
    }
`;

export const Content2 = styled.div`
    flex-direction: row;
    flex-wrap: wrap;
    align-content: stretch;
    justify-content: flex-start;
    width:60%;
    align-items: stretch;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 1rem;
    padding: 1rem 0;
    @media (min-width: 800px) {
        flex-direction: column;
        justify-content: center;

`;

export const ContentDiv = styled.div`
    margin-left: 50px;
    flex-direction: row;
    flex-wrap: nowrap;
    align-content: stretch;
    justify-content: space-evenly;
    align-items: stretch;
    display: flex;
    align-items: center;
`;

export const BtnDiv = styled.div`
    display: flex;
    width: 50%;
    justify-content: space-evenly;
`;
