import axios from "axios";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../redux/actions";
import { CardContainer, CardImage, CardInfo } from "../styles/CardProduct";
import { Products } from "../styles/CatalogPage";
import Paged from "../Components/Paged";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";

const CreateCategory = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  const AllProducts = useSelector((state) => state.allProducts);
  const page = useSelector((state) => state.page);

  const productsPerPage = 30;
  const indexLastProduct = page * productsPerPage;
  const indexFirstProduct = indexLastProduct - productsPerPage;

  const currentProducts = AllProducts.slice(
    indexFirstProduct,
    indexLastProduct
  );

  const [category, SetCategory] = useState();
  const [addedProducs, SetAddedProducts] = useState([]);

  const HandleOnChange = (e) => {
    SetCategory(e.target.value);
  };

  const HandleOnClick = (id, e) => {
    e.preventDefault();
    SetAddedProducts((PreValue) => [...PreValue, id]);
  };


  const HandleOnSubmit = async (e) => {
    e.preventDefault();
    const form = document.getElementById("CreateCategory");
    try {
      const response = await axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}/categories`,
        data: {
          name: category,
        },
      });
      toast(response.data.message);
      form.reset();
    } catch (err) {
      console.error(err)
    }
  };

  return (
    <div>
      <Link to="/">Volver</Link>
      <form name="CreateCategory" id="CreateCategory">
        <div>
          <label>Create New Category</label>
          <input type="text" name="Category" onChange={HandleOnChange} />
        </div>
        <div>
          <label>Add Products</label>
          <Paged productsPerPage={productsPerPage} />
          <Products>
            {AllProducts.length > 0 &&
              currentProducts?.map((product, index) => (
                <CardContainer
                  onClick={(e) => HandleOnClick(product.id, e)}
                  value={product.id}
                  key={index}
                >
                  <CardImage>
                    <img src={product.image} alt="" />
                  </CardImage>
                  <CardInfo>
                    <div>
                      <p>{product.model}</p>
                    </div>
                    <div>
                      <p>
                        <span>Price</span>:${product.price}
                      </p>
                    </div>
                  </CardInfo>
                </CardContainer>
              ))}
          </Products>
        </div>
        <div>
          <button onClick={(e) => HandleOnSubmit(e)}>Create</button>
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
  );
};
export default CreateCategory;
