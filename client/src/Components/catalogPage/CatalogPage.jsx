import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filter,
  getAllProducts,
  orderProducts,
  setCurrentPage,
  clearDetail,
} from "../../redux/actions";
import NavBar from "../NavBar";
import Filters from "../Filters";
import Loader from "../Load";
import Paged from "../Paged";
import CardProduct from "../CardProduct";
import { Btns, Products, ContainerHome, NoResult, ReloadBtn, Button } from "../../styles/CatalogPage"

export default function Catalog() {
  const dispatch = useDispatch();
  const { allProducts, products, page } = useSelector((state) => state);
  const [loader, setLoader] = useState(true);
  const [filters, setFilters] = useState(false);
  const [, setOrder] = useState();

  const productsPerPage = 30;
  const indexLastProduct = page * productsPerPage;
  const indexFirstProduct = indexLastProduct - productsPerPage;

  const currentProducts = products.slice(indexFirstProduct, indexLastProduct);

  const timer = (time) =>
    setTimeout(() => {
      setLoader(false);
    }, time);

  useEffect(() => {
    dispatch(clearDetail())
    setLoader(true);
    if (allProducts.length === 0) {
      dispatch(getAllProducts());
    }
    timer(500);
    return () => clearTimeout(timer);
  }, [dispatch, allProducts.length] );

  const handleOrdered = (e) => {
    e.preventDefault();
    dispatch(orderProducts(e.target.value));
    setOrder(e.target.value);
  };

  const handleFilter = (filters) => {
    dispatch(filter(filters));
    dispatch(setCurrentPage(1));
  };

  const handleClick = (e) => {
    e.preventDefault();
    setLoader(true);
    dispatch(getAllProducts());
    dispatch(setCurrentPage(1));
    timer(500);
  };

  return (
    <ContainerHome>
        <NavBar handleClick={handleClick} />
        <Btns>
            <ReloadBtn onClick={handleClick}></ReloadBtn>
            <Button onClick={() => setFilters(!filters)}>Filters</Button>
            {filters && (
                <Filters
                    allProducts={allProducts}
                    handleOrdered={handleOrdered}
                    handleFilter={handleFilter}
                    products={products}
                />
            )}
        </Btns>
        <Paged productsPerPage={productsPerPage} />
        <Products>
            {loader ? (
                <Loader />
            ) : (
                (products.length > 0 &&
                    currentProducts?.map((product, index) => (
                        <CardProduct
                            key={index}
                            id={product.id}
                            price={product.price}
                            model={product.model}
                            image={product.image}
                            description={product.description}
                        />
                    ))) || (
                    <NoResult>
                        <h2>No results found</h2>
                    </NoResult>
                )
            )}
        </Products>
    </ContainerHome>
);
}
