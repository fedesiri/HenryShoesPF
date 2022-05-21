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
  const cartDetail1 = useSelector((state) => state.shoppingCart);
  const cartDetailRegisterUser = useSelector((state)=> state.shoppingCartUserRegister)
  const userInfo = useSelector((state) => state.userInfo);
  const arrayAll = useSelector((state)=>state.allProducts)


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
    <div className="Cart">
      <NavBar />
         ShoppingCart
      <div className="cart1" >
       
        {newArray.map((e) => (
          <div key={contador++}>
            <img width="200px" src={e.image} alt="imagenes" />
            <h2> {e.model} </h2>
            <h2> Precio: {e.price * e.quantity} $</h2>
            <h2> Cantidad: {e.quantity} unidad</h2>
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
