import { useEffect,useState } from "react";

import { useDispatch,useSelector } from "react-redux";
import {  selectOfert,getAllProducts, sendOfertToBack  } from "../redux/actions/index";
import './CargarOfert.css'

const CargarOferta = () => {
    const dispatch = useDispatch()
    const onOfert = useSelector((state) => state.ofertSelect)
    // console.log(onOfert)
    const [input, setInput] = useState("");

    const [validarProducts, setValidarProducts] = useState({
        
        id_oferta: [],
        id_destacado: []
    
      })
      console.log(validarProducts)
    

useEffect(() => {
  dispatch(getAllProducts())
  
}, [])

function inputSearch(e) {
    e.preventDefault()
    setInput(e.target.value)
  }

  function filterProducts(e) {
    e.preventDefault()
    dispatch(selectOfert(input))
    setInput("")
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

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(sendOfertToBack(validarProducts))
  }



  return (
    <div>Cargar Producto para Promocionar

        <form    onSubmit={e => handleSubmit(e)} >
        
          <div  >
            <input type="text" name='name' value={input} onChange={inputSearch} placeholder=" Search" />
            <button onClick={filterProducts}>Search</button>
          </div> 
          <div className="divisor"> 
<div className="father"> 
{onOfert.map(e=> <div className="container">
            <img src={e.image}/>
          <h3> {e.model} </h3>
          <h3> Producto Num:  {e.id}</h3>
          <div> 
          <label > Promoción
                    <input 
                        id={e.id}
                        type="checkbox" 
                         value={e.id}
                        onChange={ e => handleValidarProductsPromotion(e)}
                        checked={ validarProducts.id_oferta.includes(String(e.id))?true:false}
                         />  
                         {console.log(e.id)}

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

<div className="mather">
  <div>
  <h1>Productos en Oferta</h1>
  <h2>  {` ${validarProducts.id_oferta} `} </h2>  
  </div>
  <div>
  <h1>Productos Destacados</h1>
  <h2>  {` ${validarProducts.id_destacado}   `} </h2>  
  </div>

</div>
          
</div> 
<button  type='submit' > Enviar  Productos en Ofertas y Destacados</button>

        </form>

        <div>
           
                




        </div>









    </div>
  )
}

export default CargarOferta