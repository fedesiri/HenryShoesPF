import React, { useState,useEffect } from "react";
import { useSelector,useDispatch} from "react-redux";
import { ModificationReview } from "../../redux/actions";
import './Review.css'


const ModicationReviewUser = ({  id}) => {
  // const userInfo = useSelector((state) => state.reviews_user_id);
    const dispatch = useDispatch()
  // console.log(userInfo)
    
  
    const [input, setInput] = useState({
      rating: Number(""),
      commentary: "",
      id: "",
    });
  console.log(input)
  
  useEffect(() => {
    setInput({
      ...input,
      id:id,
    })
  }, [])
  
  
  
  
  
  
  
  
    function handleChange(e) {
      e.preventDefault();
      setInput({
        ...input,
        [e.target.name]: e.target.value,
      });
    }
  
    function handleSubmit(e) {
      e.preventDefault()
  
      if (input.rating === "" || input.commentary === "") {
        return alert("No se puede enviar , complete las categorias");
      } else {
        dispatch(ModificationReview(input))
  
  
        setInput({
          rating: "",
          commentary: "",
         
        });
      }
    }
  
    let array = [1, 2, 3, 4, 5];



  return (
    <div className="ContainerReview3">

    {input.rating}
    {input.commentary}
    {/* <form > */}

    <form onSubmit={e => handleSubmit(e)}>
      <h1>¿Cuantas estrellas le darias? </h1>
      {array.map((e) => (
        <button
          key={e}
          name="rating"
          value={e}
          onClick={(e) => handleChange(e)}
        >
          {e}
        </button>
      ))}
      {/* rating */}

      <div></div>

      <label>
        <h2> ¿Que te parecio el producto?</h2>
        <input
          type="text"
          name="commentary"
          placeholder="Commentary"
          value={input.commentary}
          onChange={(e) => handleChange(e)}
        />
      </label>

      <button type="submit"> Enviar Opinion</button> 
    </form>
  </div>

  )
}

export default ModicationReviewUser