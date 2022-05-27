import "./productList.css";
import {
  DataGrid,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../../redux/actions";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { Button } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

export default function ProductList() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.allProducts);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  //   const handleDelete = (id) => {
  //     setData(data.filter((item) => item.id !== id));
  //   };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "product",
      headerName: "Product",
      width: 200,
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
    { field: "stock", headerName: "Stock", width: 200 },
    {
      field: "status",
      headerName: "Status",
      width: 120,
    },
    {
      field: "price",
      headerName: "Price",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/product/" + params.row.id}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              //   onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  const [arrayIds, setArrayIds] = useState([]);

  const handleDeleteAll = async () => {
    console.log(arrayIds);
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/admin/delete-many-products`,
        {
          data: {
            ids: arrayIds,
          },
        }
      );
      if (response.data) {
        toast.success("Brands deleted successfully");
        dispatch(getAllProducts());
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.log(error);
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

  return (
    <>
      <div className="productList">
        <h1>Products</h1>
        <Button
          variant="contained"
          color="secondary"
          // className={classes.button}
          style={{ display: `${arrayIds.length > 1 ? "" : "none"}` }}
          startIcon={<DeleteIcon />}
          onClick={handleDeleteAll}
        >
          Delete selected
        </Button>
        <DataGrid
          rows={products}
          disableSelectionOnClick
          columns={columns}
          pageSize={20}
          checkboxSelection
          onSelectionModelChange={(ids) => setArrayIds(ids)}
          components={{
            Toolbar: CustomToolbar,
          }}
        />
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
  );
}
