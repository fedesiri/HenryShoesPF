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

const VerOferta = () => {
  const dispatch = useDispatch();
  const [ocultar, setOcultar] = useState(false);
  const [chequeo1, setChequeo1] = useState(false);

  const productsDestacadOfert = useSelector((state) => state.inOfertDestacado);
  let respBackCreate = useSelector((state) => state.res_back_productOferts);
  let resDeleteBack = useSelector((state) => state.postMsj);
  let resALlproducts = useSelector((state) => state.allProducts);
  // console.log(resDeleteBack.status)

  useEffect(() => {
    dispatch(getAllProducts());
  }, [respBackCreate, resDeleteBack]); //  eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    dispatch(filterOfertDestacado());
  }, [resALlproducts]); //  eslint-disable-line react-hooks/exhaustive-deps

  function verProduct() {
    dispatch(getAllProducts());
    dispatch(filterOfertDestacado());
    setOcultar(!ocultar);
  }
  function retornarIdPromotion(e) {
    dispatch(deletePromotion(e.target.value));
  }

  function retornarIdDestacado(e) {
    dispatch(deleteDestacado(e.target.value));
  }

  const productOfert = productsDestacadOfert?.filter(
    (e) => e.inOferta === true
  );

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

export default VerOferta;
