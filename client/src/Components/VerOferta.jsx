import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  filterOfertDestacado,
  getAllProducts,
  clearOfertDestacado,
  deletePromotion,
  deleteDestacado,
} from "../redux/actions/index";

const divStyle = {
  display: "none",
};

const VerOferta = () => {
  const dispatch = useDispatch();
  const [ocultar, setOcultar] = useState(false);
  // const [inhabilitar, setInhabilitar] = useState(true);

  const productsDestacadOfert = useSelector(
    (state) => state.inOfertDestacadoAux
  );
  console.log(productsDestacadOfert);

  useEffect(() => {
    // dispatch(getAllProducts())
    // dispatch(filterOfertDestacado())
  }, []);

  // setTimeout(() => {
  //   if(productOfert.length !== 0 || productDestacado.length !== 0){
  //     setInhabilitar(false)
  //   }
  // }, 500);

  function verProduct() {
    dispatch(getAllProducts());
    dispatch(filterOfertDestacado());
    setOcultar(!ocultar);
  }
  function retornarIdPromotion(e) {
    console.log(e.target.value);
    dispatch(deletePromotion(e.target.value));
    setTimeout(() => {
      dispatch(getAllProducts());
    }, 500);
    setTimeout(() => {
      dispatch(filterOfertDestacado());
    }, 1000);
  }

  function retornarIdDestacado(e) {
    console.log(e.target.value);
    dispatch(deleteDestacado(e.target.value));
    setTimeout(() => {
      dispatch(getAllProducts());
    }, 500);
    setTimeout(() => {
      dispatch(filterOfertDestacado());
    }, 1000);
  }

  const productOfert = productsDestacadOfert?.filter((e) => e.inOferta === true);
  console.log(productOfert);
  const productDestacado = productsDestacadOfert?.filter(
    (e) => e.inDestacados === true
  );
  console.log(productDestacado);

  return (
    <div>
      <br />
      <button onClick={verProduct}>Show products on Sale & Bestsellers</button>
      {ocultar === false ? (
        <> </>
      ) : (
        <div>
          <div style={productOfert.length !== 0 ? null : divStyle}>
            <h1> Products on sale</h1>

            {productOfert.map((e) => (
              <div key={e.id} className="container">
                <img src={e.image} alt={e.model} />
                <h2> {e.model} </h2>
                <h3> Product ID: {e.id}</h3>
                <h3> Discount rate: {e.porcentaje} %</h3>
                <button value={e.id} onClick={(e) => retornarIdPromotion(e)}>
                  X
                </button>
              </div>
            ))}
          </div>
          <div style={productDestacado.length !== 0 ? null : divStyle}>
            <h1> Bestsellers</h1>
            {productDestacado.map((e) => (
              <div key={e.id} className="container">
                <img src={e.image} alt={e.model} />
                <h2> {e.model} </h2>
                <h3> Product ID: {e.id}</h3>
                <button value={e.id} onClick={(e) => retornarIdDestacado(e)}>
                  X
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default VerOferta;
