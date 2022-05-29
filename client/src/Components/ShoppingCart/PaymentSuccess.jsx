import React, { useEffect } from 'react'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { clearShoppingCart } from '../../redux/actions';
import { Link } from 'react-router-dom';
import { Alert } from "@material-ui/lab";
import { Button, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const PaymentSuccess = () => {
    const userInfo = useSelector((state) => state.userInfo);
    const dispatch = useDispatch();
    
    const closeCart = async () => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/payment/payment-success`, {email: userInfo.email});
            console.log(response.data)
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
        closeCart()
        dispatch(clearShoppingCart())

        setTimeout(() => {
            window.location.href = '/'
        }, 3000);
        
    })

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