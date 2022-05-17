import styled, { css } from "styled-components";

const colors = {
  borde: "#0075FF",
  error: "#bb2929",
  success: "#1ed12d",
};

const Formulario = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
  justify-items: start;

  @media (max-width: 800px) {
    grid-template-columns: 1fr;
  }
`;

const Label = styled.label`
  display: block;
  font-weight: 700;
  padding: 10px;
  min-height: 40px;
  cursor: pointer;

  ${props => props.validated === 'false' && css`
  color: ${colors.error};
  `}
`;

const Inputs = styled.input`
  width: 300px;
  background: #EEEEEE;
  border-radius: 3px;
  height: 35px;
  line-height: 45px;
  padding: 0 40px 0 10px;
  transition: 0.3s ease all;
  border: 3px solid transparent;

  &:focus {
    border: 3px solid ${colors.borde};
    outline: none;
    box-shadow: 3px 0px 30px rgba(163, 163, 163, 0.4);
  }

  ${(props) =>
    props.validated === 'true' &&
    css`
      border: 3px solid transparent;
    `};
  ${(props) =>
    props.validated === 'false' &&
    css`
  border: 3px solid ${colors.error} !important;
  `};
`;

const ErrorText = styled.p`
  font-size: 12px;
  margin-bottom: 0;
  color: ${colors.error};
  display: none;
  
  ${props => props.validated === 'true' && css`
  display: none;
  `}
  ${props => props.validated === 'false' && css`
  display: block;
  `}
`;

const ContentCenterButton = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Button = styled.button`
  height: 45px;
  line-height: 45px;
  width: 30%;
  background: var(--primary-color);
  color: #fff;
  font-weight: bold;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  transition: 0.1s ease all;
  margin-top: 15px;

  &:hover {
    box-shadow: 30px 0px 30px rgba(163, 163, 163, 1);
  }
`;

const SuccessMessage = styled.p`
  font-size: 14px;
  color: ${colors.success};
`;

const ErrorMessage = styled.p`
  height: 45px;
  line-height: 45px;
  background: #f66060;
  padding: 0px 15px;
  border-radius: 3px;
  grid-column: span 2;
  p {
    margin: 0;
  }
  b {
    margin-left: 10px;
  }
`;

export {
  Formulario,
  Label,
  Inputs,
  ErrorText,
  ContentCenterButton,
  Button,
  SuccessMessage,
  ErrorMessage,
};
