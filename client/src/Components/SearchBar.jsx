import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getAllProducts, setCurrentPage } from "../redux/actions";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { SearchDiv, SearchForm, SearchBtn } from "../styles/SearchBar";

export default function SearchBar() {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };
  const timer = (time) =>
    setTimeout(() => {
      dispatch(getAllProducts(search));
    }, time);

  const handleOnClick = (e) => {
    e.preventDefault();

    try {
      if (!search) {
        toast.error("Insert shoes name");
      } else {
        dispatch(getAllProducts(search));
        dispatch(setCurrentPage(1));
        navigate("/catalogPage");
        setSearch({ search });
        timer(500);
        setSearch("");
      }
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <SearchDiv>
        <SearchForm onSubmit={handleOnClick}>
            <input
                type="text"
                placeholder="Search Product..."
                onChange={handleOnChange}
                value={search}
                autoComplete="off"
            />
            
            <SearchBtn onClick={handleOnClick} ></SearchBtn>
            
        </SearchForm>
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          draggable
        />
    </SearchDiv>
);
}
