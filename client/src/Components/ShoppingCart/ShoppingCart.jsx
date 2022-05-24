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
import './ShoppingCart.css'
import { DelButton, AddButton } from "../../styles/Button";
import { BackBtn } from "../../styles/Details";
import { useNavigate } from "react-router-dom";


const ShoppingCart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const cartDetail1 = useSelector((state) => state.shoppingCart);
  const cartDetailRegisterUser = useSelector((state)=> state.shoppingCartUserRegister)
  const userInfo = useSelector((state) => state.userInfo);
  const arrayAll = useSelector((state)=>state.allProducts)
  

  useEffect(() => {
    if(userInfo){ 
      dispatch(combineStateCart())}
  }, [dispatch, userInfo])

useEffect(() => {
  dispatch(getAllProducts())
  setTimeout(() => {
    dispatch(getShoppingCart())

  },2000);
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
  function mapeoDeCarro(cartDetail){
    cartDetail.map(e=>  arraySeleccion.forEach(el=> {String(el.id) === String(e.id) && newArray.push(Object.assign(e,el))})    )
  };
  mapeoDeCarro(cartDetail);

console.log(newArray)



  let sumItems = Number("");
  newArray.forEach((e) => {
    sumItems += Number(e.quantity);
  });

  let sumPrice = Number("");
  newArray.forEach((e) => {
    let result =  e.quantity*(e.price-Math.ceil(e.price*e.porcentaje/100))
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
      
        <BackBtn onClick={() => {navigate(-1)}}></BackBtn>
      
      <div className="Cart">

      <h1>   ShoppingCart </h1>

      <div className="cart1" >
       <div className="cartBrother">  
       
        {newArray.map((e) => (
          <div  className="childrenBro" key={contador++}>
            <h2>{contador}-</h2>
            <img src={e.image} alt="imagenes" />
            <div className="repar2">  
              <h3> {e.model} </h3>
            </div>
            <h2> Size: {e.sizes} </h2>
            <h2>  {e.quantity} u</h2>
            {!e.porcentaje?<h2> Price: ${e.price * e.quantity} </h2>:
        <h2>  Price:${  e.quantity*(e.price-Math.ceil(e.price*e.porcentaje/100))} </h2>}
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
            </div>;
          </div>
        ))}
        </div>

      <div  className="Brother2">  
      <div className="carritopegajoso" >  

        <h1> Order items {sumItems} units</h1>{" "}
        <h1> Total  ${sumPrice} </h1>
        <button>Confirm and Pay</button>  
      </div>
        </div>

        </div>


      </div>
    </div>
  );
};

export default ShoppingCart;
