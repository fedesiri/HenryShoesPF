import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeProductCart,
  removeOneProductCart,
} from "../../redux/actions/index";
import { Link } from "react-router-dom";

const CarritoDetalle = () => {
  const dispatch = useDispatch();
  const cartDetail = useSelector((state) => state.shoppingCart);

  function handleDeleteProductoCart(parametro) {
    dispatch(removeProductCart(parametro));
  }
  function handleDeleteOneProductoCart(parametro) {
    dispatch(removeOneProductCart(parametro));
  }

  return (
    <div>
      {/* ACA ME DEBERIA MOSTRAR TODOS LOS PRODUCTOS CARGADOS */}
      {cartDetail.map((e) => (
        <div key={e.id}>
          <img width="200px" src={e.image} alt="imagenes" />
          <h2> {e.model} </h2>
          <h2> Price: {e.price * e.allitems} $</h2>
          <h2> Quantity: {e.allitems} unidad</h2>
          <h2> Size: {e.sizes} </h2>
          <button
            onClick={() =>
              handleDeleteProductoCart({
                id: e.id,
                sizes: e.sizes,
              })
            }
          >
            {" "}
            Delete All{" "}
          </button>

          <button
            onClick={() =>
              handleDeleteOneProductoCart({
                id: e.id,
                sizes: e.sizes,
              })
            }
          >
            {" "}
            Delete One{" "}
          </button>
        </div>
      ))}
      <Link to="/cart">
        <button> Go to Shopping Cart</button>
      </Link>
      <button>Checkout</button>
    </div>
  );
};
export default CarritoDetalle;
