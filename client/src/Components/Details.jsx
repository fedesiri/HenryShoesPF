import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProductById, addShoppingCart } from "../redux/actions/index";
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
import CarritoDetalle from "./ShoppingCart/CarritoDetails";

const Details = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  let addres = params.id;
  const detail = useSelector((state) => state.details);
  const userInfo = useSelector((state) => state.userInfo);
  // const cartDetail = useSelector((state) => state.shoppingCart);
  // console.log("esto hay en el carrito", cartDetail);
  // console.log(detail);
  console.log(userInfo)
  const [itemsCarts, setItemsCarts] = useState({
    id: "",
    allitems: [],
    sizes: "",
   
  });
  console.log("esto envias al carrito", itemsCarts);

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

  

  function CargarCarrito() {
    if (itemsCarts.sizes === undefined || itemsCarts.allitems === undefined) {
      alert("Complete size and quantity");
    } else {
      console.log("esto envias al carrito",itemsCarts)
        dispatch(addShoppingCart(itemsCarts));
    }
  }

  function handleCantidad(e) {
    setItemsCarts({
      ...itemsCarts,
      allitems: e.target.value,
    });
  }
  function handleTalle(e) {
    setItemsCarts({
      ...itemsCarts,
      sizes: e.target.value,
    });
  }

  // let detailTrue = {};
  // if (detail !== undefined) {
  //   detailTrue = detail;
  // }
  // console.log (detailTrue)

  const HandleDelete = () => {
    let reply = window.confirm("¿Seguro que desea eliminar el producto?");
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

  let talles = [35, 36, 37, 38, 39, 40];

  return (
    <DetailContainer>
      <NavBar />
      <Link to="/CatalogPage">
        <BackBtn></BackBtn>
      </Link>
      <ContentDiv>
        <Content2>
          <h2>Model:{detail.model}</h2>
          <h2>Price: ${detail.price}</h2>
          <h3>Gender: {detail.gender}</h3>

          <div>
            {talles.map((elemento) => (
              <button key={elemento} value={elemento} onClick={handleTalle}>
                {" "}
                {elemento}{" "}
              </button>
            ))}
          </div>

          <select defaultValue="default" onChange={(e) => handleCantidad(e)}>
            <option value="default"> Cantidad: </option>
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
        {userInfo && userInfo.user.roleId === 1 && (
          <Link to={`/edit/${addres}`}>
            <button>Edit Product</button>
          </Link>
        )}
        {userInfo && userInfo.user.roleId === 1 && (
          <button onClick={(e) => HandleDelete()}> Delete Product </button>
        )}
        <button onClick={(e) => CargarCarrito(e)}>
          <h4>Add to Shopping Cart</h4>
        </button>
      </BtnDiv>
      <CarritoDetalle />
    </DetailContainer>
  );
};
export default Details;
