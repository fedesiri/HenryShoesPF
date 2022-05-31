import "../productList/productList.css";
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
import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    getAllProducts, getProductById, GetStock,
} from "../../../redux/actions";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { Button, Grid } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import Modal from "../../Modal/Modal";
import { useModal } from "../../Modal/hooks/useModal";


const HandleStock = ({product, closeStock}) => {
let id = Number(product)
const dispatch = useDispatch();
const SelectedProduct = useSelector((state) => state.details);
const stock = useSelector((state) => state.stock)
const Stockproduct = SelectedProduct.sizes
console.log(stock, "llego el stooockk")

const getStock = useCallback(async () => {
     try { 
     await SelectedProduct
    if(SelectedProduct){
     (dispatch(GetStock({productId: SelectedProduct.id, sizeId: Stockproduct})) )
    }    
    } catch (error) {
      console.log(error);
    }
  },[]);



useEffect(() => {
    dispatch(getProductById(id));
    getStock();
}, [product]);


const columns = [
    { field: "Size",
     headerName: "Size",
      width: 200 ,
      renderCell: params => {
        return (
            <div className="productListItem">
                {params.row.size}
            </div>
        );
    },
    valueGetter: params => params.row.size,
},
    { field: "Stock",
     headerName: "Stock",
     width: 200,
     renderCell: stock => {
        return (
            <div className="productListItem">
                {stock.row.stock}
            </div>
        );
    },
    valueGetter: stock => stock.row.stock
}
]

return(
    <Grid item container direction="row" justifyContent="space-between" alignItems="center">
                <Grid
                    item
                    container
                    justifyContent="center"
                    alignItems="center"
                    xs={4}
                    spacing={2}
                >
                    <Grid item>
                        <h3>{SelectedProduct.models}</h3>
                    </Grid>
                </Grid>
                <Grid item>
                <DataGrid
                    style={{ height: "500px", width: "550px" }}
                    rows={Stockproduct?Stockproduct:[]}
                    disableSelectionOnClick
                    columns={columns}
                    pageSize={15}
                    checkboxSelection
                />
            </Grid>
    </Grid>
)    

};

export default HandleStock;