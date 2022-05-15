import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  filterOfertDestacado,
  getAllProducts,
  clearOfertDestacado,
} from "../redux/actions/index";

const VerOferta = ({cambio}) => {
  const dispatch = useDispatch();
  const [ocultar, setOcultar] = useState(false);
  const productsDestacadOfert = useSelector(
    (state) => state.inOfertDestacadoAux
  );
  console.log(productsDestacadOfert)

  useEffect(() => {
    dispatch(getAllProducts())
    dispatch(filterOfertDestacado())

  }, []);
  

  function verProduct() {
    dispatch(getAllProducts())
    dispatch(filterOfertDestacado())
    setOcultar(!ocultar);
  }
  const productOfert = productsDestacadOfert.filter((e) => e.inOferta === true);
  console.log(productOfert)
  const productDestacado = productsDestacadOfert.filter(
    (e) => e.inDestacados === true
  );
  console.log(productDestacado)

  return (
    <div>
      <br/>
      <button onClick={verProduct}>
        ver Productos Promocion y Destacados
      </button>
      {ocultar === false ? (
        <> </>
      ) : (
        <div>
          <h1> Productos en Promocion</h1>

          {productOfert.map((e) => (
            <div key={e.id} className="container">
              <img src={e.image} />
              <h2> {e.model} </h2>
              <h3> Producto Num: {e.id}</h3>
            </div>
          ))}

          <h1> Productos Destacados</h1>
          {productDestacado.map((e) => (
            <div key={e.id} className="container">
              <img src={e.image} />
              <h2> {e.model} </h2>
              <h3> Producto Num: {e.id}</h3>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};

export default VerOferta;
