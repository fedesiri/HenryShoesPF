import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectOfert,
  getAllProducts,
  sendOfertToBack,
  clearOfertSelect,
  filterOfertDestacado,
  
} from "../../redux/actions/index";
import "./CargarOfert.css";
import VerOferta from "./VerOferta";

const CargarOferta = () => {
  const dispatch = useDispatch();
  const onOfert = useSelector((state) => state.ofertSelect);
  // const productsDestacadOfert = useSelector((state) => state.inOfertDestacado);
  const resBack =useSelector((state)=> state.res_back_productOferts)


  const [input, setInput] = useState("");
  const [chequeo,setChequeo] = useState(false)
  const [validarProducts, setValidarProducts] = useState({
    id_oferta: [],
    id_destacado: [],
    porcentaje: [],
  });

  useEffect(() => {
    dispatch(getAllProducts());
  }, []); //  eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    setTimeout(() => {
      dispatch(getAllProducts());
    }, 1000);
    
    setTimeout(() => {
      dispatch(filterOfertDestacado())
      setChequeo(!chequeo)
    }, 3000);

  }, [resBack]);

  function inputSearch(e) {
    e.preventDefault();
    setInput(e.target.value);
  }

  function filterProducts(e) {
    e.preventDefault();
    dispatch(selectOfert(input));
    setInput("");
    setValidarProducts({ id_oferta: [], id_destacado: [], porcentaje: [] });
  }

  function handleValidarProductsPromotion(e) {
    // e.preventDefault()
    var str = String(e.target.value);
    if (validarProducts.id_oferta.includes(str)) {
      setValidarProducts({
        ...validarProducts,
        id_oferta: validarProducts.id_oferta.filter((e) => e !== str),
      });
    }
    if (!validarProducts.id_oferta.includes(e.target.value)) {
      setValidarProducts({
        ...validarProducts,
        id_oferta: validarProducts.id_oferta.concat(e.target.value),
      });
    }
  }
  function handleValidarProductsDestacados(e) {
    // e.preventDefault()
    var str = String(e.target.value);
    if (validarProducts.id_destacado.includes(str)) {
      setValidarProducts({
        ...validarProducts,
        id_destacado: validarProducts.id_destacado.filter((e) => e !== str),
      });
    }
    if (!validarProducts.id_destacado.includes(e.target.value)) {
      setValidarProducts({
        ...validarProducts,
        id_destacado: validarProducts.id_destacado.concat(e.target.value),
      });
    }
  }
  function handlePorcentaje(e) {
    var str = e.target.value;
    setValidarProducts({
      ...validarProducts,
      porcentaje: str,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (
      validarProducts.id_oferta.length !== 0 &&
      validarProducts.porcentaje.length === 0 &&
      validarProducts.id_destacado.length !== 0
    ) {
      alert("complete una categoria");
    } else {
      if (
        validarProducts.id_destacado.length !== 0 ||
        (validarProducts.id_oferta.length !== 0 &&
          validarProducts.porcentaje.length !== 0)
      ) {
        dispatch(sendOfertToBack(validarProducts));
        setValidarProducts({ id_oferta: [], id_destacado: [], porcentaje: [] });

        dispatch(clearOfertSelect());
      } else {
        alert("complet to category");
      }
     
    }
  }

  function clearProducts(e) {
    e.preventDefault();

    dispatch(clearOfertSelect());
  }

  return (
    <div className="tenesqpsaraStyleCOmponet">
      <h2>Set product on sale</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="container1">
          <div>
            <input
              type="text"
              name="name"
              value={input}
              onChange={inputSearch}
              placeholder=" Search"
            />
            <button onClick={(e) => filterProducts(e)}>Search</button>
            <button onClick={(e) => clearProducts(e)}>Clear products</button>
          </div>
          <div>
            {validarProducts.id_oferta.length !== 0 && (
              <select
                defaultValue="default"
                className="selectOfert"
                onChange={(e) => handlePorcentaje(e)}
              >
                <option> Percent %: </option>
                <option value="10"> 10% </option>
                <option value="20"> 20% </option>
                <option value="30"> 30% </option>
                <option value="40"> 40% </option>
                <option value="50"> 50% </option>
              </select>
            )}
          </div>
        </div>
        <div className="divisor">
          <div className="father">
            {onOfert.map((e) => (
              <div key={e.id} className="container">
                <img src={e.image} alt="img not found" />
                <h2> {e.model} </h2>
                <h3> Product Num: {e.id}</h3>
                <div className="checkContainer">
                  <label>
                    On Sale
                    <input
                      id={e.id}
                      type="checkbox"
                      value={e.id}
                      onChange={(e) => handleValidarProductsPromotion(e)}
                      checked={
                        validarProducts.id_oferta.includes(String(e.id))
                          ? true
                          : false
                      }
                    />
                  </label>
                  <label>
                    Best Sellers
                    <input
                      id={e.id}
                      type="checkbox"
                      value={e.id}
                      onChange={(e) => handleValidarProductsDestacados(e)}
                      checked={
                        validarProducts.id_destacado.includes(String(e.id))
                          ? true
                          : false
                      }
                    />
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>
        <button type="submit"> Send Products</button>
      </form>
      <div></div>
      <VerOferta  chequeo={chequeo}/>
    </div>
  );
};

export default CargarOferta;
