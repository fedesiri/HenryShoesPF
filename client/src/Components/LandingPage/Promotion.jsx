import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { filterOfertDestacado } from "../../redux/actions/index";
import ImagesPromotion from "./ImagesPromotion";
import { Container, BackBtn } from "../../styles/PromotionEstilo";

const Promotion = () => {
  const product_Promotion = useSelector((state) => state.inOfertAux);
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


  let product_Promotion1 = [];
  if (product_Promotion !== undefined) {
    product_Promotion1 = product_Promotion;
  }
  let paginas = "";

  if (product_Promotion1.length !== 0) {
    paginas = Math.ceil(product_Promotion1.length / 4);
  }

  let currentProducto = product_Promotion1.slice(
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

  return currentProducto.length === 0 ? (<ImagesPromotion/>   ):  (
    <Container>
      <BackBtn onClick={handlePrevbtn}>Prev</BackBtn>
      {currentProducto.length === 0 ? (
        <h1>holis</h1>
      ) : (
        currentProducto.map((e, index) => (
          <div key={index}>
            <img src={e.image} alt={e.model} />
            <h3>{e.model}</h3>
            <h3>
              {e.price}$ {e.porcentaje}%
            </h3>
            <Link to={`/details/${e.id}`}> More </Link>
          </div>
        ))
      )}
      <BackBtn onClick={handleNextbtn}>Next</BackBtn>
    </Container>
  );
};

export default Promotion;
