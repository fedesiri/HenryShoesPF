import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ModicationReviewUser from "./ModicationReviewUser";
import { see_ReviewIdUser,getEmailReview } from "../../redux/actions";
import './Review.css'
import { AiFillStar, AiOutlineStar } from "react-icons/ai";


const SeeReview = ({ email, producId,  setDisplay }) => {
  // console.log("iddddddddddd",producId)
  const userInfo = useSelector((state) => state.reviews_user_id);
  // console.log("info de id de usuario",userInfo?.data)
  const dispatch = useDispatch();
  const [number, setNumber] = useState("");
  const [open, setOpen] = useState (false)
  const stateModifyReview = useSelector((state)=> state. postMsjReview)
  const userInfoemail = useSelector((state) => state.userInfo);
const userEmail_review = useSelector((state) => state.email_reviews);
// console.log("info de email info", userEmail_review?.data)


  useEffect(() => {
    if(userInfoemail){ 
  dispatch(getEmailReview(userInfoemail?.email))
    }
  }, [])

  useEffect(() => {
    dispatch(see_ReviewIdUser({ productId: producId, email: email }));
  }, []);
useEffect(() => {
  setNumber(filtrado[0]?.rating)
}, [userEmail_review])

useEffect(() => {
  // getOrders();
  // dispatch(getAllProducts())
  dispatch(see_ReviewIdUser({ productId: producId, email: email }))},
   [stateModifyReview]);

// let id = (userInfo?.data?.id)


let nuevoArray = []
if (userEmail_review?.data){
nuevoArray= userEmail_review?.data?.map(e=> ({commentary: e.commentary , productId : e.productId , rating:e.rating , id:e.id  }))

}

let filtrado = [ ]
if (nuevoArray){
filtrado = nuevoArray?.filter( e=> e.productId === producId)
}
// console.log( "filtrado",filtrado)




const handleText = () => {
  switch (number ) {
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

function openComponente(e){
setOpen(!open)
}



  return (
    <div className="ContainerReview1">
      <h1>Thanks for your commentary</h1>
      <hr></hr>
      <div className="seeReviewContainer2">
      <h3>{handleText()}</h3>

      <div className="DivfijoStart">
            {Array(5)
              .fill()
              .map((_, index) =>
                number >= index + 1 ? (
                  <AiFillStar className="iconreview"
                    style={{ color: "orange" }}
                    // onClick={() => setNumber(1)}
                  />
                ) : (
                  <AiOutlineStar className="iconreview"
                    style={{ color: "orange" }}
                    // onClick={() => setNumber(1)}
                  />
                )
              )}
          </div>

        <h1>{filtrado[0]?.commentary}</h1>

        <button onClick={(e)=>openComponente(e)}>Modification</button>

       { (open&& filtrado[0]?.id) && <ModicationReviewUser setOpen={setOpen}  rating={userInfo?.data?.rating} commentary={userInfo?.data?.commentary}
               email={email} producId={producId} id ={filtrado[0]?.id} />}
      </div>
    </div>
  );
};

export default SeeReview;
