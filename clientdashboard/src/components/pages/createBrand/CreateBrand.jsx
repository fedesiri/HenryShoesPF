import { Button, TextField } from "@material-ui/core";
import { useEffect, useState } from "react";
import "./createBrand.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { DataGrid, GridToolbar, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport, GridToolbarFilterButton } from "@material-ui/data-grid";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getAllBrands } from "../../../redux/actions/index.js";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import DeleteIcon from "@material-ui/icons/Delete";

export default function CreateBrand() {
  const dispatch = useDispatch();
  const brands = useSelector((state) => state.brands);

  useEffect(() => {
    dispatch(getAllBrands());
  }, [dispatch]);

  const [input, setInput] = useState({
    name: "",
  });
  

  const HandleOnChange = (e) => {
    setInput((PreValue) => ({
      ...PreValue,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (input.name) {
      try {
        const response = await axios({
          method: "post",
          url: `${process.env.REACT_APP_API_URL}/admin/create-brand`,
          data: {
            name: input.name,
          },
        });
        if (response.data) {
          document.getElementById("name").value = "";
          setInput({
            name: "",
          });
          dispatch(getAllBrands());
          toast.success(response.data.message);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      toast.error("Missing Fields");
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this brand?")) {
      axios({
        method: "delete",
        url: `${process.env.REACT_APP_API_URL}/admin/delete-brand/${id}`,
      })
        .then((res) => {
          toast.success(res.data.message);
          dispatch(getAllBrands());
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
      field: "name",
      headerName: "Brand Name",
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
              // onClick={() => console.log("soy delete")}
            />
          </>
        );
      },
    },
  ];
  const [arrayIds, setArrayIds] = useState([]);

  const handleDeleteAll = async () => {
    // console.log(arrayIds);
    try {
        const response = await axios.delete(
          `${process.env.REACT_APP_API_URL}/admin/delete-all-brands`, {
            data: {
              ids: arrayIds,
            }
          });
        if (response.data) {
          toast.success("Brands deleted successfully");
          dispatch(getAllBrands());
        } else {
          toast.error("Something went wrong");
        }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="newBrand">
      <h1 className="addBrandTitle">New Product</h1>
      <div className="addBrandContainerForm">
        <form className="addBrandForm">
          <div className="addBrandItem">
            <label>Brand name</label>
            <TextField
              onChange={HandleOnChange}
              id="name"
              name="name"
              type="text"
              placeholder="Brand Name"
            />{" "}
          </div>
          <button onClick={(e) => handleOnSubmit(e)} className="addBrandButton">
            Create
          </button>
        </form>
        <div className="addBrandRight">
          <Button
            variant="contained"
            color="secondary"
            // className={classes.button}
            style={{display: `${arrayIds.length > 1 ? "" : "none"}`}}
            startIcon={<DeleteIcon />}
            onClick={handleDeleteAll}
          >
            Delete selected
          </Button>
          <DataGrid
            rows={brands}
            columns={columns}
            pageSize={10}
            checkboxSelection
            disableSelectionOnClick
            onSelectionModelChange={(ids) => setArrayIds(ids)}
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
    </div>
  );
}
