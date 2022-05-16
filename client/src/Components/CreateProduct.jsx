import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getAllBrands, getAllProducts } from "../redux/actions";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import {FormContainer, BackBtn, DetailContainer} from "../styles/CreateProduct"
import NavBar from "./NavBar";



const CreateProduct = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  const reduxProducts = useSelector((state) => state.products);
  const genders = [];
  const brands = [];

  function GenderGetter(reduxProducts) {
    reduxProducts?.map((product) => {
      if (!genders.includes(product?.gender)) genders.push(product?.gender);
    });
  }
  GenderGetter(reduxProducts);

  function BrandGetter(reduxProducts) {
    reduxProducts?.map((product) => {
      if (!brands.includes(product.brand?.name))
        brands.push(product.brand?.name);
    });
  }
  BrandGetter(reduxProducts);

  const [error, setError] = useState({});
  const [input, setInput] = useState({
    product: "",
    brand: "",
    description: "",
    price: "",
    image: "",
    gender: "",
    year: "",
  });
  console.log(input);

  function validate(value) {
    let error = {};

    if (!/^\d+$/.test(input.price) || input.price < 0 || input.year < 0) {
      error.price = "Positive numbers only";
    } else if (
      !input.product ||
      !input.price ||
      !input.brand ||
      !input.gender ||
      !input.description ||
      !input.image
    ) {
      error.incomplete = "Missing Fields";
    }
    return error;
  }
  console.log(input.brand);
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

  const HandleOnSubmit = async (e) => {
    e.preventDefault();
    const form = document.getElementById("CreateForm");
    if (input.product.length > 0)
      try {
        const response = await axios({
          method: "post",
          url: "http://localhost:3001/products/create",
          data: {
            model: input.product,
            brandName: input.brand,
            description: input.description,
            price: input.price,
            image: input.image,
            gender: input.gender,
            year: input.year,
          },
        });
        // console.log(response.data);
        toast(response.data.message);
        form.reset();
        setInput({
          product: "",
          brand: "",
          description: "",
          price: "",
          image: "",
          gender: "",
          year: "",
        });
      } catch (err) {
        console.log(err);
      }
  };

  return (

    <DetailContainer>

        <Link to="/">
        <BackBtn/>
        </Link>
    <FormContainer>
      
      <form name="CreateForm" id="CreateForm">
        <label>Brand: </label>
        <div>
          <select defaultValue="All" name="brand" onChange={HandleOnChange}>
            <option value="All" disabled="disabled">Brand</option>
            {brands?.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
            ;
          </select>
        </div>

        <div>
          <label>Category gender: </label>
          <div>
            <select defaultValue="All" name="gender" onChange={HandleOnChange}>
            <option value="All" disabled="disabled">Gender</option>
              {genders?.map((gender) => (
                <option key={genders.indexOf(gender)} value={gender}>
                  {gender}
                </option>
              ))}
              ;
            </select>
          </div>
        </div>

        <div>
          <label>Producto: </label>
          <div>
            <input type="text" name="product" onChange={HandleOnChange} />
          </div>
        </div>

        <div>
          <div>
            <label>Precio: </label>
          </div>
          <div>
            <input
              name="price"
              min="1"
              type="number"
              onChange={HandleOnChange}
            />
          </div>
        </div>

        <div>
          <div>
            <label>Año de Lanzamiento: </label>
          </div>
          <div>
            <input
              name="year"
              min="1"
              type="number"
              onChange={HandleOnChange}
            />
          </div>
        </div>

        <label>Descripción: </label>
        <div>
          <input name="description" type="text" onChange={HandleOnChange} />
        </div>

        <div>
          <label>Imágen: </label>
        </div>
        <div>
          <input name="image" type="text" onChange={HandleOnChange} />
        </div>
        <div>
          {error.price ? <p>{error.price}</p> : null}
          {error.incomplete ? <p>{error.incomplete}</p> : null}
        </div>
        {!error.incomplete && !error.price && (
          <div>
            <button onClick={(e) => HandleOnSubmit(e)}>Create</button>
          </div>
        )}
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
    </FormContainer>

    </DetailContainer>
  );
};

export default CreateProduct;
