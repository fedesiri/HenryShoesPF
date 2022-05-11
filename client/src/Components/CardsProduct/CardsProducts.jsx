import React from "react";

export default function CardsProducts (){

    return(
        <div>
            <CardProduct
            img src={image} alt="image"
            id = {id}
            model = {model}
            brand = {brand}
            price = {price}
            />
        </div>
    )
}