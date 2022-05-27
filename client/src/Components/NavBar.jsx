import React,{useState,useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import FormularioInicio from "./FormularioInicio";
import FormularioCrearCuenta from "./FormularioCrearCuenta";
import { NavContainer, Banner, LoginDiv, SearchNav,  DivWishList} from "../styles/NavBar";
import banner from "../static/banner.png";
import Modal from "./Modal/Modal";
import { useModal } from "./Modal/hooks/useModal";
import { useDispatch, useSelector } from "react-redux";
import { LoginBtn, ChartBtn, SignOutBtn , DivStateCart } from "../styles/NavBar";
import { postLogOut, getShoppingCart } from "../redux/actions/index.js";
import './ShoppingCart/ShoppingCart.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faHeart } from '@fortawesome/free-solid-svg-icons'


export default function NavBar() {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userInfo);
  // console.log(userInfo)
  const navigate = useNavigate()
  const cartDetail1 = useSelector((state) => state.shoppingCart);
  const cartDetailRegisterUser = useSelector((state)=> state.shoppingCartUserRegister)
  const [stateCart, setStateCart] = useState()
      let sum = 0
    useEffect(()=>{
        if (cartDetail1){
          cartDetail1.map(e=>   sum+=  Number(e.quantity) )
          setStateCart(sum)
      
         }
        if (cartDetailRegisterUser && userInfo){
          cartDetailRegisterUser.map(e=> sum+=  Number(e.quantity))
          setStateCart(sum)
        }
            },[cartDetail1,cartDetailRegisterUser,userInfo])
      
            useEffect(() => {
        dispatch(getShoppingCart())
              }, [cartDetail1,cartDetailRegisterUser])

      






  const signOutHandler = () => {
    dispatch(postLogOut());
    window.localStorage.removeItem("userInfo");
    navigate("/")

  };

  const [isOpenLogin, openLogin, closeLogin] = useModal(false);
  const [isOpenCreateAccount, openCreateAccount, closeCreateAccount] = useModal(false);
  return (
    <>
      <NavContainer>
        {userInfo ? (
          <span>Welcome, {userInfo.name || userInfo.name}</span>
        ) : null}
        <Banner>
          <Link to="/">
            <img src={banner} alt="" width="100%" height="150px" />
          </Link>
        </Banner>
          
        <SearchNav>
          { userInfo?( 
        <Link to="/wish-list">< DivWishList>
            
              Wish List <FontAwesomeIcon  icon={faHeart } />
              
          </ DivWishList></Link>):null
}
          <div>
            <SearchBar />
          </div>


          {stateCart !== 0 && <DivStateCart>          
            {stateCart}
          </DivStateCart>}        

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
