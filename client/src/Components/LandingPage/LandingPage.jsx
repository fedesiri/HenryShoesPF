import React from 'react'
import './LandinPage.css'
import Slider from './Slider'
import Promotion from './Promotion'
import BestSellers from './BestSellers'
import { Link } from 'react-router-dom';
import SearchBar from '../SearchBar'
import NavBar from '../NavBar'
import Filter from '../Filters'


const LandingPage = () => {
  return (
    <>
    <NavBar/>
<div>   
<button>  <Link to="/login" > Inicio sesión </Link>   </button> 
<button>   <Link to="/shopping_cart" > Carrito  </Link>  </button>
</div>


    <>
    <Slider/>
    </>
    <>  <h3> Search  </h3></>
    <SearchBar/>
    <hr/>
    <> <h3> Filtrado por hombre, mujer , niños </h3></>
    <Filter/>
    <hr/>
   <h2>Promociones</h2>
  <Promotion/> 
   <hr/>

   <h2>Destacados</h2>
   <BestSellers/>



    
    
    
    
    
    
    
    </>
  )
}

export default LandingPage