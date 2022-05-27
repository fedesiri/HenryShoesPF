import { TextField } from "@material-ui/core";
import { useEffect, useState } from "react";
import "./createBrand.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { DataGrid } from "@material-ui/data-grid";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getAllBrands } from "../../../redux/actions/index.js";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";

export default function CreateBrand() {
  const dispatch = useDispatch();
  const brands = useSelector((state) => state.brands);

  useEffect(() => {
    dispatch(getAllBrands());
  }, [dispatch]);

  const [input, setInput] = useState({
    name: "",
  });
  console.log(input);

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
    console.log(id);
    if (window.confirm("Are you sure you want to delete this brand?")) {
      axios({
        method: "delete",
        url: `${process.env.REACT_APP_API_URL}/admin/delete-brand/${id}`,
      }).then((res) => {
        console.log(res)
        toast.success(res.data.message);
        dispatch(getAllBrands());
      }).catch(err => console.log(err))
    }
  };

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
          <DataGrid
            rows={brands}
            columns={columns}
            pageSize={15}
            checkboxSelection
            disableSelectionOnClick
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
