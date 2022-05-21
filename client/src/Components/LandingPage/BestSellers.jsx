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
  function string_lentgMax(str){
    let aplicar = str.slice(0,20)
    return aplicar
  }
  function calculoDescuento(price,descuento){
    let  aplicar = Math.ceil((price * descuento)/100)
    return price - aplicar
  }


  return currentProducto.length === 0 ? (<ImagesBestSellers/>):(
    <Container>
      <BackBtn onClick={handlePrevbtn}>Prev</BackBtn>
      {currentProducto.map((e) => (
        <div className="father1"  key={e.price}>
          <img src={e.image} alt={e.model} />
          <h1>{ string_lentgMax(  e.model)}</h1>
          <h1> {e.price}$</h1>
          {e.porcentaje&& <p>{e.porcentaje}%</p> }
            { e.porcentaje&&  <h2>
              Now :  {calculoDescuento(e.price,e.porcentaje) }$
            </h2>}
          <Link to={`/details/${e.id}`}> More </Link>
        </div>
      ))}
      <BackBtn onClick={handleNextbtn}>Next</BackBtn>
    </Container>
  );
};

export default BestSellers;
