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



const[newStock, setNewStock] = useState("");

useEffect(() => {
    dispatch(getProductById(id));
}, [product]);

const HandleOnChange = (e) => {
    setNewStock(e.target.value)
}

const HandleStock = async ({productId, sizeId}) => {
try{
    const response = await axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}/orders/HandleStock`,
        data: {
          productId: productId,
          sizeId: sizeId,
          stock: newStock
        },
      });

      toast(response.data.message);
}catch(err){
console.log(err)
}
}


const columns = [
    { field: "Size",
     headerName: "Size",
      width: 200 ,
      renderCell: params => {
        return (
            <div className="productListItem">
                {params.row.sizeId}
            </div>
        );
    },
    valueGetter: params => params.row.sizeId,
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
    valueGetter: params => params.row.stock
},
{ field: "editStock",
     headerName: "Edit Stock",
     width: 200,
     renderCell: params => {
        return (
            <div className="productListItem">
                <input
                    id="handleStock"
                    name="handleStock"      
                    type="number"
                    defaultValue={params.row.stock}
                    placeholder={params.row.stock}
                    onChange={(e) => HandleOnChange(e)}
                    />
                    <button type="submit" onClick={(e) => HandleStock({productId: params.row.productId, sizeId: params.row.sizeId})}>Save</button>
            </div>
        );
    },
    valueGetter: params => params.row.stock
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
                    rows={stock?stock:[]}
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