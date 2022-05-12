import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getAllProducts, getAllProductsByBrands, setCurrentPage } from "../redux/actions";

export default function SearchBar() {
    const [search, setSearch] = useState("");
    const dispatch = useDispatch();

    const handleOnChange = e => {
        e.preventDefault();
        setSearch(e.target.value);
    };

    const handleOnClick = e => {
        e.preventDefault();

        if (!search) {
            alert("Insert shoes name");
        } else {
            dispatch(getAllProductsByBrands(search))
            dispatch(getAllProducts(search));
            dispatch(setCurrentPage(1))
            setSearch("");
        }
    };

    return (
        <div>
            <form onSubmit={handleOnClick}>
                <button onClick={handleOnClick} >BUSCAR</button>
                <input
                    type="text"
                    placeholder="Search Product..."
                    onChange={handleOnChange}
                    value={search}
                    autoComplete="off"
                />
            </form>
        </div>
    );
}
