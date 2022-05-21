import {
  ButtonContainer,
  ButtonIconWrapper,
  GoogleIcon,
  ButtonText,
} from "../styles/GoogleButton";

const GoogleLoginComponent = () => {

  
  const google = () => {
    window.open("http://localhost:3001/auth/google", "_self");
  };



  return (
    <ButtonContainer onClick={google}>
      <ButtonIconWrapper>
        <GoogleIcon
          src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
          alt="google button"
        />
      </ButtonIconWrapper>
      <ButtonText>
        <b>Sign in with Google</b>
      </ButtonText>
    </ButtonContainer>
  );
};

export default GoogleLoginComponent;
