import React from 'react'
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'

import {
    Container,
    BackBtn, 
} from "../../styles/PromotionEstilo";





const Promotion = () => {
    const product_Promotion=  [
        { "model": "Adidas Yeezy Slide Glow Green (2022) (Kids)", "id": 3,
          "price": 1, "images": "https://image.goat.com/attachments/product_template_pictures/images/070/791/134/original/GZ4000.png.png"
        },
        {"model": "Adidas NMD V3 Triple Black (GS)","price": 2, "id": 2,
          "images": "https://image.goat.com/attachments/product_template_pictures/images/070/791/118/original/GX5683.png.png"
        },
        {
            "model": "Adidas Yeezy Slide Glow Green (2022) (Kids)","price": 3, "id": 7,
            "images": "https://image.goat.com/attachments/product_template_pictures/images/068/603/692/original/A01732C.png.png"
          },
          {
            "model": "Adidas NMD V3 Triple Black (GS)","price": 4,"id": 9,
            "images": "https://image.goat.com/attachments/product_template_pictures/images/070/791/118/original/GX5683.png.png"
          },
          { "model": "Adidas Yeezy Slide Glow Green (2022) (Kids)","id": 9,
          "price": 5, "images": "https://image.goat.com/attachments/product_template_pictures/images/070/791/134/original/GZ4000.png.png"
        },
        {"model": "Adidas NMD V3 Triple Black (GS)","price": 6,"id": 9,
          "images": "https://image.goat.com/attachments/product_template_pictures/images/070/791/118/original/GX5683.png.png"
        },
        {
            "model": "Adidas Yeezy Slide Glow Green (2022) (Kids)","price": 7,"id": 9,
            "images": "https://image.goat.com/attachments/product_template_pictures/images/069/253/345/original/DX6757_400.png.png",

          },

          {
            "model": "Adidas NMD V3 Triple Black (GS)","price": 8,"id": 9,
            "images": "https://image.goat.com/attachments/product_template_pictures/images/070/791/118/original/GX5683.png.png"
          },
          { "model": "Adidas Yeezy Slide Glow Green (2022) (Kids)","id": 9,
          "price": 9, "images": "https://image.goat.com/attachments/product_template_pictures/images/070/791/134/original/GZ4000.png.png"
        },
        {"model": "Adidas NMD V3 Triple Black (GS)","price": 10,"id": 9,
          "images": "https://image.goat.com/attachments/product_template_pictures/images/070/791/118/original/GX5683.png.png"
        },
        {
            "model": "Adidas Yeezy Slide Glow Green (2022) (Kids)","price": 11,"id": 9,
            "images": "https://image.goat.com/attachments/product_template_pictures/images/070/791/134/original/GZ4000.png.png"
          },
          {
            "model": "Adidas NMD V3 Triple Black (GS)","price": 12,"id": 9,
            "images": "https://image.goat.com/attachments/product_template_pictures/images/070/791/118/original/GX5683.png.png"
          }
    ]



    // const product_Promotion = useSelector((state) => state.promotion)

    const [pagina, setPagina] = useState(1);
    const [sizeArray, setSize] = useState(4);
    const indexLastProduct = pagina * sizeArray
    const indexFirstProduct = indexLastProduct - sizeArray
    const currentProducto = product_Promotion.slice(indexFirstProduct, indexLastProduct)
    if ( pagina=== 0){ 
        setPagina(3)
     }
     if ( pagina=== 4){ 
        setPagina(1)
     }
    const handlePrevbtn = () => {
         setPagina(pagina - 1);}

    const handleNextbtn = () => {
        setPagina(pagina + 1); 
    }

  return (
    <Container>   
    <BackBtn onClick={ handlePrevbtn}>atras</BackBtn>
{  currentProducto.map(e => <div> 
    <img src={e.images} />
    <h3>{e.model}</h3> 
       <h3>{e.price}$ 20%</h3> 
       <Link  to={`/details/${e.id}`}>  More </Link>      



 </div>)}
 <BackBtn onClick={handleNextbtn}>adelante</BackBtn>




    </Container>
  )
}

export default Promotion