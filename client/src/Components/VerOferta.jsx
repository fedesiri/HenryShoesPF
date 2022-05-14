import { useEffect,useState } from "react";
import { useSelector,useDispatch } from 'react-redux'
import { selectOfert,getAllProducts, sendOfertToBack,clearOfertSelect,filterOfertDestacado  } from "../redux/actions/index";


const VerOferta = () => {
   const dispatch = useDispatch()
   const [ocultar,setOcultar] = useState(false)
console.log(ocultar)
    const productsDestacadOfert = useSelector((state) => state.inOfertDestacado)
    console.log(productsDestacadOfert)
// useEffect(() => {
//   dispatch(filterOfertDestacado())
// }, [])

function traerProduct(){
    dispatch(filterOfertDestacado())
    setOcultar(!ocultar)
}
const productOfert = productsDestacadOfert.filter(e=> e.inOferta === true)
const productDestacado = productsDestacadOfert.filter(e=> e.inDestacados === true)


    return  (
    <div>
        <button    onClick={traerProduct}>ver Productos Destacado y Oferta</button>
        {ocultar === false? 
        <> </>: 
        <div>
         <h1> Productos en Oferta</h1>

            {productOfert.map(e=><div key={e.id} className="container">
            <img src={e.image}/>
          <h2> {e.model} </h2>
          <h3> Producto Num:  {e.id}</h3>
            
            </div>
            )  }
            
            <h1> Productos Destacados</h1>
            {productDestacado.map(e=><div key={e.id} className="container">
            <img src={e.image}/>
          <h2> {e.model} </h2>
          <h3> Producto Num:  {e.id}</h3>
            
            </div>
            )  }
            
            </div> }

    
    </div>
  )
}

export default VerOferta