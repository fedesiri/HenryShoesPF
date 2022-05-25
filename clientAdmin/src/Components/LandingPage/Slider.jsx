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
              src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/1a537f2d-1091-4c83-b3de-305f79cfa5f2/d1agjif-ffa6f423-67cf-4cc2-b451-75b2beafa78a.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzFhNTM3ZjJkLTEwOTEtNGM4My1iM2RlLTMwNWY3OWNmYTVmMlwvZDFhZ2ppZi1mZmE2ZjQyMy02N2NmLTRjYzItYjQ1MS03NWIyYmVhZmE3OGEuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.fQcgcEzBacpnhR_0psaZJOF1HfBscmjLyMw11AyOXfE"
              alt="zapatilla"
            />
          </div>

          <div className="item-slide">
            <img
              src="https://static.dafiti.com.ar/cms/BannerLandingDesk_S21_NB.jpg"
              alt="zapatilla"
            />
          </div>

          <div className="item-slide">
            <img
              src="https://www.marketingsgm.es/wp-content/uploads/banner-adidas.jpg"
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
