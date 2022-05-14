import { useEffect,useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { selectOfert,getAllProducts, sendOfertToBack,clearOfertSelect,filterOfertDestacado  } from "../redux/actions/index";
import './CargarOfert.css'
import VerOferta from "./VerOferta";

const CargarOferta = () => {
    const dispatch = useDispatch()
    const onOfert = useSelector((state) => state.ofertSelect)
    const todos = useSelector((state) => state.allProducts)
console.log(todos)


    // console.log(onOfert)
    const [input, setInput] = useState("");

    const [validarProducts, setValidarProducts] = useState({
        
        id_oferta: [],
        id_destacado: [],
        porcentaje:[]
    
      })
    
    
useEffect(() => {
  dispatch(getAllProducts())
  dispatch(filterOfertDestacado())

}, [])//  eslint-disable-line react-hooks/exhaustive-deps

function inputSearch(e) {
    e.preventDefault()
    setInput(e.target.value)
  }

  function filterProducts(e) {
    e.preventDefault()
    dispatch(selectOfert(input))
    setInput("")
    setValidarProducts( {  id_oferta: [],
      id_destacado: [],
      porcentaje:[]})
    }
  function handleValidarProductsPromotion(e){
      // e.preventDefault()

      var str = String(e.target.value)
      if( validarProducts.id_oferta.includes(str)){
        setValidarProducts({
          ...validarProducts,
            id_oferta: validarProducts.id_oferta.filter(e => e !== str) 
        })
      }
    if (!validarProducts.id_oferta.includes(e.target.value)) {
      setValidarProducts({
          ...validarProducts,
          id_oferta: validarProducts.id_oferta.concat(e.target.value  ) 
        })
      }
  }
  function handleValidarProductsDestacados(e){
    // e.preventDefault()
    var str = String(e.target.value)
    if( validarProducts.id_destacado.includes(str)){
      setValidarProducts({
        ...validarProducts,
          id_destacado: validarProducts.id_destacado.filter(e => e !== str) 
      })
    }
    if (!validarProducts.id_destacado.includes(e.target.value)) {
      setValidarProducts({
          ...validarProducts,
          id_destacado: validarProducts.id_destacado.concat(e.target.value  ) 
        })
      }
  }
  function handlePorcentaje(e){
    // var str = {id: e.target.name,
    //            porcent: e.target.value}
var str = e.target.value

      setValidarProducts({
          ...validarProducts,
          porcentaje: str 
        })
    
      
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(sendOfertToBack(validarProducts))
    setValidarProducts( {  id_oferta: [],
      id_destacado: [],
      porcentaje:[]})
      dispatch(clearOfertSelect())
  }



  return (
    <div>Cargar Producto para Promocionar

        <form    onSubmit={e => handleSubmit(e)} >
        
          <div   >
            <input type="text" name='name' value={input} onChange={inputSearch} placeholder=" Search" />
            <button onClick={filterProducts}>Search</button>
            {validarProducts.id_oferta.length !== 0 && <select className="selectOfert"  onChange={e => handlePorcentaje(e)}>
                    <option value="default"> Porcentaje %: </option>
                    <option    value="10" > 10% </option>
                    <option       value="20"> 20% </option>
                    <option     value="30"> 30% </option>
                    <option   value="40"> 40% </option>
                    <option   value="50"> 50% </option>
                        </select>}
          </div> 
          <div className="divisor"> 
<div className="father"> 
{  onOfert.map(e=> <div key={e.id} className="container">
            <img src={e.image}/>
          <h2> {e.model} </h2>
          <h3> Producto Num:  {e.id}</h3>
          <div className="checkContainer"> 
          <label > Promoción
                    <input 
                        id={e.id}
                        type="checkbox" 
                         value={e.id}
                        onChange={ e => handleValidarProductsPromotion(e)}
                        checked={ validarProducts.id_oferta.includes(String(e.id))?true:false}
                         />  
                   
                </label>
                <label > Destacado
                    <input 
                        id={e.id}
                        type="checkbox"                        value={e.id}
                        onChange={e => handleValidarProductsDestacados(e)}
                        checked={ validarProducts.id_destacado.includes(String(e.id))?true:false}
                         />  
                </label>
          </div>


</div>        )}
</div>


          
</div> 
<button  type='submit' > Enviar  Productos en Ofertas y Destacados</button>

        </form>

        <div>
           
        </div>

        <VerOferta/>







    </div>
  )
}

export default CargarOferta