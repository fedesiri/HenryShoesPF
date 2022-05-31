import "./createProduct.css";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import { getAllProducts } from "../../../redux/actions/index.js";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import CardPrev from "../createProduct/CardPrev"

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import { MenuItem, Select } from "@material-ui/core";
import { Redirect } from "react-router-dom";

const CreateProduct = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userInfo);
  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const [input, setInput] = useState({
    product: "",
    brand: "",
    newBrand: "",
    description: "",
    price: "",
    image: "",
    gender: "",
    year: "",
    category: "",
  });
  const [error, setError] = useState({});

  function validate(value) {
    let error = {};
    if (
      !input.product ||
      !input.price ||
      !input.brand ||
      !input.gender ||
      !input.description ||
      !input.category
    ) {
      error.incomplete = "Missing Fields";
    }
    return error;
  }

  const HandleOnChange = (e) => {
    setInput((PreValue) => ({
      ...PreValue,
      [e.target.name]: e.target.value,
    }));
    setError(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  };
  // console.log(error);

  const HandleOnSubmit = async (e) => {
    e.preventDefault();
    const form = document.getElementById("CreateForm");
    if((input.brand || input.newBrand) && input.product && input.price && input.description && input.year && input.gender){
      if (input.product.length > 0)
        try {
          const response = await axios({
            method: "post",
            url: `${process.env.REACT_APP_API_URL}/admin/create-products`,
            data: {
              model: input.product,
              brandName: input.brand ? input.brand : input.newBrand,
              description: input.description,
              price: input.price,
              image: input.image,
              gender: input.gender,
              year: input.year,
              CategName: input.category,
            },
          });

          toast(response.data.message);
          form.reset();
          document.getElementById("brandName").value = "";
          document.getElementById("genderName").value = "";
          setInput({
            product: "",
            brand: "",
            newBrand: "",
            description: "",
            price: "",
            image: "",
            gender: "",
            year: "",
            category: "",
          });
        } catch (err) {
          console.log(err);
        }
    } else{
        toast.error("Missing fields")
    }
  };

  // console.log("CREATE PRODUCT", input);
  const reduxProducts = useSelector((state) => state.products);
  const genders = [];
  const brands = [];

  function GenderGetter(reduxProducts) {
    reduxProducts?.forEach((product) => {
      if (!genders.includes(product?.gender)) genders.push(product?.gender);
    });
  }
  GenderGetter(reduxProducts);

  function BrandGetter(reduxProducts) {
    reduxProducts?.forEach((product) => {
      if (!brands.includes(product?.brandName)) brands.push(product?.brandName);
    });
  }
  BrandGetter(reduxProducts);

  return (
    <>
    {userInfo && userInfo.roleId === 1 ? (
      <>
<div className="contenedor">
    <div className="newProduct">
      <h1 className="addProductTitle">New Product</h1>
      <form className="addProductForm" name="CreateForm" id="CreateForm">
        
        <div style={{ marginTop: "20px" }} className="addProductItem">
          <label htmlFor="product">Product Name</label>
          <TextField
            onChange={HandleOnChange}
            id="product"
            name="product"
            type="text"
            placeholder="Product Name"
          />
        </div>

        <div className="addProductItem">
          {/*//! PENDIENTE LA IMAGEN */}
          <label>Image</label>
          <input name="image" type="file" id="file" />
        </div>

        <div style={{ marginTop: "30px" }} className="addProductItem">
          <label id="brand">Brand</label>
          <Select
            labelId="brand"
            name="brand"
            id="brandName"
            onChange={HandleOnChange}
            value={input.brand}
          >
            <MenuItem value="">
              Brand
            </MenuItem>
            {brands.map((brand) => (
              <MenuItem key={brands.indexOf(brand)} value={brand}>
                {brand}
              </MenuItem>
            ))}
          </Select>
        </div>

        <div style={{ marginTop: "20px" }} className="addProductItem">
          <label htmlFor="product">...Or add a new Brand</label>
          <TextField
            onChange={HandleOnChange}
            id="newBrand"
            name="newBrand"
            type="text"
            placeholder="New brand"
          />
        </div>

        <div style={{ marginTop: "30px" }} className="addProductItem">
          <label htmlFor="gender" id="gender">
            Gender
          </label>
          <Select
            labelId="gender"
            name="gender"
            id="genderName"
            value={input.gender}
            onChange={HandleOnChange}
          >
            <MenuItem value="" >
              Gender
            </MenuItem>
            {genders.map((gender) => (
              <MenuItem key={genders.indexOf(gender)} value={gender}>
                {gender}
              </MenuItem>
            ))}
          </Select>
        </div>

        <div style={{ marginTop: "30px" }} className="addProductItem">
          <label htmlFor="price">Price</label>
          <TextField
            onChange={HandleOnChange}
            id="price"
            name="price"
            type="number"
            min="0"
            placeholder="Products price"
          />
        </div>

        <div style={{ marginTop: "30px" }} className="addProductItem">
          <label htmlFor="year">Release year</label>
          <TextField
            onChange={HandleOnChange}
            id="year"
            name="year"
            type="number"
            min="0"
            placeholder="Release year"
          />
        </div>

        <div style={{ marginTop: "30px" }} className="addProductItem">
          <label htmlFor="category">Category</label>
          <TextField
            onChange={HandleOnChange}
            id="category"
            name="category"
            type="text"
            placeholder="Category"
          />
        </div>

        <div style={{ marginTop: "30px" }} className="addProductItem">
          <label htmlFor="description">Description</label>
          <TextField
            onChange={HandleOnChange}
            id="description"
            name="description"
            type="text"
            placeholder="Description"
          />
        </div>

        <div style={{ marginTop: "30px" }} className="addProductItem">
          <label>Stock</label>
          <input type="text" placeholder="123" />
        </div>

        <div className="addProductItem">
          <label style={{ marginTop: "30px" }}>Active</label>
          <select name="active" id="active">
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        
      </form>
      </div>
      
      <div>
      <div>
      <CardPrev
      model={input.product}
      brandName= {input.brand}
      description = {input.description}
      price= {input.price} 
      image={input.image}
      gender= {input.gender}
      year= {input.year}
      CategName={input.category}>
      </CardPrev>
      </div>

      <button type="submit" onClick={(e) => HandleOnSubmit(e)} className="addProductButton">
          Create
        </button>

        </div>

        <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
      />
      
    </div>
      </>


    ) : <Redirect to="/signin" />}
    </>
  );
};

export default CreateProduct;
