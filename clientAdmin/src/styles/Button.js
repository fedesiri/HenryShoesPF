import styled from "styled-components";

export const Button = styled.button`
  display: flex;
  width:150px;
  justify-content: center;
  align-items: center;
  border-style: none;
  cursor: pointer;
  white-space: wrap;
  font-size: 1rem;
  font-weight: 600;
  padding: 0.8rem 1rem;
  border-radius: 0.5rem;
  transform: translate3d(0, 0, 0);
  transition: all 0.3s;
  color: #fffffe;
  svg {
    margin: 0;
    font-size: 1.1rem;
  }
  span {
    display: none;
  }
  :hover {
    opacity: 1;
    transform: translateY(0);
    transition-duration: 0.35s;
    box-shadow: 0px 0px 10px -2px rgba(222, 222, 222, 0.75);
  }
  @media (min-width: 700px) {
    svg {
      display: none;
    }
    span {
      display: inline;
    }
  }
`;

export const DelButton = styled.button`
  display: flex;
  width: 80px;
  background-color: #fff555;
  justify-content: center;
  align-items: center;
  border-style: thin double;
  cursor: pointer;
  white-space: wrap;
  font-size: 0.7rem;
  font-weight: 600;
  padding: 0.3rem 0.4rem;
  border-radius: 0.5rem;
  transform: translate3d(0, 0, 0);
  transition: all 0.3s;
  color: black;
  svg {
    margin: 0;
    font-size: 1.1rem;
  }
  span {
    display: none;
  }
  :hover {
    background-color: red;
    opacity: 1;
    transform: translateY(0);
    transition-duration: 0.35s;
    box-shadow: 0px 0px 10px -2px rgba(222, 222, 222, 0.75);
  }
  @media (min-width: 700px) {
    svg {
      display: none;
    }
    span {
      display: inline;
    }
  }
`;

export const AddButton = styled.button`
  display: flex;
  width: 80px;
  background-color: #fff555;
  justify-content: center;
  align-items: center;
  border-style: thin double;
  cursor: pointer;
  white-space: wrap;
  font-size: 0.7rem;
  font-weight: 600;
  padding: 0.3rem 0.4rem;
  border-radius: 0.5rem;
  transform: translate3d(0, 0, 0);
  transition: all 0.3s;
  color: black;
  svg {
    margin: 0;
    font-size: 1.1rem;
  }
  span {
    display: none;
  }
  :hover {
    background-color: green;
    opacity: 1;
    transform: translateY(0);
    transition-duration: 0.35s;
    box-shadow: 0px 0px 10px -2px rgba(222, 222, 222, 0.75);
  }
  @media (min-width: 700px) {
    svg {
      display: none;
    }
    span {
      display: inline;
    }
  }
`;