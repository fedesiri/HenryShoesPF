import React, { useEffect } from 'react'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { clearShoppingCart } from '../../redux/actions';

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
    
    useEffect(() =>{
        closeCart()
        dispatch(clearShoppingCart())

        setTimeout(() => {
            window.location.href = '/'
        }, 3000);
        
    })

  return (
    <div>Payment Success</div>
  )
}

export default PaymentSuccess