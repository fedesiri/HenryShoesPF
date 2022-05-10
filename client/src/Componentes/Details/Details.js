import React from 'react'

const Details = () => {

    const detail = {
        image: "https://images.stockx.com/images/adidas-Terrex-Agravic-Flow-2-Pulse-Lime-Turbo.jpg?fit=fill&bg=FFFFFF&w=500&h=500&fm=webp&auto=compress&trim=color&q=90&dpr=2&updated_at=1651604446",
        name: "adidas Terrex Agravic Flow 2 Pulse Lime Turbo",
        price: 157,
        id: "b0450a70-1647-40ec-a37f-822677826b37",
        gender: "men",
        colorway: "Focus Orange/Cloud White/Gum",
    }



    return (

        <>
            <>
                <img src={detail.image} alt="imagen zapa " />
                <h4>{detail.name} </h4>
                <h2>${detail.price}</h2>
            </>
            <>
                <h3>Colores:</h3>
                <h2>{detail.colorway}</h2>
            </>
            <button > <h4>Agregar al carrito</h4></button>


        </>



    );


}

export default Details