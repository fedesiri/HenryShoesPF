import "./productList.css";
import { DataGrid } from "@material-ui/data-grid";
import { CollectionsOutlined, DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../../redux/actions";
import SquareFootIcon from "@material-ui/icons/SquareFoot";

export default function ProductList() {
  //   const [data, setData] = useState(productRows); YA LO TENEMOS EN EL REDUX
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
        // console.log(params)
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.image} alt="" />
            {params.row.model}
          </div>
        );
      },
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
    // {
    //   field: "sizes",
    //   headerName: "Sizes",
    //   width: 160,
    //   renderCell: (params) => {
    //     return (
    //       <div className="productListItem">
    //         <SquareFootIcon onClick={openSize} />
    //       </div>
    //     );
    //   },
    // },
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

  return (
    <>
      <div className="productList">
        <DataGrid
          rows={products}
          disableSelectionOnClick
          columns={columns}
          pageSize={20}
          checkboxSelection
        />
      </div>
      
    </>
  );
}
