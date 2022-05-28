import React,{useEffect} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import {getWishList, deleteWishList} from "../../redux/actions/index"
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faArrowLeft,faTrashAlt, faCartPlus} from '@fortawesome/free-solid-svg-icons'
import NavBar from '../NavBar'
import './WishList.css'

const WishList = () => {
  const dispatch = useDispatch()

const stateRespWishList = useSelector((state)=>state.resWishList)

const stateWish = useSelector((state)=>state.state_WishList)
// console.log( "esto me llega",stateWish.data)
const userInfo = useSelector((state) => state.userInfo);



useEffect(() => {
  if ( userInfo !== null){ 
    dispatch(getWishList({ email: userInfo.email }))
    }
}, [stateRespWishList])



function handleDelete(e){
 
  let id = Number(e.currentTarget.value)
  e.preventDefault()
  if ( userInfo !== null){ 
    dispatch(deleteWishList(  {productId: id,
        email: userInfo.email     
      }))
    }
}



  return userInfo === null || stateWish.data === undefined ?(null):(

<>  
<NavBar/>

<div className='ContainerTable'> 

<Link className='atras' to="/"> <FontAwesomeIcon  icon={faArrowLeft} />       </Link> 
<h1> Wish List</h1>
{ stateWish.data.products.length === 0 || stateWish.data === ""  ? <h1 className='h1Tabla'> You have not saved wish list </h1>: 
<table>
<thead className='thead'>
  <tr>  
  <th></th>
  <th>Model</th>
  {/* <th>  </th> */}
  <th> </th>
  </tr>
  </thead>
  <tbody>
     {stateWish.data.products?.map ((e,index) =>  
    <tr key={index} > 
<td> <Link to= {`/details/${e.id}`}   >        
 <img src= {e.image}/> </Link>   </td>
<td> {e.model}  </td>

{/* <td>Add..   <button className='buttonTable'  >  <FontAwesomeIcon  className='tableIcon' icon={faCartPlus} /> </button> </td> */}
<td>  <button className='buttonTable'  name={e.id} value={e.id} onClick={e=>handleDelete(e)} > <FontAwesomeIcon  className='tableIcon' icon={faTrashAlt} />  </button> </td>
</tr>)
}
  </tbody>
</table>

}

</div>
</>
  
  )
}

export default WishList