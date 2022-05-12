import React from "react";
import { Link } from "react-router-dom";


export default function NavBar(){
    return (
        <div>
            <div>
                <Link to="/">
                    <h1>HenryShoes</h1>
                </Link>   
            </div>            
        </div>
    )
}