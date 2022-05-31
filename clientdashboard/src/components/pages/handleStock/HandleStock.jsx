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
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    getAllProducts, getProductById,
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
const Stockproduct = useSelector((state) => state.details);
console.log(Stockproduct.sizes)

// let IDSize = []
// if (Stockproduct.sizes?.length > 0 ){
// IDSize = Stockproduct.sizes.map( (p, index) => {
//     id = index
// });
// }

useEffect(() => {
    dispatch(getProductById(id));
}, [product]);

const columns = [
    { field: "Size",
     headerName: "Size",
      width: 90 ,
      renderCell: params => {
        return (
            <div className="productListItem">
                {params.row.size}
            </div>
        );
    },
    valueGetter: params => params.row.size,
},
    { field: "Stock", headerName: "Stock", width: 90 }
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
                        <h3>{Stockproduct.models}</h3>
                    </Grid>
                </Grid>
                <Grid item>
                <DataGrid
                    style={{ height: "500px", width: "550px" }}
                    rows={Stockproduct.sizes?Stockproduct.sizes:[]}
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