import { CardContainer, CardDetail, CardImage, CardInfo } from "../styles/CardProduct";

export default function CardProduct ({ id, model, price, image , porcentaje }){
    return (
        <CardContainer>
            <CardDetail to={`/details/${id}`}>
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