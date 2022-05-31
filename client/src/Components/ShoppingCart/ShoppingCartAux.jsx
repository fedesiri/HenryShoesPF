import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { stateAuxShoppingCart } from "../../redux/actions/index";

const ShoppingCartAux = (newArray) => {
  const dispatch = useDispatch();
  // const products = useSelector((state) => state.AuxShopingCartBack);
  // console.log("estoyCARtAUILIAR",products)

  useEffect(() => {
    if (newArray) {
      dispatch(stateAuxShoppingCart(newArray));
    }
  }, [newArray]);

  // console.log(newArray);

  return <div></div>;
};

export default ShoppingCartAux;
