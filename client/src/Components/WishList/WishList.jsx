import React,{useEffect} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import {getWishList, deleteWishList} from "../../redux/actions/index"
import './WishList.css'

const WishList = () => {
  const dispatch = useDispatch()

const stateRespWishList = useSelector((state)=>state.WishList)

const stateWish = useSelector((state)=>state.state_WishList)
console.log( "esto me llega",stateWish.data)
const userInfo = useSelector((state) => state.userInfo);
console.log(userInfo)



useEffect(() => {
dispatch(getWishList({ email: userInfo.email }))

}, [])

function handleDelete(e){
  e.preventDefault()
  dispatch(deleteWishList(e.target.value))
}


  return (

 
<div className='ContainerTable'>  
<h1> Wish List</h1>
<table>
<thead className='thead'>
  <tr>  
  <th></th>
  <th>Model</th>
  <th>  </th>
  <th> </th>
  </tr>
  </thead>
  <tbody>
     {/* {stateWish.data.products?.map (e =>  
    <tr> 
<td>  <img src= {e.image}/> </td>
<td> {e.model}  </td>
<td>  va agregar </td>
<td>  <button  value={e.id} onClick={handleDelete}> Delete</button> </td>
</tr>)
} */}


 
  </tbody>



</table>





</div>







    
  )
}

export default WishList