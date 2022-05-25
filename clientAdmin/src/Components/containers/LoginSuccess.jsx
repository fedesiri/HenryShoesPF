import React, { useEffect } from 'react'

const LoginSuccess = () => {

    useEffect(() => {
      setTimeout(() =>{
          window.close();
      }, 1000)
    }, [])
    
  return (
    <div>Successfully login!</div>
  )
}

export default LoginSuccess