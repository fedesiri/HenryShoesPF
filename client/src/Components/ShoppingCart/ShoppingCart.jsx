import { useDispatch, useSelector } from "react-redux";
import {
  removeProductCart,
  removeOneProductCart,
  addOneProductCart,
} from "../../redux/actions/index";
import NavBar from "../NavBar";
import './ShoppingCart.css'

const ShoppingCart = () => {
  const dispatch = useDispatch();
  const cartDetail = useSelector((state) => state.shoppingCart);
  console.log(cartDetail);

  let sumItems = Number("");
  cartDetail.forEach((e) => {
    sumItems += Number(e.allitems);
  });

  let sumPrice = Number("");
  cartDetail.forEach((e) => {
    let result = e.allitems * e.price;

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
  return (
    <div className="Cart">
      <NavBar />
         ShoppingCart
      <div className="cart1" >
       
        {cartDetail.map((e) => (
          <div key={contador++}>
            <img width="200px" src={e.image} alt="imagenes" />
            <h2> {e.model} </h2>
            <h2> Precio: {e.price * e.allitems} $</h2>
            <h2> Cantidad: {e.allitems} unidad</h2>
            <h2> Talle: {e.sizes} </h2>
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
              Delete One -{" "}
            </button>

            <button
              onClick={() =>
                handleAddOneProductoCart({
                  id: e.id,
                  sizes: e.sizes,
                })
              }
            >
              Add One +
            </button>
          </div>
        ))}
        </div>
        <div>  
        <button>Proceder a la Compra</button>
        <h1> Productos en el carrito {sumItems} units</h1>
        <h1> Total  ${sumPrice} </h1>
        </div>
    </div>
  );
};

export default ShoppingCart;
