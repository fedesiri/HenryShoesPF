import { useEffect,useState } from "react";

import { useDispatch,useSelector } from "react-redux";
import {  selectOfert,getAllProducts, sendOfertToBack  } from "../redux/actions/index";
import './CargarOfert.css'

const CargarOferta = () => {
    const dispatch = useDispatch()
    const onOfert = useSelector((state) => state.ofertSelect)
    const todos = useSelector((state) => state.allProducts)
    console.log(onOfert)
    const [input, setInput] = useState("");

    const [confirmar, setConfirmar] = useState({
        
        id: []
    
      })
      console.log(confirmar)

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
  function handleConfirmar(e){
      e.preventDefault()
    if (!confirmar.id.includes(e.target.value)) {
        setConfirmar({
          ...confirmar,
          id: confirmar.id.concat(e.target.value  ) 
        })
      }
  }
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(sendOfertToBack(confirmar))
  }



  return (
    <div>CargarOferta

        <form    onSubmit={e => handleSubmit(e)} >
        
          <div >
            <input type="text" name='name' value={input} onChange={inputSearch} placeholder=" Search" />
            <button onClick={filterProducts}>Search</button>
          </div> 
<div className="father"> 
{onOfert.map(e=> <div className="container">
            <img src={e.image}/>
            <div>  
          <h3> {e.model} </h3>
          <h4> Producto Num:  {e.id}   </h4>
          <button className="icono" value={e.id} onClick={ e => handleConfirmar(e)}></button>

          </div> 

</div>        )}
</div>
`  
<div className="mather">
  <h1>Productos en Oferta</h1>
  <h2>  {` ${confirmar.id}   `} </h2>  

  <button  type='submit' > Enviar  Productos en Ofertas</button>
</div>
          


        </form>











    </div>
  )
}

export default CargarOferta