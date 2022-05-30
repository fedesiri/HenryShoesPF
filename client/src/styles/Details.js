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
    border-color:rgba(255, 255, 255, 0);
    border-style: none;
    border-radius: 50%;
    display: block;
    width: 30px;
    height: 30px;
`;

export const Content1 = styled.div`
    display:flex;
    width:40%;
    border: solid black 1px;
    border-right: solid black 3px;
    border-radius: 2.5rem ;
    border-bottom: solid 3px black;
    flex-direction: row;
    flex-wrap: nowrap;
    align-content: normal;
    justify-content: flex-end;
    align-items: center;
    align-self: flex-start;
    justify-content: right;
    img {    
        position: center;
        object-fit: cover;
        max-width: 90%;
        height: auto;
        border-radius: 0.8rem;
    }
    @media (max-width: 808px) {
        width: 90%;
        flex-direction: column;
        justify-content: center;
        border-radius: 0.5rem ;
    }
`;

export const Content2 = styled.div`
    flex-direction: column;
    flex-wrap: wrap;
    align-content: stretch;
    
    width:60%;
    font-family:"Helvetica";
    align-items: stretch;
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    padding: 1rem 0;
    h3{
        font-family:"Georgia";
        text-decoration-line: underline;
    }
    h4{
        font-size:25px;
        font-family:"Trebuchet MS", cursive, sans-serif;
    }
    @media (max-width: 808px) {
        width: 90%;
        justify-content: center;
        gap: 1rem;
        padding: 0.5rem 0;
    }
`;

export const ContentDiv = styled.div`
    display: flex;    
    flex-direction: row;
    flex-wrap: wrap;
    align-content: stretch;
    justify-content: space-evenly;
    align-items: stretch;
    align-items: center;
    @media (max-width: 808px){
        flex-direction: column-reverse;
        align-content: center;
    }
`;

export const BtnDiv = styled.div`
    display: flex;
    width: 100%;
    margin-bottom: 10px;
    justify-content: center;
    justify-items: center;
    @media (max-width: 800px){
        width: 100%;
        flex-direction: column;
        justify-items: center;
        align-items: center;
    }
    
`;

export const SizeDiv = styled.div`
        display:flex;
        flex-direction: row;
        justify-content: left;
        flex-wrap: wrap;
        h3{
            text-decoration-line: underline;
            display:flex;
            justify-content: left;
            margin-right: 10px;
            align-items: center;
        }
        h2{
            text-decoration: bold;
            display:flex;
            justify-content: left;
            margin-right: 10px;
            align-items: center;
            font-size: 28px;
        }
        h1{
            text-decoration-color: green; 
            display:flex;
            justify-content: left;
            margin-right: 10px;
            align-items: center;
            font-size: 32px;
            color: #62f830f5;
        }
        button{
            backdrop-filter: saturate(50%);
            background-color: var(--background-color);
            font-weight: bold;
            color: var(--text-color);
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 1.5rem;
            border-radius: 0.3rem;
            border-style: double;
            border-color: black;
            min-width: 2rem;
            padding:  0.5rem;
            height: 2rem;
            text-decoration: none;
            cursor: pointer;
            }
            button:hover {
            background-color: #ff8906;
            color: #fff;
            }
            
        
        
        
`;

export const StockDiv = styled.div`
display:flex;
flex-direction: row;
h3 {
    text-decoration-line: underline;
    margin-right:10px;
}
`;

export const AddBtn = styled.button`
    display: flex;  
    align-items:center;
    justify-content: center;
    width: 20rem;
    padding-top: 5px;
    height: 2.5rem;
    background: black;
    color: white;
    border: none;
    border-radius: 0.75rem;
    font-family: "Helvetica";
    font-size: 14px;
    font-weight: bold;
    cursor: pointer;
    :hover {
    color: black;
    background: white;
    border: solid black;
    }
`;

export const StockSelect = styled.select`
    height: 2.4rem;
    width: 5rem;
    text-align: center;
`;

