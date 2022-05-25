import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  filterOfertDestacado,
  getAllProducts,
  deletePromotion,
  deleteDestacado,
} from "../../redux/actions/index";

const divStyle = {
  display: "none",
};

const ViewOfert  = ({chequeo}) => {
  const dispatch = useDispatch();
  const [ocultar, setOcultar] = useState(false);
  const [chequeo1, setChequeo1] = useState(false)

  const productsDestacadOfert = useSelector((state) => state.inOfertDestacado);
  

useEffect(() => {
  
  setChequeo1(!chequeo1)
    dispatch(filterOfertDestacado());
}, [chequeo]);

useEffect(() => {
  setTimeout(() => {
    dispatch(filterOfertDestacado());  
  }, 1000);
}, [chequeo1])


  function verProduct() {
    dispatch(getAllProducts());
    dispatch(filterOfertDestacado());
    setOcultar(!ocultar);
  }
  function retornarIdPromotion(e) {
  
    dispatch(deletePromotion(e.target.value));
    setTimeout(() => {
      dispatch(getAllProducts());
    }, 100);
    setTimeout(() => {
      setChequeo1(!chequeo1)
    }, 500);
  }

  function retornarIdDestacado(e) {
   
    dispatch(deleteDestacado(e.target.value));
    
    setTimeout(() => {
      dispatch(getAllProducts())
      setChequeo1(!chequeo1)
    }, 1000);
  }

  const productOfert = productsDestacadOfert?.filter((e) => e.inOferta === true);
 
  const productDestacado = productsDestacadOfert?.filter(
    (e) => e.inDestacados === true
  );


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

export default ViewOfert ;
