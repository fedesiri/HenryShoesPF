import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import {
  getAllCategory,
  getAllProducts,
} from "../../../redux/actions/index.js";
import { ToastContainer, toast } from "react-toastify";
import { Grid, TextField, Typography } from "@material-ui/core";
import {
  DataGrid,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@material-ui/data-grid";
import "react-toastify/dist/ReactToastify.css";
import { DeleteOutline } from "@material-ui/icons";

import "./CreateCategory.css";
import { Redirect } from "react-router-dom";

export default function CreateCategory() {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories);
  const products = useSelector((state) => state.allProducts);
  const userInfo = useSelector((state) => state.userInfo);

  useEffect(() => {
    dispatch(getAllCategory());
    dispatch(getAllProducts());
  }, [dispatch]);

  const [category, SetCategory] = useState({
    name: "",
  });
  const [arrayIds, setArrayIds] = useState([]);
  // console.log(arrayIds)

  const HandleOnChange = (e) => {
    SetCategory((PreValue) => ({
      ...PreValue,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = async (e) => {
    // e.preventDefault();
    if (category.name) {
      try {
        const response = await axios({
          method: "post",
          url: `${process.env.REACT_APP_API_URL}/admin/create-categories`,
          data: {
            name: category.name,
            data: arrayIds,
          },
        });
        if (response.data) {
          document.getElementById("name").value = "";
          SetCategory({
            name: "",
          });
          setArrayIds([]);
          dispatch(getAllCategory());
          toast.success(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      toast.error("Missing Fields");
    }
  };

  const handleDelete = (id) => {
    // console.log(id);
    if (window.confirm("Are you sure you want to delete this Category?")) {
      axios({
        method: "delete",
        url: `${process.env.REACT_APP_API_URL}/admin/delete-category/${id}`,
      })
        .then((res) => {
          // console.log(res);
          toast.success(res.data.message);
          dispatch(getAllCategory());
        })
        .catch((err) => console.log(err));
    }
  };

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  }

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "product",
      headerName: "Product",
      width: 300,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.image} alt="" />
            {params.row.model}
          </div>
        );
      },
      valueGetter: (params) => params.row.model,
    },
  ];

  const categColumns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "name",
      headerName: "Category Name",
      width: 200,
      valueGetter: (params) => params.row.name,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <>
      <div className="categoryContainer">
        {userInfo && userInfo.roleId === 1 ? (
          <>
            <div className="addCategory_pageTitle">
              <Typography variant="body1">Dashboard</Typography>
              <Typography variant="body1" style={{ color: "grey" }}>
                {" "}
                / Add Brand
              </Typography>
            </div>

            <div className="categoryGrid">
              <div className="addCategoryLeft">
                <form className="addCategoryForm">
                  <label>Category name</label>
                  <TextField
                    onChange={HandleOnChange}
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Category Name"
                  />{" "}
                  <button
                  style={{marginBottom: "10px"}}
                    onClick={(e) => handleOnSubmit(e)}
                    className="addBrandButton"
                  >
                    Create
                  </button>
                </form>

                <DataGrid
                  rows={products}
                  disableSelectionOnClick
                  columns={columns}
                  pageSize={25}
                  checkboxSelection
                  onSelectionModelChange={(ids) => setArrayIds(ids)}
                  components={{
                    Toolbar: CustomToolbar,
                  }}
                />
              </div>
              <div className="addCategoryRight">
                <DataGrid
                  rows={categories}
                  columns={categColumns}
                  pageSize={10}
                  checkboxSelection
                  disableSelectionOnClick
                  // onSelectionModelChange={(ids) => setArrayIds(ids)}
                  components={{
                    Toolbar: CustomToolbar,
                  }}
                />
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
}
