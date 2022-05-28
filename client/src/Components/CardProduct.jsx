import {
  CardContainer,
  CardDetail,
  CardImage,
  CardInfo,
  ButtonHeart,
  ButtonHe,
} from "../styles/CardProduct";
import { useDispatch, useSelector } from "react-redux";
import { addWishList, deleteWishList } from "../redux/actions/index";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

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
  const { allProducts, products, page } = useSelector((state) => state);
  console.log(page);
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
  if (userInfo) {
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

  function handleWishList(e) {
    if (!userInfo) {
      e.preventDefault();
      // e.stopPropagation()
      alert("You need to register");
    }

    if (userInfo) {
      e.preventDefault();
      if (array.length !== 0 && array.includes(id)) {
        dispatch(
          deleteWishList({ productId: Number(id), email: userInfo.email })
        );
        setLocal(false);
      } else {
        dispatch(addWishList({ productId: Number(id), email: userInfo.email }));
        setLocal(true);
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
              <span>% {porcentaje}</span>
              <span>
                {" "}
                Now: ${price - Math.ceil((price * porcentaje) / 100)}{" "}
              </span>
            </p>
          </div>
        </CardInfo>
      </CardDetail>
    </CardContainer>
  );
}
