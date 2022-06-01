import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ModicationReviewUser from "./ModicationReviewUser";
import { see_ReviewIdUser } from "../../redux/actions";
import './Review.css'

const SeeReview = ({ email, producId, id }) => {
  const userInfo = useSelector((state) => state.reviews_user_id);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(see_ReviewIdUser({ productId: producId, email: email }));
  }, []);

  let array = [1, 2, 3, 4, 5];

  return (
    <div>
      <h1>Gracias por tu opinion</h1>
      <div>
        {array.map((e) => (
          <button>{e}</button>
        ))}
            <h2>{userInfo?.data?.rating}</h2>
        <h1>{userInfo?.data?.commentary}</h1>

        <h2>Modification</h2>

        <ModicationReviewUser   rating={userInfo?.data?.rating} commentary={userInfo?.data?.commentary}
               email={email} producId={producId} id={id} />
      </div>
    </div>
  );
};

export default SeeReview;
