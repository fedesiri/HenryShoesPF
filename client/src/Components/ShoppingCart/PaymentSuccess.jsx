import React, { useEffect } from 'react'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { clearShoppingCart, getAllProducts, getCartBack, getStateCart } from '../../redux/actions';
import { Link } from 'react-router-dom';
import { Alert } from "@material-ui/lab";
import { Button, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const PaymentSuccess = () => {
    const userInfo = useSelector((state) => state.userInfo);
    const products = useSelector((state) => state.allProducts);
    const cartUser = useSelector((state) => state.AuxShopingCartBack);
  console.log(cartUser.newArray);
    const dispatch = useDispatch();

//     let arraySeleccion = [];
//     products.forEach((e) => {
//     arraySeleccion.push({
//       id: String(e.id),
//       price: e.price,
//       inOferta: e.inOferta,
//       porcentaje: e.porcentaje,
//     });
//   });

//   let newArray = [];
//  cartUser.map((e) =>
//     arraySeleccion.forEach((el) => {
//       String(el.id) === String(e.id) && newArray.push(Object.assign(e, el));
//     })
  // );

  var prices = cartUser?.newArray?.map((e) => (e.price - Math.ceil((e.price * e.porcentaje) / 100)));
  console.log(prices)


    //! AGREGAR EL PRICE DE LOS PRODUCTOS EN EL CARRITO
    const closeCart = async () => {
        try {
          await axios.post(`${process.env.REACT_APP_API_URL}/payment/payment-success`, {email: userInfo.email, prices: prices });
            // console.log(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    const useStyles = makeStyles((theme) => ({
        root: {
          display: "flex",
          justifyContent: "center",
          boxShadow: "none",
          marginTop: 10,
        },
        button: {
          boxShadow: "none",
          marginTop: 10,
        },
      }));
    
    useEffect(() =>{
      dispatch(getAllProducts())
     dispatch(getCartBack(userInfo.email))
      
     closeCart()
      setTimeout(() => {
        dispatch(clearShoppingCart())
            window.location.href = '/profile'
        }, 3000);
        
    }, [dispatch])

    const classes = useStyles();

  return (
    <div className={classes.root}>
    <Paper elevation={0}>
      <Alert severity="success">
        {/* <img src={toni} alt="toni faro" /> */}
<div>
  Payment successful
  <p>Redirecting to HenryShoes...</p>
</div>
      </Alert>
      <Button component={Link} to="/profile" className={classes.button}>
        Go to HenryShoes
      </Button>
    </Paper>
  </div>
    
  )
}

export default PaymentSuccess