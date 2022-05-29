import styled from "styled-components";
import MenFilter from "../static/MenFilter.png";
import ChildFilter from "../static/ChildFilter.png";
import WomenFilter from "../static/WomenFilter.png";
import UnisexFilter from "../static/UnisexFilter.png";

export const LandingDiv = styled.div`
    display: flex;
    flex-direction: column;  
`;
export const Titulo = styled.div`
    display:flex;
    justify-content:center;    
    border:solid black;
    background-color: rgba(17,25,40,0.50);
    border-radius: 0rem 1rem 0rem 1rem;
    margin-bottom:6px;
    h1{
        padding-top:3px;
    }
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
text-decoration: none;
@media (max-width:550px){
    margin-top:0.5rem;
    height:120px;
    
}
`;

export const AdminDiv = styled.div`

`;

export const SliderDiv = styled.div`
    display:flex;
    width: 100%;
    margin-top:1.5rem;
    @media (max-width:550px){
        margin-top:0.5rem;
        height:200px;
        width:100%;
    }
`;

export const PromotionDiv = styled.div`
    display:flex;
    flex-direction: column;
    width:100%;
    margin-top:4px;
    @media (max-width:550px){
        margin-top:4px;       
    }
`;

export const BestSellersDiv = styled.div`
    width: 100%;
    margin-top:4px;
    @media (max-width:550px){
        margin-top:4px;
    }
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
    @media (max-width:550px){
        width:100px;
        height:120px;
        h1{
            font-size: 1rem;
        }
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
        text-size:100%;
    }
    @media (max-width:550px){
        width:100px;
        height:120px;
        h1{
            font-size: 1rem;
        }
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
    @media (max-width:550px){
        width:100px;
        height:120px;
        h1{
            font-size: 1rem;
        }
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
    @media (max-width:550px){
        width:100px;
        height:120px;
        h1{
            font-size: 1rem;
        }
    }
`;