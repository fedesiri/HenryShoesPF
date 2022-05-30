import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  removeProductCart,
  removeOneProductCart,
  addOneProductCart,
  combineStateCart,
  getAllProducts,
  getShoppingCart,
} from "../../redux/actions/index";
import NavBar from "../NavBar";
import "./ShoppingCart.css";
import { DelButton, AddButton } from "../../styles/Button";
import { BackBtn } from "../../styles/Details";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import FormularioInicio from "../FormularioInicio";
import FormularioCrearCuenta from "../FormularioCrearCuenta";
import Modal from "../Modal/Modal";
import { useModal } from "../Modal/hooks/useModal";
import Footer from "../Footer";

const ShoppingCart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartDetail1 = useSelector((state) => state.shoppingCart);
  const cartDetailRegisterUser = useSelector(
    (state) => state.shoppingCartUserRegister
  );
  const userInfo = useSelector((state) => state.userInfo);
  const arrayAll = useSelector((state) => state.allProducts);

  const [isOpenLogin, openLogin, closeLogin] = useModal(false);
  const [isOpenCreateAccount, openCreateAccount, closeCreateAccount] =
    useModal(false);

  useEffect(() => {
    if (userInfo) {
      dispatch(combineStateCart());
    }
  }, [dispatch, userInfo]);

  useEffect(() => {
    dispatch(getAllProducts());
    setTimeout(() => {
      dispatch(getShoppingCart());
    }, 2000);
  }, []);

  let cartDetail = [];

  if (userInfo) {
    cartDetail = cartDetailRegisterUser;
  } else {
    cartDetail = cartDetail1;
  }

  let arraySeleccion = [];
  arrayAll.forEach((e) => {
    arraySeleccion.push({
      id: String(e.id),
      price: e.price,
      image: e.image,
      inOferta: e.inOferta,
      model: e.model,
    });
  });

  let newArray = [];
  function mapeoDeCarro(cartDetail) {
    cartDetail.map((e) =>
      arraySeleccion.forEach((el) => {
        String(el.id) === String(e.id) && newArray.push(Object.assign(e, el));
      })
    );
  }
  mapeoDeCarro(cartDetail);

  let sumItems = Number("");
  newArray.forEach((e) => {
    sumItems += Number(e.quantity);
  });

  let sumPrice = Number("");
  newArray.forEach((e) => {
    let result =
      e.quantity * (e.price - Math.ceil((e.price * e.porcentaje) / 100));

    sumPrice += Number(result);
  });

  function handleDeleteProductoCart(parametro) {
    dispatch(removeProductCart(parametro));
  }
  function handleDeleteOneProductoCart(parametro) {
    dispatch(removeOneProductCart(parametro));
  }

  function handleAddOneProductoCart(parametro) {
    dispatch(addOneProductCart(parametro));
  }

  let contador = 1;


  const handleVerifyLogin = () => {
    if (userInfo) {
      navigate("/checkout");
    } else {
      openLogin();
      if (userInfo) {
        window.location.href = "/checkout";
      }
    }
  };

  return (
    <div>
      <NavBar />
      <BackBtn onClick={() => {navigate(-1)}}></BackBtn>

      <div className="Cart">
        <h1> ShoppingCart </h1>

        <div className="cart1">
          <div className="cartBrother">
            {newArray.map((e) => (
              <div className="childrenBro" key={contador++}>
                <h3>{contador}-</h3>
                <img src={e.image} alt="imagenes" />
                <div className="repar2">
                  <Link
                    to={`/details/${e.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <h2 style={{ color: "black" }}> {e.model} </h2>
                  </Link>
                </div>
                <h4> Size: {e.sizes} </h4>
                <h3> {e.quantity} u</h3>
                {!e.porcentaje ? (
                  <h3> Price: ${e.price * e.quantity} </h3>
                ) : (
                  <h3>
                    {" "}
                    Price:$
                    {e.quantity *
                      (e.price -
                        Math.ceil((e.price * e.porcentaje) / 100))}{" "}
                  </h3>
                )}
                <div className="buttons">
                  <DelButton
                    onClick={() =>
                      handleDeleteProductoCart({
                        id: e.id,
                        sizes: e.sizes,
                      })
                    }
                  >
                    {" "}
                    Delete All{" "}
                  </DelButton>

                  <DelButton
                    onClick={() =>
                      handleDeleteOneProductoCart({
                        id: e.id,
                        sizes: e.sizes,
                      })
                    }
                  >
                    Delete One
                  </DelButton>

                  <AddButton
                    onClick={() =>
                      handleAddOneProductoCart({
                        id: e.id,
                        sizes: e.sizes,
                      })
                    }
                  >
                    Add One
                  </AddButton>
                </div>
              </div>
            ))}
          </div>

          <div className="Brother2">
            <div className="carritopegajoso">
              <h1> Order items {sumItems} units</h1>{" "}
              <h1> Total ${sumPrice} </h1>
              <button onClick={(e) => handleVerifyLogin(e)}>
                Confirm and Pay
              </button>
            </div>
          </div>
        </div>
      </div>
      <Modal isOpen={isOpenLogin} closeModal={closeLogin}>
        <FormularioInicio
          closeLogin={closeLogin}
          openCreateAccount={openCreateAccount}
        />
      </Modal>
      <Modal isOpen={isOpenCreateAccount} closeModal={closeCreateAccount}>
        <FormularioCrearCuenta closeCreateAccount={closeCreateAccount} />
      </Modal>
      <Footer/>
    </div>
  );
};

export default ShoppingCart;
