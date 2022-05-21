import styled from "styled-components";
import MenFilter from "../static/MenFilter.png";
import ChildFilter from "../static/ChildFilter.png";
import WomenFilter from "../static/WomenFilter.png";
import UnisexFilter from "../static/UnisexFilter.png";

export const LandingDiv = styled.div`
    display: flex;
    flex-direction: column;  
`;

export const FilterContainer = styled.div`
    display: flex;
    justify-content:space-between;
    flex-direction:row;
    flex-wrap:nowrap;
    margin-bottom: 20px;
    align-items:stretch;
    width: 100%;
    height:100%;
`;

export const AdminDiv = styled.div`

`;

export const SliderDiv = styled.div`
    display:flex;
    width: 100%;
    margin-top:1.5rem;
    @media (min-width:375px;){
        margin-top:0.5rem;
        height:200px;
    }
`;

export const PromotionDiv = styled.div`

`;

export const BestSellersDiv = styled.div`

`;

export const MenBtn = styled.button`
    background-image: url(${MenFilter});
    background-position: center;
    background-size: cover;
    width:280px;
    height:320px;
    h1{
        background-color: transparent;
        color: white;
    }
    @media (max-width:420px){
        width:140px;
        height:160px;
    }
`;
export const WomenBtn = styled.button`
    background-image: url(${WomenFilter});
    background-position: center;
    background-size: cover;
    width:280px;
    height:320px;
    h1{
        background-color: transparent;
        color: white;
    }
    @media (max-width:420px){
        width:140px;
        height:160px;
    }
    
`;
export const UnisexBtn = styled.button`
    background-image: url(${UnisexFilter});
    background-position: center;
    background-size: cover;
    width:280px;
    height:320px;
    h1{
        background-color: transparent;
        color: white;
    }
    @media (max-width:420px){
        width:140px;
        height:160px;
    }
    
`;
export const ChildBtn = styled.button`
    background-image: url(${ChildFilter});
    background-position: center;
    background-size: cover;
    width:280px;
    height:320px;
    h1{
        background-color: transparent;
        color: white;
    }
    @media (max-width:420px){
        width:140px;
        height:160px;
    }
    
`;