// import React from "react";
// import ReactDOM from "react-dom"



// const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });

// const createOrder = (data, actions) => {
//     return actions.order.create({
//       purchase_units: [
//         {
//           amount: {
//             value: "10",
//           },
//         },
//       ],
//     });
//   };
//   const onApprove = (data, actions) => {
//     return actions.order.capture();
//   };


// const VerifyPay = () => {


//   return (
//     <> 

//     <div>  
//     <h1>Finalizar compra</h1>
//     <h2>Resumen de compra</h2>
//     <h3>   Productos N: </h3>
//     <h3> Total </h3>


//     </div>


//     <div> 
// <h1>Detalles de Facturacion</h1>
 

//         <h2>Nombre  y Apellido</h2>
//         <input type=" text" />

//         <h2> Provincia</h2>    
//         <input type="text" />
//         <h2>Localidad</h2>
//         <input type="text" />
//         <h2>Direccion</h2>
//         <input type="text" />

//     <h2>Telefono</h2>
//     <input type="text" />



//     </div>

    
    
    
    
    
    
//     <PayPalButton
//         createOrder={(data, actions) => createOrder(data, actions)}
//         onApprove={(data, actions) => onApprove(data, actions)}
//       />
    
    
    
    
    
    
    
//     </>
//   )
// }

// export default VerifyPay