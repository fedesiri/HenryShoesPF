import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterByBrands, filterByGender, getAllProducts, orderProducts, setCurrentPage } from "../../redux/actions";
import NavBar from "../NavBar";
import Filters from "../Filters";
import Loader from "../Load";
import Paged from "../Paged";
import CardProduct from "../CardProduct";


export default function Catalog(){
    const dispatch = useDispatch();
    const { products, page } = useSelector((state) => state);
    const [loader, setLoader] = useState(true);
    const [filters, setFilters] = useState(false);
    const [ ,setOrder ] = useState();

    const productsPerPage = 6;
    const indexLastProduct = page * productsPerPage;
    const indexFirstProduct = indexLastProduct - productsPerPage;

    const currentProducts = products.slice(
        indexFirstProduct, 
        indexLastProduct
    );

    const timer = (time) =>
        setTimeout(()=>{
            setLoader(false);
        }, time);

    useEffect(()=>{
        setLoader(true)
        dispatch(getAllProducts())
        timer(1000);
        return ()=> clearTimeout(timer);
    }, [dispatch]);

    const handleOrdered = (e)=>{
        e.preventDefault();
        dispatch(orderProducts(e.target.value));
        setOrder(e.target.value);
    };

    const handleFilterGender = (e) =>{
        e.preventDefault();
        dispatch(filterByGender(e.target.value));
        dispatch(setCurrentPage(1));
        setOrder(e.target.value);
    };

    const handleFilterBrands = (e) =>{
        e.preventDefault();
        dispatch(filterByBrands(e.target.value));
        dispatch(setCurrentPage(1));
        setOrder(e.target.value);
    }

    const handleClick = (e) =>{
        e.preventDefault();
        setLoader(true);
        dispatch(getAllProducts());
        dispatch(setCurrentPage(1));
        timer(500);
    };

    return (
        <div>
            <NavBar handleClick={handleClick}/>
            <div>
                <button onClick={handleClick}>RELOAD</button>
                <button onClick={()=> setFilters(!filters)} >Filters</button>
                {filters && (
                    <Filters
                    products={products}
                    handleOrdered={handleOrdered}
                    handleFilterGender={handleFilterGender}
                    handleFilterBrands={handleFilterBrands}
                    />
                )}
            </div>
            <Paged productsPerPage={productsPerPage}/>
            <div>
                    {loader ? (
                        <Loader/>
                    ): (
                        (products.length > 0 && 
                            currentProducts?.map((product, index)=>(
                                <CardProduct
                                key={index}
                                id={product.id}
                                price={product.price}
                                model={product.model}
                                image={product.image}
                                description={product.description}
                                /> 
                            ))) || (
                                <div>
                                    <h2>No results found</h2>
                                </div>                            
                            )
                    )}
            </div>
        </div>
    );
}