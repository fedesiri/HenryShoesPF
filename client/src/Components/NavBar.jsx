import React from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import FormularioInicio from "./FormularioInicio";
import FormularioCrearCuenta from "./FormularioCrearCuenta";
import { NavContainer, Banner, LoginDiv, SearchNav } from "../styles/NavBar";
import banner from "../static/banner.png";
import Modal from "./Modal/Modal";
import { useModal } from "./Modal/hooks/useModal";
import { useDispatch, useSelector } from "react-redux";
import { LoginBtn, ChartBtn, SignOutBtn } from "../styles/NavBar";
import { postLogOut } from "../redux/actions/index.js";

export default function NavBar() {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userInfo);
  const navigate = useNavigate()

  const signOutHandler = () => {
    dispatch(postLogOut());
    window.localStorage.removeItem("userInfo");
    navigate("/")

  };

  const [isOpenLogin, openLogin, closeLogin] = useModal(false);
  const [isOpenCreateAccount, openCreateAccount, closeCreateAccount] =
    useModal(false);
  return (
    <>
      <NavContainer>
        {userInfo ? (
          <span>Welcome, {userInfo.username || userInfo.user.username}</span>
        ) : null}
        <Banner>
          <Link to="/">
            <img src={banner} alt="" width="100%" height="150px" />
          </Link>
        </Banner>

        <SearchNav>
          <div>
            <SearchBar />
          </div>

          <div>
            {userInfo ? null : (
              <LoginDiv>
                <LoginBtn onClick={openLogin}>Login</LoginBtn>
              </LoginDiv>
            )}
            {userInfo ? (
              <LoginDiv>
                <SignOutBtn onClick={signOutHandler}>Sign Out</SignOutBtn>
              </LoginDiv>
            ) : null}
          </div>
          <div>
            <Link to="/cart">
              <ChartBtn />
            </Link>
          </div>
        </SearchNav>
      </NavContainer>
      {/* los modals no estan afectando al css!! dejarlos ahi a lo ultimo */}
      <Modal isOpen={isOpenLogin} closeModal={closeLogin}>
        <FormularioInicio
          closeLogin={closeLogin}
          openCreateAccount={openCreateAccount}
        />
      </Modal>
      <Modal isOpen={isOpenCreateAccount} closeModal={closeCreateAccount}>
        <FormularioCrearCuenta closeCreateAccount={closeCreateAccount} />
      </Modal>
    </>
  );
}
