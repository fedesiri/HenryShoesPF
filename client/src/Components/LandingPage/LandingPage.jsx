import React from 'react'
import './LandinPage.css'
import Slider from './Slider'
import Promotion from './Promotion'
import BestSellers from './BestSellers'





const LandingPage = () => {
  return (
    <>
    <h1> HENRY SHOES</h1>
    <>
    <Slider/>
    </>
    <>  <h3> Search  </h3></>
    <hr/>
    <> <h3> Filtrado por hombre, mujer , niños </h3></>
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