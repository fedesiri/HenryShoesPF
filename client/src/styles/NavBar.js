import styled from "styled-components";
import Chart from "../static/Chart.png";
import Chart2 from "../static/Chart2.png";


export const NavContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap:0.2;
`;

export const NavigBar = styled.div`
    
`;

export const Banner = styled.div`
    height: 105px;
`;

export const LoginDiv = styled.div`

    display: flex;
    margin-left:0.2rem;
    margin-right: 0.2rem;
    background-color: #fff200;
    font-decoration: none;  
`;

export const SearchNav = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-bottom: 10px;
`;

export const LoginBtn = styled.button`
    width: 6rem;
    height: 2.4rem;
    margin-rigth: 1rem;
    background: black;
    color: white;
    border: none;
    border-radius: 0.75rem;
    font-family: "Helvetica";
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
    overflow: hidden;
    }
    :hover {
    color: black;
    background: white;
    }
`;

export const SignOutBtn = styled.button`
    width: 5rem;
    height: 2.4rem;
    margin-rigth: 1rem;
    background: black;
    color: white;
    border: none;
    border-radius: 0.75rem;
    font-family: "Helvetica";
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
    overflow: hidden;
    }
    :hover {
    color: black;
    background: white;
    }
`;

export const ChartBtn = styled.button`
    margin-right: 0.5rem;
    background-image: URL(${Chart});
    background-size: 50%;
    background-repeat:no-repeat;
    background-position: center;
    background-attachment: scroll;
    background-color: white;
    width: 5rem;
    height: 2.4rem;
    color: white;
    border: none;
    border-radius: 0.75rem;
    cursor: pointer;
    overflow: hidden;
    }
    :hover {
    background-image: url(${Chart2});
    background-size: 50%;
    background-repeat:no-repeat;
    background-position: center;
    background-attachment: scroll;
    background-color: black;
    }
`;


export const DivStateCart = styled.span`

    width: 18px;
    height: 18px;
    position: absolute;
    margin-right: 10px;
    margin-bottom: 18px;
    background-color: green;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
`;