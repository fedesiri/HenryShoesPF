import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ModicationReviewUser from "./ModicationReviewUser";
import { see_ReviewIdUser } from "../../redux/actions";
import './Review.css'
import { AiFillStar, AiOutlineStar } from "react-icons/ai";


const SeeReview = ({ email, producId, id }) => {
  const userInfo = useSelector((state) => state.reviews_user_id);
  const dispatch = useDispatch();
  const [number, setNumber] = useState("");
  const [open, setOpen] = useState (false)
  const stateModifyReview = useSelector((state)=> state. postMsjReview)


  useEffect(() => {
    dispatch(see_ReviewIdUser({ productId: producId, email: email }));
  }, []);
useEffect(() => {
  setNumber(userInfo?.data?.rating)
}, [userInfo])

useEffect(() => {
  // getOrders();
  // dispatch(getAllProducts())
  dispatch(see_ReviewIdUser({ productId: producId, email: email }))},
   [stateModifyReview]);




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

        <h1>{userInfo?.data?.commentary}</h1>

        <button onClick={(e)=>openComponente(e)}>Modification</button>

       { open && <ModicationReviewUser setOpen={setOpen}  rating={userInfo?.data?.rating} commentary={userInfo?.data?.commentary}
               email={email} producId={producId} id={id} />}
      </div>
    </div>
  );
};

export default SeeReview;
