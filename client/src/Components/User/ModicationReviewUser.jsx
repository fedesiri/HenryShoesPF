import React, { useState,useEffect } from "react";
import { useSelector,useDispatch} from "react-redux";
import { ModificationReview } from "../../redux/actions";
import './Review.css'
import { AiFillStar, AiOutlineStar } from "react-icons/ai";



const ModicationReviewUser = ({  id}) => {
  // const userInfo = useSelector((state) => state.reviews_user_id);
    const dispatch = useDispatch()
  // console.log(userInfo)
  const [number, setNumber] = useState(0);
  const [hoverStar, setHoverStar] = useState(undefined);
  
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
    const handleText = () => {
      switch (number || hoverStar) {
        case 0:
          return "Evaluate";
        case 1:
          return "Dissatifation";
        case 2:
          return "Unsatisfied";
        case 3:
          return "Normal";
        case 4:
          return "Satisfied";
        case 5:
          return "Very Satisfied";
        default:
          return "Evaluate";
      }
    };
  
    const handlePlaceHolder = () => {
      switch (number || hoverStar) {
        case 0:
          return "Comment here...";
        case 1:
        case 2:
        case 3:
        case 4:
          return "What is your problem?";
        case 5:
          return "Why do you like the product?";
        default:
          return "Comment here...";
      }
    };


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






    <div className="product">
            <img
              style={{ width: 60, height: 60, objectFit: "cover" }}
              src="https://tanhungphatit.vn/images/detailed/93/iphone-13-blue-1-600x600.jpg"
              alt="name"
            />
            <h1>Iphone 13</h1>
          </div>
          <div>
            <h1>{handleText()}</h1>
            {Array(5)
              .fill()
              .map((_, index) =>
                number >= index + 1 || hoverStar >= index + 1 ? (
                  <AiFillStar
                    onMouseOver={() => !number && setHoverStar(index + 1)}
                    onMouseLeave={() => setHoverStar(undefined)}
                    style={{ color: "orange" }}
                    onClick={() => setNumber(index + 1)}
                  />
                ) : (
                  <AiOutlineStar
                    onMouseOver={() => !number && setHoverStar(index + 1)}
                    onMouseLeave={() => setHoverStar(undefined)}
                    style={{ color: "orange" }}
                    onClick={() => setNumber(index + 1)}
                  />
                )
              )}
          </div>
          <textarea placeholder={handlePlaceHolder()}></textarea>
          <button className={` ${!number && "disabled"} `}>Submit</button>





  </div>

  )
}

export default ModicationReviewUser