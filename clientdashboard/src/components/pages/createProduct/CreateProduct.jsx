import "./createProduct.css";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import { getAllProducts, getAllSizes } from "../../../redux/actions/index.js";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import CardPrev from "../createProduct/CardPrev";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import { Button, MenuItem, Select, Typography } from "@material-ui/core";
import { PIC_KEY } from "../../../redux/actions/types";
import { NavLink, Redirect } from "react-router-dom";

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
    size: "",
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
    if (
      (input.brand || input.newBrand) &&
      input.product &&
      input.price &&
      input.description &&
      input.year &&
      input.gender
    ) {
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
              size: input.size,
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
            size: "",
          });
        } catch (err) {
          console.log(err);
        }
    } else {
      toast.error("Missing fields");
    }
  };

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
      <div className="createProductContainer">
        {userInfo && userInfo.roleId === 1 ? (
          <>
            <div className="editProduct_pageTitle">
              <NavLink style={{ color: "black" }} to="/products">
                <Typography variant="body1">Products</Typography>
              </NavLink>
              <Typography variant="body1" style={{ color: "grey" }}>
                {" "}
                / Products
              </Typography>
            </div>
            <div className="editProduct_Grid">
              <form
                className="editProductForm"
                name="CreateForm"
                id="CreateForm"
              >
                <div style={{ display: "flex", flexDirection: "column", width: "200px", marginRight: "30px" }}>
                  <label className="editProduct_input" htmlFor="product">
                    Product Name
                  </label>
                  <TextField
                    className="editProduct_input"
                    onChange={HandleOnChange}
                    id="product"
                    name="product"
                    type="text"
                    placeholder="Product Name"
                    margin="dense"
                    size="small"
                  />
                </div>

                <div style={{ display: "flex", flexDirection: "column", width: "200px", marginLeft: "30px"  }}>
                  <label className="editProduct_input">Image</label>
                  <input
                    style={{ marginBottom: "10px" }}
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

                <div style={{ display: "flex", flexDirection: "column", width: "200px", marginRight: "30px"  }}>
                  <label className="editProduct_input" id="brand">
                    Brand
                  </label>
                  <Select
                    style={{ width: "150px" }}
                    labelId="brand"
                    name="brand"
                    id="brandName"
                    onChange={HandleOnChange}
                    value={input.brand}
                  >
                    <MenuItem value="">Brand</MenuItem>
                    {brands.map((brand) => (
                      <MenuItem key={brands.indexOf(brand)} value={brand}>
                        {brand}
                      </MenuItem>
                    ))}
                  </Select>
                </div>

                <div style={{ display: "flex", flexDirection: "column", width: "200px", marginLeft: "30px"  }}>
                  <label className="editProduct_input" htmlFor="product">
                    ...Or add a new Brand
                  </label>
                  <TextField
                    margin="normal"
                    onChange={HandleOnChange}
                    id="newBrand"
                    name="newBrand"
                    type="text"
                    placeholder="New brand"
                  />
                </div>

                <div style={{ display: "flex", flexDirection: "column", width: "200px", marginRight: "30px"  }}>
                  <label
                    className="editProduct_input"
                    htmlFor="gender"
                    id="gender"
                  >
                    Gender
                  </label>
                  <Select
                    style={{ width: "150px" }}
                    labelId="gender"
                    name="gender"
                    id="genderName"
                    value={input.gender}
                    onChange={HandleOnChange}
                  >
                    <MenuItem value="">Gender</MenuItem>
                    {genders.map((gender) => (
                      <MenuItem key={genders.indexOf(gender)} value={gender}>
                        {gender}
                      </MenuItem>
                    ))}
                  </Select>
                </div>

                <div style={{ display: "flex", flexDirection: "column", width: "200px", marginLeft: "30px"  }}>
                  <label className="editProduct_input" htmlFor="price">
                    Price
                  </label>
                  <TextField
                    margin="dense"
                    size="small"
                    onChange={HandleOnChange}
                    id="price"
                    name="price"
                    type="number"
                    min="0"
                    placeholder="Products price"
                  />
                </div>

                <div style={{ display: "flex", flexDirection: "column", width: "200px", marginRight: "30px"  }}>
                  <label className="editProduct_input" htmlFor="year">
                    Release year
                  </label>
                  <TextField
                    margin="dense"
                    size="small"
                    onChange={HandleOnChange}
                    id="year"
                    name="year"
                    type="number"
                    min="0"
                    placeholder="Release year"
                  />
                </div>

                <div style={{ display: "flex", flexDirection: "column", width: "200px", marginLeft: "30px"  }}>
                  <label className="editProduct_input" htmlFor="category">
                    Category
                  </label>
                  <TextField
                    margin="dense"
                    size="small"
                    onChange={HandleOnChange}
                    id="category"
                    name="category"
                    type="text"
                    placeholder="Category"
                  />
                </div>

                <div style={{ display: "flex", flexDirection: "column", width: "200px", marginRight: "30px"  }}>
                  <label className="editProduct_input" htmlFor="description">
                    Description
                  </label>
                  <TextField
                    margin="dense"
                    size="small"
                    onChange={HandleOnChange}
                    id="description"
                    name="description"
                    type="text"
                    placeholder="Description"
                  />
                </div>

                <div style={{ display: "flex", flexDirection: "column", width: "200px", marginLeft: "30px"  }}>
                  <label  className="editProduct_input">Stock</label>
                  <input style={{marginTop: "10px"}} type="text" placeholder="123" />
                </div>

                <div style={{ display: "flex", flexDirection: "column", width: "200px", marginRight: "30px"  }}>
                  <label htmlFor="size" id="size">
                    Sizes:{" "}
                  </label>
                  <TextField
                    margin="dense"
                    size="small"
                    type="text"
                    placeholder="24 ... 44"
                    label="size"
                    name="size"
                    id="size"
                    onChange={HandleOnChange}
                  />
                </div>

                <div>
                  <button
                  style={{width: "70px", marginLeft: "30px"}}
                    className="btnEditProduct"
                    type="submit"
                    onClick={(e) => HandleOnSubmit(e)}
                  >
                    Create
                  </button>
                </div>
              </form>

              <div>
                <CardPrev
                  model={input.product}
                  brandName={input.brand}
                  description={input.description}
                  price={input.price}
                  image={input.image ? input.image : imagen.src}
                  gender={input.gender}
                  year={input.year}
                  CategName={input.category}
                  size={input.size}
                ></CardPrev>
              </div>
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
          </>
        ) : (
          <Redirect to="/signin" />
        )}
      </div>
    </>
  );
};

export default CreateProduct;
