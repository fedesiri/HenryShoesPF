import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeProductCart,
  removeOneProductCart,
  combineStateCart,
} from "../../redux/actions/index";
import { Link } from "react-router-dom";

const CarritoDetalle = () => {
  const dispatch = useDispatch();
  const cartDetail1 = useSelector((state) => state.shoppingCart);
  console.log(cartDetail1)

  const cartDetailRegisterUser = useSelector((state)=> state.shoppingCartUserRegister)
  console.log(cartDetailRegisterUser)

  const userInfo = useSelector((state) => state.userInfo);
console.log(userInfo)
//si no esta registrado es null
const arrayAll = useSelector((state)=>state.allProducts)
// console.log(arrayAll)

let cartDetail=[]
if(userInfo){
  cartDetail= cartDetailRegisterUser
} else{
 cartDetail = cartDetail1}

//  console.log("222222222ff",arrayAll)
// let array=[]
//  arrayAll.forEach(e => {
//     array.push( {id: String(e.id) , price:e.price}  )    
//  })
//  console.log(array)
//  console.log( cartDetail)
 let newArray = [] 
 cartDetail.map(e=> arrayAll.forEach(el=> {String(el.id) === String(e.id) && newArray.push(Object.assign(e,el))})    )
console.log(newArray)


  function handleDeleteProductoCart(parametro) {
    dispatch(removeProductCart(parametro));
  }
  function handleDeleteOneProductoCart(parametro) {
    dispatch(removeOneProductCart(parametro));
  }
function handleChangeStateCart (){
  dispatch(combineStateCart())
}


  return (
    <div>
      ACA ME DEBERIA MOSTRAR TODOS LOS PRODUCTOS CARGADOS
      <button onClick={handleChangeStateCart}>HAGO DE LOGINNNNNNNNNNNNNNNNN</button>
      {newArray.map((e) => (
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
