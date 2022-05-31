import { useDispatch } from "react-redux";
import {
  ButtonContainer,
  ButtonIconWrapper,
  GoogleIcon,
  ButtonText,
} from "../styles/GoogleButton";
import { fetchUserAuthenticated } from "../redux/actions";
import { useLocation, useNavigate } from "react-router-dom";

const GoogleLoginComponent = ({ closeLogin }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";

  const handleLogin = async () => {
    let timer = null;
    const newWindow = window.open(
      `${process.env.REACT_APP_API_URL}/signin/google`,
      "_blank",
      "width=600,height=600"
    );
    if (newWindow) {
      timer = setInterval(async () => {
        if (newWindow.closed) {
          const response = await dispatch(fetchUserAuthenticated());
          if (response.payload) {
            window.localStorage.setItem(
              "userInfo",
              JSON.stringify(response.payload)
            );
            closeLogin();
            navigate(redirect || "/");
          }
          if (timer) clearInterval(timer);
        }
      }, 500);
    }
  };

  // const handleLogout = () => {
  //   localStorage.removeItem('loginData');
  //   setLoginData(null);
  // };

  return (
    <ButtonContainer onClick={handleLogin}>
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
