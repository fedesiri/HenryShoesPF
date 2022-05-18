import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import FormularioInicio from "./FormularioInicio";
import FormularioCrearCuenta from "./FormularioCrearCuenta"
import { NavContainer, Banner, LoginDiv, SearchNav } from "../styles/NavBar";
import banner from "../static/banner.png"
import Modal from "./Modal/Modal";
import { useModal } from "./Modal/hooks/useModal";
import { useDispatch, useSelector } from "react-redux";
import { LoginBtn, ChartBtn, SignOutBtn } from "../styles/NavBar";
import { postLogOut } from "../redux/actions/index.js"

export default function NavBar(){
    const dispatch = useDispatch();
    const userInfo = useSelector((state) => state.userInfo);
  // console.log(userInfo);
    const signOutHandler = () => {
    dispatch(postLogOut());
    window.localStorage.removeItem("userInfo");
    };

    const [isOpenLogin, openLogin, closeLogin] = useModal(false)
    const [isOpenCreateAccount, openCreateAccount, closeCreateAccount] = useModal(false)
    return (
        <>       
        <NavContainer>
            
                <Banner>
                    <Link to="/">
                        <img src={banner} alt="" width="100%" height="150px"/>
                    </Link>   
                </Banner>                
            <SearchNav>
                <div>
                    <SearchBar/>
                </div>
                <div>
                    {!userInfo && (<LoginDiv>
                        <LoginBtn onClick={openLogin}>Login</LoginBtn>    
                        {/* <button onClick={openCreateAccount}>Sign up</button>                 */}
                        </LoginDiv>)} 
                    {userInfo ? <LoginDiv><SignOutBtn onClick={signOutHandler}>Sign Out</SignOutBtn></LoginDiv> : null}                   
                </div>
                <div>
                    <ChartBtn>
                        <Link to="/shopping_cart"></Link>
                    </ChartBtn>
                </div>
            </SearchNav>
        </NavContainer>
        {/* los modals no estan afectando al css!! dejarlos ahi a lo ultimo */}
        <Modal isOpen={isOpenLogin} closeModal={closeLogin}> 
            <FormularioInicio closeLogin={closeLogin} openCreateAccount={openCreateAccount}/>
        </Modal>
        <Modal isOpen={isOpenCreateAccount} closeModal={closeCreateAccount}>
            <FormularioCrearCuenta closeCreateAccount={closeCreateAccount} />
        </Modal>
        </>
    )
}
