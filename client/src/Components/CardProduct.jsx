import { CardContainer, CardDetail, CardImage, CardInfo } from "../styles/CardProduct";

export default function CardProduct ({ id, model, price, image }){
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
                    </p>
                    </div>
                </CardInfo>
            </CardDetail>
        </CardContainer>
    );
}