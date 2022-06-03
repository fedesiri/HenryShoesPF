import React, { useState,useEffect } from "react";
import { useSelector,useDispatch} from "react-redux";
import { sendReview, getAllRewies } from "../../redux/actions";
import './Review.css'
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { toast } from "react-toastify";




const ReviewUser = ({ email, producId , setOpenAddReview}) => {
  const userInfo = useSelector((state) => state.userInfo);
  const dispatch = useDispatch()
  const stateReview = useSelector((state)=> state. All_Review)
// console.log(stateReview)
  const [number, setNumber] = useState(0);
  const [hoverStar, setHoverStar] = useState(undefined);

  const [input, setInput] = useState({
    rating: "",
    commentary: "",
    productId: producId,
    email: email,
  });
// console.log(input)

useEffect(() => {
  setInput({
    ...input,
    productId: producId,
    email: email
  })
}, [])


useEffect(() => {
  setInput({
    ...input,
    rating: number
  })
}, [number])
useEffect (()=>{
  
  dispatch(getAllRewies(producId))
    
  
  },[])




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
      return  toast.warning("Complete the category!", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    } else {
      dispatch(sendReview(input))
      toast("Thank you for leaving your opinion!", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      setInput({
        rating: "",
        commentary: "",
       
      });
      setOpenAddReview(false)
      setNumber(0)
    }
  }



  
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
    <div className="ContainerReview1">

    
      <form className="formReview" onSubmit={e => handleSubmit(e)}>
       
<div className="formReview">  
   <h3>What did you think of your product?</h3>
            <h3>{handleText()}</h3>
            <div>  
            {Array(5)
              .fill()
              .map((_, index) =>
                number >= index + 1 || hoverStar >= index + 1 ? (
                  <AiFillStar className="iconreview"
                    onMouseOver={() => !number && setHoverStar(index + 1)}
                    onMouseLeave={() => setHoverStar(undefined)}
                    style={{ color: "orange" }}
                    onClick={() => setNumber(index + 1)}
                  />
                ) : (
                  <AiOutlineStar  className="iconreview"
                    onMouseOver={() => !number && setHoverStar(index + 1)}
                    onMouseLeave={() => setHoverStar(undefined)}
                    style={{ color: "orange" }}
                    onClick={() => setNumber(index + 1)}
                  />
                )
              )}
              </div>
          </div>
<div className="flex2">   
        <label>
          <h3> Tell other people about your product</h3>
          <input className="inputReview"
            type="text"
            name="commentary"
            value={input.commentary}
            placeholder={handlePlaceHolder()}
            onChange={(e) => handleChange(e)}
          />
        </label>

        <button type="submit"> Send</button> 
        </div>
      </form>



      
         
          {/* <button className={` ${!number && "disabled"} `}>Submit</button> */}





  </div>







  );
};

export default ReviewUser;
