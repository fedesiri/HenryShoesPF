import React from "react";
import "./Slider.css";

const Slider = () => {
  return (
    <>
      <div className="container-all">
        <input type="radio" id="1" name="image-slide" hidden />
        <input type="radio" id="2" name="image-slide" hidden />
        <input type="radio" id="3" name="image-slide" hidden />

        <div className="slide">
          <div className="item-slide">
            <img
              src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
              alt="zapatilla"
            />
          </div>

          <div className="item-slide">
            <img
              src="https://cdn.pixabay.com/photo/2014/09/03/20/15/shoes-434918_960_720.jpg"
              alt="zapatilla"
            />
          </div>

          <div className="item-slide">
            <img
              src="https://images.unsplash.com/photo-1571008887538-b36bb32f4571?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
              alt="zapatilla"
            />
          </div>
        </div>

        <div className="pagination">
          <label className="pagination-item" htmlFor="1">
            <img
              src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
              alt="zapatilla"
            />
          </label>

          <label className="pagination-item" htmlFor="2">
            <img
              src="https://cdn.pixabay.com/photo/2014/09/03/20/15/shoes-434918_960_720.jpg"
              alt="zapatilla"
            />
          </label>

          <label className="pagination-item" htmlFor="3">
            <img
              src="https://images.unsplash.com/photo-1571008887538-b36bb32f4571?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
              alt="zapatilla"
            />
          </label>
        </div>
      </div>
    </>
  );
};

export default Slider;
