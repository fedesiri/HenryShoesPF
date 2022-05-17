import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import FormularioInicio from "./FormularioInicio";
import FormularioCrearCuenta from "./FormularioCrearCuenta"
import { NavContainer, NavigBar, Banner, LoginDiv, SearchNav } from "../styles/NavBar";
import banner from "../static/banner.png"
import Modal from "./Modal/Modal";
import { useModal } from "./Modal/hooks/useModal";
import { useSelector } from "react-redux";

export default function NavBar(){
    const userInfo = useSelector((state) => state.userInfo);
    const [isOpenLogin, openLogin, closeLogin] = useModal(false)
    const [isOpenCreateAccount, openCreateAccount, closeCreateAccount] = useModal(false)
    return (
        <>       
        <NavContainer>
            <NavigBar>
                <Banner>
                    <Link to="/">
                        <img src={banner} alt="" width="100%" height="150px"/>
                    </Link>   
                </Banner>
                {!userInfo && ( <LoginDiv>
                    <button onClick={openLogin}>Login</button>    
                    <button onClick={openCreateAccount}>Sign up</button>                
                </LoginDiv>)}               
            </NavigBar>   
            <SearchNav>
                <SearchBar/>    
            </SearchNav>
        </NavContainer>
        {/* los modals no estan afectando al css!! dejarlos ahi a lo ultimo */}
        <Modal isOpen={isOpenLogin} closeModal={closeLogin}> 
            <FormularioInicio closeLogin={closeLogin}/>
        </Modal>

        <Modal isOpen={isOpenCreateAccount} closeModal={closeCreateAccount}>
            <FormularioCrearCuenta closeCreateAccount={closeCreateAccount}/>
        </Modal>
        </>
    )
}
