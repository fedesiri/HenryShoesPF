import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProductById, addShoppingCart, combineStateCart,} from "../redux/actions/index";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  BackBtn,
  DetailContainer,
  Content1,
  Content2,
  ContentDiv,
  BtnDiv,
} from "../styles/Details";
import NavBar from "./NavBar";
import CartDetails from "./ShoppingCart/CarritoDetails";
import { toast } from "react-toastify";

const Details = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  let addres = params.id;
  const detail = useSelector((state) => state.details);
  console.log (detail)
  const userInfo = useSelector((state) => state.userInfo);
 

  const [itemsCarts, setItemsCarts] = useState({
    id: "",
    quantity: [],
    sizes: "",
   
  });

  useEffect(() => {
    dispatch(getProductById(addres));
  }, []); //  eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    // dispatch(getProductById(addres));
  }, [itemsCarts]); //  eslint-disable-line react-hooks/exhaustive-deps

  let product = {};
  if (detail !== undefined) {
    product = detail;
  }

  useEffect(() => {
    setItemsCarts({
      id: addres,
      // image: product.image,
      // price: product.price,
      // model: product.model,
    });
  }, [product]); //  eslint-disable-line react-hooks/exhaustive-deps

useEffect(() => {
 if(userInfo){ 
  dispatch(combineStateCart())}
}, [])




  function CargarCarrito() {
    if (itemsCarts.sizes === undefined || itemsCarts.quantity === undefined) {
      toast.warn("Complete size and quantity", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    } else {
      dispatch(addShoppingCart(itemsCarts));
      console.log( "esto envias al carrito ",itemsCarts)

      toast.success("Product added successfully to cart!", {
        position: toast.POSITION.TOP_CENTER
      });
    }
  }

  function handleCantidad(e) {
    setItemsCarts({
      ...itemsCarts,
      quantity: e.target.value,
    });
  }
  function handleTalle(e) {
    setItemsCarts({
      ...itemsCarts,
      sizes: e.target.value,
    });
  }

  


  const HandleDelete = () => {
    let reply = window.confirm("Are you sure do you want to delete this item?");
    if (reply === true) {
      try {
        axios({
          method: "delete",
          url: `http://localhost:3001/products/details/${detail.id}`,
        });
        navigate("/");
      } catch (err) {
        console.log(err);
      }
    }
  };

  const user = JSON.parse(window.localStorage.getItem("userInfo"));
  user ? console.log("logueado") : console.log("no logueado");


  let talles = detail.sizes

  return (
    <DetailContainer>
      <NavBar />
      <Link to="/CatalogPage">
        <BackBtn></BackBtn>
      </Link>
      <ContentDiv>
        <Content2>

            <h1>Model:{detail.model}</h1>
            <h1>Price: ${detail.price}</h1>
            <h1>Gender: {detail.gender}</h1>

          <div>
            {talles&&talles.map((elemento) => (
              <button key={elemento.sizeId} value={elemento.size} onClick={handleTalle}>
                {" "}
                {elemento.size}{" "}
              </button>
            ))}
          </div>

          <select defaultValue="default" onChange={(e) => handleCantidad(e)}>
            <option value="default"> Quantity: </option>
            <option value="1"> 1 </option>
            <option value="2"> 2 </option>
            <option value="3"> 3 </option>
            <option value="4"> 4 </option>
            <option value="5"> 5 </option>
          </select>

          <p>Description: {detail.description}</p>

        </Content2>
        <Content1>
          <img src={detail.image} alt="img zapa" />
        </Content1>
      </ContentDiv>
      <BtnDiv>
        {userInfo?.user.roleId === 1 ? (
          <Link to={`/edit/${addres}`}>
            <button>Edit Product</button>     
          </Link>
        ) : null}

        {userInfo?.user.roleId === 1 ? (
          <button onClick={(e) => HandleDelete()}> Delete Product </button>
        ) : userInfo?.roleId === 1 ? (
          <button onClick={(e) => HandleDelete()}> Delete Product </button>
        ) : null}
        <button onClick={(e) => CargarCarrito(e)}>
          <h4>Add to Shopping Cart</h4>
        </button>
      </BtnDiv>
      <CartDetails />

    </DetailContainer>
  );
};
export default Details;
