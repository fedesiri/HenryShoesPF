import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import FormularioInicio from "./FormularioInicio";
import { NavContainer, NavigBar, Banner, LoginDiv, SearchNav } from "../styles/NavBar";
import banner from "../static/banner.png"

export default function NavBar(){
    return (
        <NavContainer>
            <NavigBar>
                <Banner>
                    <Link to="/">
                        <img src={banner} alt="" width="100%" height="150px"/>
                    </Link>   
                </Banner>
                <LoginDiv>
                    <FormularioInicio/>
                </LoginDiv>
            </NavigBar>   
            <SearchNav>
                <SearchBar/>    
            </SearchNav>
        </NavContainer>
    )
}
