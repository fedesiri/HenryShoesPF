import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getProductById,
  addShoppingCart,
  combineStateCart,
  getShoppingCart,
} from "../redux/actions/index";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  BackBtn,
  DetailContainer,
  Content1,
  Content2,
  ContentDiv,
  BtnDiv,
  SizeDiv,
  StockDiv,
  AddBtn,
  StockSelect,
} from "../styles/Details";
import NavBar from "./NavBar";
import CartDetails from "./ShoppingCart/CarritoDetails";
import { toast } from "react-toastify";
import { LoginBtn } from "../styles/NavBar";
import Modal from "./Modal/Modal";
import { useModal } from "./Modal/hooks/useModal";
import { Button } from "../styles/Form";
import Footer from "./Footer";

const Details = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  let addres = params.id;
  const detail = useSelector((state) => state.details);
  const userInfo = useSelector((state) => state.userInfo);
  const cartDetail1 = useSelector((state) => state.shoppingCart);
  // console.log(cartDetail1)
  const cartDetailRegisterUser = useSelector(
    (state) => state.shoppingCartUserRegister
  );
  const [isOpenCart, openCart, closeCart] = useModal(false);

  const [itemsCarts, setItemsCarts] = useState({
    id: "",
    quantity: [],
    sizes: "",
  });

  useEffect(() => {
    dispatch(getProductById(addres));
    setTimeout(() => {
      dispatch(getProductById(addres));
    }, 1000);
    dispatch(getShoppingCart());
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

//   useEffect(() => {
//     if (userInfo && cartDetail1) {
//       cartDetail1.forEach(e => {
         
//       dispatch(combineStateCart(  {
//         email: userInfo.email,
//             data: [{
//               sizes: e.sizes,
//               id: e.id,
//               quantity: 1,
//         }],
//       }));
//     })
// }}, []);

  // useEffect(() => {

  //   let talles = []
  //   if ( detail.sizes !== undefined){
  //     talles =  detail.sizes
  //   }

  // }, [])


  async function CargarCarrito() {
    if (itemsCarts.sizes === undefined ) {
      toast.warn("Complete size", {
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
      if (userInfo) {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/orders/create`,
          {
            email: userInfo.email,
            data: [{
              sizes: itemsCarts.sizes,
              id: itemsCarts.id,
              quantity: 1,

            }],
          }
        );
        console.log(response.data);
      }

      // console.log("esto envias al carrito ", itemsCarts);

      toast.success("Product added successfully to cart!", {
        position: toast.POSITION.TOP_CENTER,
      });
      openCart();
    }
  }

  // function handleCantidad(e) {
  //   e.preventDefault();

  //   console.log(e.target.value);
  //   setItemsCarts({
  //     ...itemsCarts,
  //     quantity: 1,
  //   });
  // }
  function handleTalle(e) {
    // e.preventDefault()
    // console.log(e.target.value);
    // console.log(e.target.name);

    setItemsCarts({
      ...itemsCarts,
      sizes: e.target.value,
      quantity: 1,
    });
  }

  const HandleDelete = () => {
    let reply = window.confirm("Are you sure do you want to delete this item?");
    if (reply === true) {
      try {
        axios({
          method: "delete",
          url: `${process.env.REACT_APP_API_URL}/admin/delete/${detail.id}`,
        });
        navigate("/");
      } catch (err) {
        console.log(err);
      }
    }
  };

  // let talles = [35, 36, 37, 38, 39, 40, 41, 42, 43];

  const user = JSON.parse(window.localStorage.getItem("userInfo"));
  user ? console.log("logueado") : console.log("no logueado");

  return (
    <DetailContainer>
      <NavBar />

      <BackBtn
        onClick={() => {
          navigate(-1);
        }}
      ></BackBtn>

      <ContentDiv>
        <Content2>
          <h3>Model:</h3>
          <h2>{detail.model}</h2>
          <SizeDiv>
          <h3>Price:</h3>
          <h2> ${detail.price}</h2>
          </SizeDiv>
          {/* {console.log(detail.price, "SOY PRICE")} */}
          <div>
          {detail.porcentaje && (
            <SizeDiv>
              <h3>discount:</h3>
              <h2>{" "}{detail.porcentaje} %</h2>
              <h3> Now:</h3> 
              <h1>${detail.price -
                  Math.ceil((detail.price * detail.porcentaje) / 100)}{" "}
              </h1>
            </SizeDiv>
            
          )}
          </div>
          <SizeDiv>
          <h3>Gender:</h3>
          <h2> {detail.gender}</h2>
          {detail.CategName?.length > 0 ? <h3>Category:</h3> : null}
          {detail.CategName?.length > 0 ? <p>{detail.CategName}</p> : null}
          </SizeDiv>
          <SizeDiv>
            <h3>Sizes: </h3>
            {detail.sizes?.map((e) => (
              <button key={e.size} value={e.size} onClick={(evento) => handleTalle(evento)}>
                {e.size}
              </button>
            ))}
          </SizeDiv>
          <SizeDiv>
            <h3>selected sizes: </h3>
            <h2>{itemsCarts.sizes}</h2>
          </SizeDiv>
          {/* <StockDiv>
            <h3>Quantity: </h3>
            <StockSelect
              defaultValue="default"
              onChange={(e) => handleCantidad(e)}
            >
              <option value="1"> Quantity: </option>
              <option value="1"> 1 </option>
              <option value="2"> 2 </option>
              <option value="3"> 3 </option>
              <option value="4"> 4 </option>
              <option value="5"> 5 </option>
            </StockSelect>
          </StockDiv> */}
          <h4>Description : {detail.description}</h4>
        </Content2>
        <Content1>
          <img src={detail.image} alt="img zapa" />
        </Content1>
        
      </ContentDiv>
      <BtnDiv>
        <AddBtn onClick={(e) => CargarCarrito(e)}>
          <h4>Add to Shopping Cart</h4>
        </AddBtn>
      </BtnDiv>

      <Modal isOpen={isOpenCart} closeModal={closeCart}>
        <CartDetails closeCart={closeCart} />
      </Modal>
      <Footer/>

    </DetailContainer>
  );
};
export default Details;
