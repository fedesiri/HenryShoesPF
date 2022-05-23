import { useDispatch, useSelector } from "react-redux";
import {
  removeProductCart,
  removeOneProductCart,
  combineStateCart,
  getAllProducts
} from "../../redux/actions/index";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import './CarritoDetails.css'
import { Navigate } from "react-router-dom";

const CartDetails = () => {
  const dispatch = useDispatch();
  const cartDetail1 = useSelector((state) => state.shoppingCart);
  console.log(cartDetail1)
  const cartDetailRegisterUser = useSelector((state)=> state.shoppingCartUserRegister)
  const userInfo = useSelector((state) => state.userInfo);
// console.log(userInfo)
//si no esta registrado es null

const arrayAll = useSelector((state)=>state.allProducts)
console.log(arrayAll)


useEffect(() => {
  if(userInfo){ 
   dispatch(combineStateCart())}
 }, [])
 
 useEffect(() => {
  dispatch(getAllProducts())
 }, [])
 



let cartDetail=[]
if(userInfo){
  cartDetail= cartDetailRegisterUser
} else{
 cartDetail = cartDetail1}
console.log(cartDetail)

 let arraySeleccion=[]
  arrayAll.forEach(e => {
     arraySeleccion.push( {id: String(e.id) , price:e.price , image:e.image , inOferta:e.inOferta, 
   model: e.model, porcentaje:e.porcentaje , price:e.price }  )    
  })

 let newArray = [] 
  let aux=   cartDetail.map(e=>  arraySeleccion.forEach(el=> {String(el.id) === String(e.id) && newArray.push(Object.assign(e,el))})    )

console.log (newArray)
  function handleDeleteProductoCart(parametro) {
    dispatch(removeProductCart(parametro));
  }
  function handleDeleteOneProductoCart(parametro) {
    dispatch(removeOneProductCart(parametro));
  }

//   async checkStateUser (event){
//   if (!userInfo){

//   }
// }

 let checkStateUser= async () => {
  
  try {
    let user = await userInfo;
    console.log(user);
    

    {!user && (
      <Navigate to="/dashboard" replace={true} />
    )}
  } catch (error) {
    this.setState({ error });
  }
}




  return (
      <div  >    
      ACA ME DEBERIA MOSTRAR TODOS LOS PRODUCTOS CARGADOS
        {newArray?.map((e) => (
        <div >
          <img width="200px" src={e.image} alt="imagenes" />
          <h2> {e.model} </h2>
          <h2> Price: {e.price * e.quantity} $</h2>
          <h2> Quantity: {e.quantity} unidad</h2>
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
      <button  onClick={ checkStateUser} >Proceed to Purchase</button>
      </div>
  );
};
export default CartDetails;
