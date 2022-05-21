import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { getProductById } from "../redux/actions/index";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BackBtn, DetailContainer, Content1, Content2, ContentDiv, BtnDiv } from "../styles/Details";
import NavBar from "./NavBar";

const Details = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  let addres = params.id;
  const detail = useSelector((state) => state.details);
  const userInfo = useSelector((state) => state.userInfo);

  useEffect(() => {
    dispatch(getProductById(addres));
  }, []); //  eslint-disable-line react-hooks/exhaustive-deps



  function CargarCarrito() {}

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
            <button onClick={(e) => HandleDelete()}> Delete product </button>        
        )}
        <button onClick={(e) => CargarCarrito(e)} > <h4>Agregar al carrito</h4></button>
        </BtnDiv>
    </DetailContainer>
);
}
export default Details
