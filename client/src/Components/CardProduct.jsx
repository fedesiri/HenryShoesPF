import { CardContainer, CardDetail, CardImage, CardInfo } from "../styles/CardProduct";
import { useDispatch,useSelector} from "react-redux";
import {addWishList,getWishList} from "../redux/actions/index"
import { useEffect } from "react";

export default function CardProduct ({ id, model, price, image , porcentaje }){

const dispatch = useDispatch()
const userInfo = useSelector((state) => state.userInfo);
// console.log(userInfo.email)
const stateWish = useSelector((state)=>state.state_WishList)
// console.log(stateWish.data)
console.log(userInfo)


// useEffect(() => {
//     dispatch(getWishList({ email: userInfo.email }))
    
//     },[])



    function handleWishList(e){
        e.preventDefault()
        if (userInfo.email){ 
            dispatch(addWishList(  {productId: Number(e.target.value),
                email: userInfo.email     
              }))
            }
                
    }


        

    return (
        <CardContainer>
            <CardDetail to={`/details/${id}`}>
                <CardImage>
                    <button   value={id} onClick={(e)=>handleWishList(e)}> X </button>
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