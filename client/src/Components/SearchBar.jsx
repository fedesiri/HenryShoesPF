import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getAllProducts, setCurrentPage } from "../redux/actions";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
    const [search, setSearch] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const handleOnChange = e => {
        e.preventDefault();
        setSearch(e.target.value);
    };
    const timer = (time) =>
        setTimeout(()=>{
            dispatch(getAllProducts(search));
        }, time);

    const handleOnClick = e => {
        e.preventDefault();

        try {
            if (!search) {
                alert("Insert shoes name");
            } else {
                dispatch(getAllProducts(search));
                dispatch(setCurrentPage(1));
                navigate("/catalogPage");
                setSearch({search});
                timer(500);
                setSearch("");
            }
        } catch (error) {
            alert(error)
        }
        
    };


    return (
        <div>
            <form onSubmit={handleOnClick}>
                <input
                    type="text"
                    placeholder="Search Product..."
                    onChange={handleOnChange}
                    value={search}
                    autoComplete="off"
                />
                
                <button onClick={handleOnClick} >BUSCAR</button>
                
            </form>
        </div>
    );
}
