import styled, { keyframes } from "styled-components";

export default function Loader() {
  return (
    <Load>
      <Spinner />
    </Load>
  );
}

const Load = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const spin = keyframes`
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
`;

const Spinner = styled.div`
  background-color: rgba(17, 25, 40, 0.75);
  border: 0.5rem solid transparent;
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  border-left-color: var(--secondary);
  animation: ${spin} 1s linear infinite;
  margin: 2rem;
`;
