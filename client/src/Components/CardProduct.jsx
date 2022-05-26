import { CardContainer, CardDetail, CardImage, CardInfo, ButtonHeart } from "../styles/CardProduct";
import { useDispatch,useSelector} from "react-redux";
import {addWishList,getWishList} from "../redux/actions/index"
import { useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faHeart } from '@fortawesome/free-solid-svg-icons'


export default function CardProduct ({ id, model, price, image , porcentaje }){

const dispatch = useDispatch()
const userInfo = useSelector((state) => state.userInfo);
// console.log(userInfo.email)
const stateWish = useSelector((state)=>state.state_WishList)
// console.log(stateWish.data)
console.log(userInfo)


    function handleWishList(e){
       e.preventDefault()
        if ( userInfo !== null){ 
            dispatch(addWishList(  {productId: Number(id),
                email: userInfo.email     
              }))
            }
                
    }


        

    return (
        <CardContainer>

            <CardDetail to={`/details/${id}`}>
            <ButtonHeart  onClick={(e)=>handleWishList(e)}> <FontAwesomeIcon  icon={faHeart } /> </ButtonHeart>

                <CardImage>
                    <img src={image} alt="" />
                </CardImage>
                <CardInfo>
                    <div>
                    <p>
                        {model} 
                    </p>
                    </div>
                    <div>
                    <p>
                        <span>Price</span>:${price} 
                        <span>% {porcentaje}</span>
                       <span> Now: ${price-Math.ceil(price*porcentaje/100)}   </span> 
                    </p>
                    </div>
                </CardInfo>
            </CardDetail>
        </CardContainer>
    );
}