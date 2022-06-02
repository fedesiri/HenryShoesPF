import { Publish } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import "./product.css";
import { Link, NavLink, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts, getProductById } from "../../../redux/actions";
import { useParams } from "react-router-dom";
import { MenuItem, Select, Typography } from "@material-ui/core";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { PIC_KEY } from "../../../redux/actions/types";
import CardPrev from "../createProduct/CardPrev";

const Product = () => {
  const dispatch = useDispatch();
  const params = useParams();
  let { id } = params;
  const detail = useSelector((state) => state.details);
  const userInfo = useSelector((state) => state.userInfo);

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

  console.log(input);

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
      if (!brands.includes(product?.brandName)) brands.push(product?.brandName);
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
          brandName:
            input.brandName !== "" ? input.brandName : detail.brandName,
          description:
            input.description !== "" ? input.description : detail.description,
          price: input.price !== "" ? input.price : detail.price,
          image: input.image !== "" ? input.image : detail.image,
          gender: input.gender !== "" ? input.gender : detail.gender,
          year: input.year !== "" ? input.year : detail.year,
          CategName: input.category !== "" ? input.category : detail.CategName,
        },
      });
      console.log(response);
      toast(response.data.message);
    } catch (err) {
      console.log(err);
    }
  };

  function fileChange() {
    let photos = document.getElementById("input_image");
    console.log(photos);
    Array.from(photos.files).map(async (photo) => {
      const body = new FormData();
      body.set("key", PIC_KEY);
      body.append("image", photo);

      // const options = {
      //   onUploadProgress: (ProgressEvent) => {
      //     const { loaded, total } = ProgressEvent;
      //     let percent = Math.floor((loaded * 100) / total);
      //     if (percent < 100) {
      //       setInput((PreValue) => ({
      //         ...PreValue,
      //         image: `loading ${percent}%`,
      //       }));
      //     }
      //   },
      // };

      await axios
        .post("https://api.imgbb.com/1/upload", body)
        .then((response) => {
          setInput((PreValue) => ({
            ...PreValue,
            image: response.data.data.url,
          }));
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }

  const imagen = {
    src: "https://static.vecteezy.com/system/resources/previews/002/100/274/non_2x/one-line-drawing-of-shoe-sneakers-a-sport-shoes-for-hand-drawing-minimalism-design-sketch-sneakers-for-your-creativity-isolated-on-white-background-fashion-style-concept-illustration-vector.jpg",
  };

  return (
    <>
    <div className="productDetailContainer">

      {userInfo && userInfo.roleId === 1 ? (
        <>
        <div className="productsList_pageTitle">
                <NavLink style={{color: "black"}} to="/products">
              <Typography variant="body1">
                  Products
              </Typography>
                </NavLink>
              <Typography variant="body1" style={{ color: "grey" }}>
                {" "}
                / Product Detail
              </Typography>
            </div>

          <div className="product">
            <div className="productTitleContainer">
              <Link style={{margin: "20px"}} to="/create-products">
                <button style={{border: "none", backgroundColor: "black", color: "white", padding: "10px", borderRadius: "5px"}}>Create</button>
              </Link>
            </div>

            <div className="productBottom">
              <div className="productForm">
                <div className="productFormLeft">
                  <h4>Current product information.</h4>
                  <div className="productTop">
                    {/* <div className="productTopLeft">
            <Chart data={products} dataKey="Sales" title="Sales Performance"/>
          </div> */}
                    <div className="productTopRight">
                      <div className="productInfoTop">
                        <img
                          src={detail.image}
                          alt=""
                          className="productInfoImg"
                        />
                        <span className="productName">{detail.model}</span>
                      </div>
                      <div className="productInfoBottom">
                        <div className="productInfoItem">
                          <span className="productInfoKey">Id:</span>
                          <span className="productInfoValue">{detail.id}</span>
                        </div>
                        <div className="productInfoItem">
                          <span className="productInfoKey">Brand:</span>
                          <span className="productInfoValue">
                            {detail.brandName}
                          </span>
                        </div>
                        <div className="productInfoItem">
                          <span className="productInfoKey">Gender:</span>
                          <span className="productInfoValue">
                            {detail.gender}
                          </span>
                        </div>

                        <div className="productInfoItem">
                          <span className="productInfoKey">Price:</span>
                          <span className="productInfoValue">
                            {detail.price}
                          </span>
                        </div>
                        <div className="productInfoItem">
                          <span className="productInfoKey">Year:</span>
                          <span className="productInfoValue">
                            {detail.year}
                          </span>
                        </div>
                        <div className="productInfoItem">
                          <span className="productInfoKey">Categories:</span>
                          <span className="productInfoValue">
                            {detail.CategName}
                          </span>
                        </div>
                        {/* <div className="productInfoItem">
                          <span className="productInfoKey">active:</span>
                          <span className="productInfoValue">yes</span>
                        </div> */}
                        {/* <div className="productInfoItem">
                          <span className="productInfoKey">in stock:</span>
                          <span className="productInfoValue">no</span>
                        </div> */}
                        {/*//! CAMBIAR EL ANCHO */}
                        <div
                          style={{ width: "400px" }}
                          className="productInfoItem"
                          >
                          <span className="productInfoKey">Description:</span>
                          <span className="productInfoValue">
                            {detail.description}
                          </span>
                        </div>
                        {/* <div
                    className="productUpload"
                    style={{ flexDirection: "column" }}
                  > */}
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className="productFormRight"
                  style={{ justifyContent: "center", marginRight: "100px" }}
                  >
                  <label style={{ display: "flex", justifyContent: "center" }}>
                    Actual Image
                  </label>
                  <div
                    className="productUpload"
                    style={{ flexDirection: "column" }}
                    >
                    <img
                      width="300"
                      style={{
                        boxShadow: "-7px 10px 5px 2px rgba(219,218,218,0.75)",
                        marginBottom: "15px",
                      }}
                      src={detail.image}
                      alt={detail.image}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="productBottom">
                <h4 style={{ marginBottom: "20px" }}>
                  Edit the information here...
                </h4>

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

                    <label style={{ marginTop: "20px" }} id="brandName">
                      Brand
                    </label>
                    <Select
                      labelId="brandName"
                      name="brandName"
                      id="brandName"
                      // value={detail.brandName}
                      onChange={HandleOnChange}
                      >
                      {brands.map((brand) => (
                        <MenuItem key={brands.indexOf(brand)} value={brand}>
                          {brand}
                        </MenuItem>
                      ))}
                    </Select>

                    <label
                      style={{ marginTop: "20px" }}
                      htmlFor="gender"
                      id="gender"
                      >
                      Gender
                    </label>
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

                    <label style={{ marginTop: "20px" }} htmlFor="price">
                      Price
                    </label>
                    <input
                      name="price"
                      id="price"
                      type="text"
                      onChange={HandleOnChange}
                      placeholder={detail.price}
                      />

                    <label style={{ marginTop: "20px" }} htmlFor="year">
                      Release year:{" "}
                    </label>
                    <input
                      name="year"
                      type="number"
                      min="2015"
                      onChange={HandleOnChange}
                      placeholder={detail.year}
                      />

                    <label style={{ marginTop: "20px" }} htmlFor="category">
                      Categories
                    </label>
                    <input
                      name="category"
                      id="category"
                      type="text"
                      onChange={HandleOnChange}
                      placeholder={detail.CategName}
                      />

                    <label style={{ marginTop: "20px" }} htmlFor="description">
                      Description
                    </label>
                    <input
                      name="description"
                      id="description"
                      type="text"
                      onChange={HandleOnChange}
                      placeholder={detail.description}
                      />

                    {/* <label style={{ marginTop: "20px" }}>In Stock</label>
                    <select name="inStock" id="idStock">
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select> */}
                    {/* <label>Active</label>
                    <select name="active" id="active">
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select> */}
                  </div>
                  <div
                    className="productFormRight"
                    style={{ justifyContent: "center", marginRight: "100px" }}
                    >
                    <div
                      className="productUpload"
                      style={{ flexDirection: "column" }}
                      >
                      <div className="addProductItem">
                        <label>Image</label>
                        <input
                          type="text"
                          value={input.image}
                          name="image"
                          onChange={HandleOnChange}
                          placeholder="Paste an URL or choose from your files"
                          />

                        <input
                          autoComplete="off"
                          placeholder=" "
                          type="file"
                          accept="image/*"
                          name="logoImage"
                          id="input_image"
                          onChange={fileChange}
                        />
                      </div>

                      <div>
                        <CardPrev
                          model={input.product}
                          brandName={input.brandName}
                          description={input.description}
                          price={input.price}
                          image={input.image ? input.image : imagen.src}
                          gender={input.gender}
                          year={input.year}
                          CategName={input.category}
                        ></CardPrev>
                      </div>
                      <label
                        style={{ marginTop: "20px", marginLeft: "115px" }}
                        htmlFor="file"
                        >
                        <Publish />
                      </label>
                      <input
                        type="file"
                        id="file"
                        style={{ display: "none" }}
                      />
                    </div>
                    <button
                      onClick={(e) => HandleOnSubmit(e)}
                      className="productButton"
                      style={{ justifyContent: "center", marginLeft: "115px", backgroundColor: "black" }}
                      >
                      Update
                    </button>
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
          </div>
        </>
      ) : (
        <Redirect to="/signin" />
      )}
        </div>
    </>
  );
};

export default Product;
