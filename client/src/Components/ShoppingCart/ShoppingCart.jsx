import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  removeProductCart,
  removeOneProductCart,
  addOneProductCart,
  combineStateCart
} from "../../redux/actions/index";
import NavBar from "../NavBar";
import './ShoppingCart.css'


const ShoppingCart = () => {
  const dispatch = useDispatch();
  const cartDetail1 = useSelector((state) => state.shoppingCart);
  const cartDetailRegisterUser = useSelector((state)=> state.shoppingCartUserRegister)
  const userInfo = useSelector((state) => state.userInfo);
  const arrayAll = useSelector((state)=>state.allProducts)

  useEffect(() => {
    if(userInfo){ 
     dispatch(combineStateCart())}
   }, [])
   




  let cartDetail=[]

  if(userInfo){ cartDetail= cartDetailRegisterUser
} else{ cartDetail = cartDetail1}
  

   let arraySeleccion=[]
   arrayAll.forEach(e => {
      arraySeleccion.push( {id: String(e.id) , price:e.price , image:e.image , inOferta:e.inOferta, 
    model: e.model, porcentaje:e.porcentaje , price:e.price }  )    
   })
 
  let newArray = [] 
   let aux=   cartDetail.map(e=>  arraySeleccion.forEach(el=> {String(el.id) === String(e.id) && newArray.push(Object.assign(e,el))})    )
 
 






  let sumItems = Number("");
  newArray.forEach((e) => {
    sumItems += Number(e.quantity);
  });

  let sumPrice = Number("");
  newArray.forEach((e) => {
    let result = e.quantity * e.price;

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
    <div >
      <NavBar />
      <div className="Cart">

      <h1>   ShoppingCart </h1>

      <div className="cart1" >
       <div className="cartBrother">  
       <div className="list"> 
         <h4> Product</h4>
         <h4 className="quantity">Quantity</h4>
         <h4 className="price">Price </h4>
         
       </div>
        {newArray.map((e) => (
          <div  className="childrenBro" key={contador++}>
            <img src={e.image} alt="imagenes" />
            <div className="repar2">  
            <h3> {e.model} </h3>
            <h3> Size: {e.sizes} </h3>
            </div>
            <h2>  {e.quantity} u</h2>
            <h2>  {e.price * e.quantity} $</h2>
            <div>  
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
            </div>;
          </div>
        ))}
        </div>

      <div  className="Brother2">  
      <div className="carritopegajoso" >  
        <button>Proceed to Purchase</button>
        <h1> Products in the cart, {sumItems} units</h1>
        <h1> Total  ${sumPrice} </h1>
        </div>
        </div>

        </div>


      </div>
    </div>
  );
};

export default ShoppingCart;
