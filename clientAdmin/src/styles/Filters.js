import styled from "styled-components";

export const FilterDiv = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    select {    
        width: 100%;
        cursor: pointer;
        padding: 0.2rem;
        border: none;
        background: #f0f0f0;
        font-size: 1rem;
        
        color: var(--text-color);
        font-family: "Quicksand", sans-serif;
        border: 1px solid rgba(145, 145, 233, 0.5);
    }
    @media (min-width: 768px) {
        display: flex;
        justify-content: center;
        flex-direction: row;
        height: 2rem;
        select {
        margin: 0;
        width: 200px;
        }
    }
`;
