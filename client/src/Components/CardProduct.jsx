import {
  CardContainer,
  CardDetail,
  CardImage,
  CardInfo,
  ButtonHeart,
  ButtonHe,
  PorcentajeDiv
} from "../styles/CardProduct";
import { useDispatch, useSelector } from "react-redux";
import { addWishList, deleteWishList } from "../redux/actions/index";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import './ShoppingCart/ShoppingCart.css'
import {  toast } from "react-toastify"


export default function CardProduct({
  id,
  model,
  price,
  image,
  porcentaje,
  stateWish,
}) {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userInfo);
  const stateRespWishList = useSelector((state) => state.resWishList);
  // console.log(stateRespWishList.status)
  console.log(porcentaje)
  const { allProducts, products, page } = useSelector((state) => state);
  const [local, setLocal] = useState(false);
  console.log(stateWish);
  useEffect(() => {
    if (array.length !== 0 && array.includes(id)) {
      setLocal(true);
    } else {
      setLocal(false);
    }
  }, []);


  useEffect(() => {
    if (array.length !== 0 && array.includes(id)) {
      setLocal(true);
    } else {
      setLocal(false);
    }
  }, [page]);

  let array = [];
  if (userInfo ) {
    if (
      stateWish.data?.products !== undefined &&
      stateWish.data?.products !== null &&
      stateWish.data?.products.length !== 0
    ) {
      stateWish.data.products.forEach((e) => {
        array.push(e.id);
      });
    }
  }
  console.log(array)

  function handleWishList(e) {
    if (!userInfo) {
      e.preventDefault();
      toast.warn("You need to register", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });}
    
   if(userInfo  ){ 
       if ( array.length !== 0 && array.includes(id)){
        e.preventDefault();
        dispatch(deleteWishList(
            {productId: Number(id),
                email: userInfo.email 
            }
        ))
        setLocal(false)
        
       } 
   else {
    e.preventDefault();
        dispatch(addWishList(  {productId: Number(id),
            email: userInfo.email     
          }))
          setLocal(true)
      }
                 }
                }


  return (
    <CardContainer>
      <CardDetail to={`/details/${id}`}>
        {local === false ? (
          <ButtonHeart onClick={(e) => handleWishList(e)}>
            {" "}
            <FontAwesomeIcon icon={faHeart} />{" "}
          </ButtonHeart>
        ) : (
          <ButtonHe onClick={(e) => handleWishList(e)}>
            {" "}
            <FontAwesomeIcon icon={faHeart} />{" "}
          </ButtonHe>
        )}
          {porcentaje!==null &&<PorcentajeDiv>
          {porcentaje}% 
          </PorcentajeDiv>}
        <CardImage>
          <img src={image} alt="" />
        </CardImage>
        <CardInfo>
          <div>
            <p>{model}</p>
          </div>
          <div>
            <p>
              <span>Price</span>:${price}
              
             {porcentaje!==null &&   <div>
                Now: ${price - Math.ceil((price * porcentaje) / 100)}{" "}
              </div>}
            </p>
          </div>
        </CardInfo>
      </CardDetail>
    </CardContainer>
  );
}
