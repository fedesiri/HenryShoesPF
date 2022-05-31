import { DataGrid } from "@material-ui/data-grid";
import React, { useEffect } from "react";
import { DeleteOutline } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteDestacado,
  deletePromotion,
  filterOfertDestacado,
  getAllProducts,
} from "../../../redux/actions";

const OnSaleBestsellers = () => {
    const dispatch = useDispatch();
    const productsDestacadOfert = useSelector((state) => state.inOfertDestacado);
        
  
  useEffect(() => {
      dispatch(getAllProducts());
      setTimeout(() => {
        dispatch(filterOfertDestacado());
        }, 1000);
    }, [dispatch]);

    
    const productOfert = productsDestacadOfert?.filter(
      (e) => e.inOferta === true
    );
  
    const productDestacado = productsDestacadOfert?.filter(
      (e) => e.inDestacados === true
    );
    
    const products = [...productOfert, ...productDestacado];
    // console.log(products)

  function retornarIdPromotion(e) {
    dispatch(deletePromotion(e));
    setTimeout(() => {
      dispatch(getAllProducts());
    }, 100);
    setTimeout(() => {
        dispatch(filterOfertDestacado());
      }, 200);
  }

  function retornarIdDestacado(e) {
      // console.log(e)
    dispatch(deleteDestacado(e));
    setTimeout(() => {
      dispatch(getAllProducts());
    }, 100);
    setTimeout(() => {
        dispatch(filterOfertDestacado());
      }, 200);
  }
 

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "product",
      headerName: "Product",
      width: 350,
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
    {
      field: "inOferta",
      headerName: "on Sale",
      width: 200,
      editable: true,
      type: "boolean",
    },
    {
      field: "inDestacados",
      headerName: "Bestsellers",
      width: 200,
      editable: true,
      type: "boolean",
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        // console.log(params.row.inDestacados);
        return (
          <>
            <DeleteOutline
              className="productListDelete"
              value={params.row.id}
                onClick={(e) => params.row.inDestacados ?  retornarIdDestacado(params.row.id) : retornarIdPromotion(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div style={{ height: 400, width: "100%", margin: "20px" }}>
      <DataGrid
        rows={products}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[10]}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
  );
};

export default OnSaleBestsellers;
