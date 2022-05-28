import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../redux/actions";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const CreateProduct = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

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

  const [image, setImage] = useState("");  
  const [error, setError] = useState({});
  const [input, setInput] = useState({
    product: "",
    brand: "",
    description: "",
    price: "",
    gender: "",
    year: "",
    category: "",
  });


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

  const HandleOnChangeImage = async(e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("image", files[0]);
    data.append("upload_preset", "HenryShoes");
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/henryshoes/image/upload`,
      {
        method: "POST",
        body: data
    }
    );
    const file = await res.json();
    console.log(res);
    setImage(file.secure_url);
  }
  console.log(image)

  const HandleOnSubmit = async (e) => {
    e.preventDefault();
    const form = document.getElementById("CreateForm");
    const selectedImg = document.getElementById("uploadImage");
    console.log(selectedImg, "esto es selected")
    console.log(input.image.files[0].path, "esto es src")
    if (input.product.length > 0)
      try {
         //const formData = new FormData(selectedImg)
        //console.log(formData, "esto es con fromdata") 
        const response = await axios({
          method: "post",
          url: `${process.env.REACT_APP_API_URL}/admin/create-products`,
          data: {
            model: input.product,
            brandName: input.brand,
            description: input.description,
            price: input.price,
            image: image,
            gender: input.gender,
            year: input.year,
            CategName: input.category,
          },
        });
    
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
          category: "",
        });
      } catch (err) {
        console.log(err);
      }
  };

  return (
    <div>
      <div>
        <Link to="/">Back</Link>
      </div>

      <div>
          <label>Image: </label>
        </div>
        <div>
          <form name="image" id="image" encType="multipart/form-data" onSubmit={HandleOnChangeImage}>
          <input name="image" type="file" onChange={HandleOnChangeImage} />
          </form>
        </div>

      <form name="CreateForm" id="CreateForm">
        <label>Brand: </label>
        <div>
          <select defaultValue="All" name="brand" onChange={HandleOnChange}>
            <option value="All" disabled="disabled">
              Brand
            </option>
            {brands?.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Gender: </label>
          <div>
            <select defaultValue="All" name="gender" onChange={HandleOnChange}>
              <option value="All" disabled="disabled">
                Gender
              </option>
              {genders?.map((gender) => (
                <option key={genders.indexOf(gender)} value={gender}>
                  {gender}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label>Product: </label>
          <div>
            <input type="text" name="product" onChange={HandleOnChange} />
          </div>
        </div>

        <div>
          <div>
            <label>Price: </label>
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
            <label>Release Year: </label>
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

        <label>Description: </label>
        <div>
          <input name="description" type="text" onChange={HandleOnChange} />
        </div>

        <div>
          <label>Category name: </label>
        </div>
        <div>
          <input name="category" type="text" onChange={HandleOnChange} />
        </div>

        {/* <div>
          <label>Image: </label>
        </div>
        <div>
          <input name="image" type="text" onChange={HandleOnChange} />
        </div> */}
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
    </div>
  );
};

export default CreateProduct;
