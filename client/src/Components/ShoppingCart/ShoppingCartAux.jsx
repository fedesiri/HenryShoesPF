import { useEffect } from "react"
import { useDispatch,useSelector } from "react-redux"
import {stateAuxShoppingCart } from "../../redux/actions/index";

const ShoppingCartAux = ( newArray) => {
const dispatch = useDispatch()
const products = useSelector((state) => state.AuxShopingCartBack);

    useEffect(() => {
    if (newArray){ 
 dispatch(stateAuxShoppingCart(newArray))

    }
    }, [newArray])//  eslint-disable-line react-hooks/exhaustive-deps
    

    

    return (
      <div>


export default ShoppingCartAux;
