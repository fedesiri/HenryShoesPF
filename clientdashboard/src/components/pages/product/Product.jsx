import { Publish } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import "./product.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts, getProductById } from "../../../redux/actions";
import { useParams } from "react-router-dom";
import {InputLabel, MenuItem, Select } from "@material-ui/core";

import { ToastContainer, toast } from "react-toastify";
import axios from "axios";



const Product = () => {
  const dispatch = useDispatch();
  const params = useParams();
  let { id } = params;
  const detail = useSelector((state) => state.details);


  const [input, setInput] = useState({
    product: "",
    brandName: "",
    description: "",
    price: "",
    image: "",
    gender: "",
    year: "",
    category: "",
  });

  console.log(input)
 
  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(getProductById(id));
  }, []); //  eslint-disable-line react-hooks/exhaustive-deps

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
      if (!brands.includes(product?.brandName))
        brands.push(product?.brandName);
    });
  }
  BrandGetter(reduxProducts);


  const HandleOnChange = (e) => {
    setInput((PreValue) => ({
      ...PreValue,
      [e.target.name]: e.target.value,
    }));
    // setError(
    //   validate({
    //     ...input,
    //     [e.target.name]: e.target.value,
    //   })
    // );
  };

  const HandleOnSubmit = async (e) => {
    e.preventDefault();
    // const form = document.getElementById("CreateForm");
    try {
      const response = await axios({
        method: "put",
        url: `${process.env.REACT_APP_API_URL}/admin/update-product/${detail.id}`,
        data: {
          model: input.product !== "" ? input.product : detail.model,
          brandName: input.brandName !== "" ? input.brandName : detail.model,
          description:
            input.description !== "" ? input.description : detail.description,
          price: input.price !== "" ? input.price : detail.price,
          image: input.image !== "" ? input.image : detail.image,
          gender: input.gender !== "" ? input.gender : detail.gender,
          year: input.year !== "" ? input.year : detail.year,
          CategName: input.category !== "" ? input.category : detail.CategName,
        },
      });
      console.log(response)
      toast(response.data.message);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Edit product</h1>
        <Link to="/newproduct">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
        {/* <div className="productTopLeft">
            <Chart data={products} dataKey="Sales" title="Sales Performance"/>
        </div> */}
        <div className="productTopRight">
          <div className="productInfoTop">
            <img src={detail.image} alt="" className="productInfoImg" />
            <span className="productName">{detail.model}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">Id:</span>
              <span className="productInfoValue">{detail.id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Brand:</span>
              <span className="productInfoValue">{detail.brandName}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Gender:</span>
              <span className="productInfoValue">{detail.gender}</span>
            </div>

            <div className="productInfoItem">
              <span className="productInfoKey">Price:</span>
              <span className="productInfoValue">{detail.price}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Year:</span>
              <span className="productInfoValue">{detail.year}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Categories:</span>
              <span className="productInfoValue">{detail.CategName}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">active:</span>
              <span className="productInfoValue">yes</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">in stock:</span>
              <span className="productInfoValue">no</span>
            </div>
            {/*//! CAMBIAR EL ANCHO */}
            <div className="productInfoItem">
              <span className="productInfoKey">Description:</span>
              <span className="productInfoValue">{detail.description}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label htmlFor="product">Product Name</label>
            <input
              size="60"
              name="product"
              id="product"
              type="text"
              onChange={HandleOnChange}
              placeholder={detail.model}
            />

            <label style={{marginTop: "20px"}} id="brandName">Brand</label>
            <Select
              labelId="brandName"
              name="brandName"
              id="brandName"
              // defaultValue={detail.brandName}
              onChange={HandleOnChange}
            >
              {brands.map((brand) => (
                <MenuItem key={brands.indexOf(brand)} value={brand}>
                  {brand}
                </MenuItem>
       
              ))}
             </Select>
        
        
        <label style={{marginTop: "20px"}} htmlFor="gender" id="gender">Gender</label>
            <Select
              labelId="gender"
              name="gender"
              id="gender"
              // defaultValue={detail.gender}
              onChange={HandleOnChange}
              value={detail.gender}
            >
              {genders.map((gender) => (
                <MenuItem key={genders.indexOf(gender)} value={gender}>
                  {gender}
                </MenuItem>
       
              ))}
            </Select> 

            <label style={{marginTop: "20px"}} htmlFor="price">Price</label>
            <input
              name="price"
              id="price"
              type="text"
              onChange={HandleOnChange}
              placeholder={detail.price}
            />

            <label style={{marginTop: "20px"}} htmlFor="year">Release year: </label>
            <input
              name="year"
              type="number"
              min="2015"
              onChange={HandleOnChange}
              placeholder={detail.year}
            />

            <label style={{marginTop: "20px"}} htmlFor="category">Categories</label>
            <input
              name="category"
              id="category"
              type="text"
              onChange={HandleOnChange}
              placeholder={detail.CategName}
            />

            <label style={{marginTop: "20px"}} htmlFor="description">Description</label>
            <input
              name="description"
              id="description"
              type="text"
              onChange={HandleOnChange}
              placeholder={detail.description}
            />

            <label style={{marginTop: "20px"}}>In Stock</label>
            <select name="inStock" id="idStock">
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
            <label>Active</label>
            <select name="active" id="active">
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          <div
            className="productFormRight"
            style={{ justifyContent: "center" }}
          >
            <label style={{ display: "flex", justifyContent: "center" }}>
              Actual Image
            </label>
            <div className="productUpload" style={{ flexDirection: "column" }}>
              <img
                width="200"
                style={{
                  boxShadow: "-7px 10px 5px 2px rgba(219,218,218,0.75)",
                  marginBottom: "15px",
                }}
                src={detail.image}
                alt={detail.model}
              />
              <label htmlFor="file">
                <Publish />
              </label>
              <input type="file" id="file" style={{ display: "none" }} />
            </div>
            <button onClick={(e) => HandleOnSubmit(e)} className="productButton">Update</button>
          </div>
        </form>
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
    </div>
  );
};

export default Product;
