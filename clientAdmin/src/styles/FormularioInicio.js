import styled from "styled-components";
import { Link } from "react-router-dom";

export const DivLogin = styled.div`
    padding:0;
    font-size: 1.0rem;
    width: 100%;
    p {
        margin: 0;
        font-weight: bold;
        font-size: 1rem;
}
`;
export const DivCreate = styled.div`
    margin-left: 1rem;
    display:flex;
`;
export const ErrorDiv = styled.div`
    display:flex;
    justify-content: center;
    gap:1rem;
    p {
        margin: 0;
        font-weight: bold;
        font-size: 0.8rem;
        color: red;

}
`;

export const LowerDiv = styled.div`
    display:flex;
    justify-content: space-between;
    gap:1rem;
    p {
        margin: 0;
        font-weight: bold;
        font-size: 0.8rem;
        color: red;

}
`;
export const LoginForm = styled.form`
    display: flex;
    justify-content: space-between;
    align-content: center;
    background-color: rgba(92, 98, 103, 0.5);
    padding: 0.3rem 0.5rem;
    margin: 0.2rem 0;
    font-size: 1.0rem;
    height: 2.5rem;
    border-radius: 0.75rem;
    width: 100%;
    input {
        background-color: rgba(255, 255, 255, 1);
        align-items: center;
        border: none;
        outline: none;
        margin-right: 0.5rem;
        width: 300px;
        height: 100%;
        border-radius: 0.75rem;
        padding: 7px 10px;
        font-size: 1rem;
        font-family: "Quicksand", sans-serif;
        font-color: var(--white-text);
}
`;

export const CreateAccount = styled(Link)`

`;

export const SubmitBtn = styled.button`
    width: 5rem;
    height: 2rem;
    margin-bottom: 0.1rem;
    background: black;
    color: white;
    border: none;
    border-radius: 0.75rem;
    font-size: 15px;
    font-weight: bold;
    cursor: pointer;
    overflow: hidden;
    }
    :hover {
    color: black;
    background: white;
    }
`;

export const CloseBtn = styled.button`
    width: 2rem;
    height: 2rem;
    margin-bottom: 0.1rem;
    background: black;
    color: white;
    border: none;
    border-radius: 0.75rem;
    font-size: 15px;
    font-weight: bold;
    cursor: pointer;
    overflow: hidden;
    }
    :hover {
    color: black;
    background: white;
    }
`;