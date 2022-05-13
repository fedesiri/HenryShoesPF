import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";


export default function NavBar(){
    return (
        <div>
            <div>
                <Link to="/">
                    <h1>HenryShoes</h1>
                </Link>   
            </div> 
            <div>
                <SearchBar/>    
            </div>           
        </div>
    )
}