import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { filterOfertDestacado } from "../../redux/actions/index";
import ImagesBestSellers from "./ImagesBestSellers"
import { Container, BackBtn } from "../../styles/PromotionEstilo";

const BestSellers = () => {
  const product_Destacado = useSelector((state) => state.inBestSellerAux);
  const dispatch = useDispatch();

  const [pagina, setPagina] = useState(1);
  const [sizeArray] = useState(4);
  const indexLastProduct = pagina * sizeArray;
  const indexFirstProduct = indexLastProduct - sizeArray;
 
 
  
  useEffect(() => {
    dispatch(filterOfertDestacado());
    setTimeout(() => {
      dispatch(filterOfertDestacado());
    
    }, 2000);
  }, []);//  eslint-disable-line react-hooks/exhaustive-deps


  let product_Destacado1 = [];
  if (product_Destacado !== undefined) {
    product_Destacado1 = product_Destacado;
  }
  let paginas = "";

  if (product_Destacado1.length !== 0) {
    paginas = Math.ceil(product_Destacado1.length / 4);
  }

  let currentProducto = product_Destacado1.slice(
    indexFirstProduct,
    indexLastProduct
  );

  if (paginas !== null && pagina === paginas + 1) {
    setPagina(1);
  }
  if (pagina === 0) {
    setPagina(paginas);
  }









  const handlePrevbtn = () => {
    setPagina(pagina - 1);
  };

  const handleNextbtn = () => {
    setPagina(pagina + 1);
  };
  
  return currentProducto.length === 0 ? (<ImagesBestSellers/>):(
    <Container>
      <BackBtn onClick={handlePrevbtn}>Prev</BackBtn>
      {currentProducto.map((e) => (
        <div key={e.price}>
          <img src={e.image} alt={e.model} />
          <h3>{e.model}</h3>
          <h3>{e.price}</h3>
          <h3>{e.porcentaje}</h3>
        </div>
      ))}
      <BackBtn onClick={handleNextbtn}>Next</BackBtn>
    </Container>
  );
};

export default BestSellers;
