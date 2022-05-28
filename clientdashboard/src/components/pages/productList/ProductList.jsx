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
import {
    getAllProducts,
    sendOfertToBack,
    clearOfertSelect,
} from "../../../redux/actions";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { Button, Grid } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import VerOferta from "./VerOferta";

export default function ProductList() {
    const dispatch = useDispatch();
    const products = useSelector(state => state.allProducts);

    //esta parte pertenece a ofert y bestsellers
    const [showVerOferta, setShowVerOferta] = useState(false);
    // const onOfert = useSelector(state => state.ofertSelect);
    // const resBack = useSelector(state => state.res_back_productOferts);
    // const [chequeo, setChequeo] = useState(false);

    const [validarProducts, setValidarProducts] = useState({
        id_oferta: [],
        id_destacado: [],
        porcentaje: [],
    });

    useEffect(() => {
        dispatch(getAllProducts());
    }, [dispatch]);

    // useEffect(() => {
    //     setTimeout(() => {
    //         dispatch(filterOfertDestacado());
    //         setChequeo(!chequeo);
    //     }, 3000);
    // }, [resBack]);

    // function filterProducts(e) {
    //   e.preventDefault();
    //   dispatch(selectOfert(input));
    //   setInput("");
    //   setValidarProducts({ id_oferta: [], id_destacado: [], porcentaje: [] });
    // }

    function handleValidarProductsPromotion(e) {
        var str = String(e.target.value);
        if (validarProducts.id_oferta.includes(str)) {
            setValidarProducts({
                ...validarProducts,
                id_oferta: validarProducts.id_oferta.filter(e => e !== str),
            });
        }
        if (!validarProducts.id_oferta.includes(e.target.value)) {
            setValidarProducts({
                ...validarProducts,
                id_oferta: validarProducts.id_oferta.concat(e.target.value),
            });
        }
    }

    function handleValidarProductsDestacados(e) {
        var str = String(e.target.value);
        if (validarProducts.id_destacado.includes(str)) {
            setValidarProducts({
                ...validarProducts,
                id_destacado: validarProducts.id_destacado.filter(e => e !== str),
            });
        }
        if (!validarProducts.id_destacado.includes(e.target.value)) {
            setValidarProducts({
                ...validarProducts,
                id_destacado: validarProducts.id_destacado.concat(e.target.value),
            });
        }
    }
    function handlePorcentaje(e) {
        var str = e.target.value;
        setValidarProducts({
            ...validarProducts,
            porcentaje: str,
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (
            validarProducts.id_oferta.length !== 0 &&
            validarProducts.porcentaje.length === 0 &&
            validarProducts.id_destacado.length !== 0
        ) {
            alert("complete una categoria");
        } else {
            if (
                validarProducts.id_destacado.length !== 0 ||
                (validarProducts.id_oferta.length !== 0 && validarProducts.porcentaje.length !== 0)
            ) {
                dispatch(sendOfertToBack(validarProducts));
                setValidarProducts({ id_oferta: [], id_destacado: [], porcentaje: [] });

                dispatch(clearOfertSelect());
            } else {
                alert("complet to category");
            }
        }
    }

    //   const handleDelete = (id) => {
    //     setData(data.filter((item) => item.id !== id));
    //   };

    const columns = [
        { field: "id", headerName: "ID", width: 90 },
        {
            field: "product",
            headerName: "Product",
            width: 200,
            renderCell: params => {
                return (
                    <div className="productListItem">
                        <img className="productListImg" src={params.row.image} alt="" />
                        {params.row.model}
                    </div>
                );
            },
            valueGetter: params => params.row.model,
        },
        {
            field: "onsale",
            headerName: "On sale",
            width: 140,
            renderCell: params => {
                return (
                    <div className="productListItem">
                        <input
                            type="checkbox"
                            onChange={handleValidarProductsPromotion}
                            value={params.row.id}
                            checked={validarProducts.id_oferta.includes("" + params.row.id)}
                        />
                    </div>
                );
            },
        },
        {
            field: "betsellers",
            headerName: "Bet Sellers",
            width: 140,
            renderCell: params => {
                return (
                    <div className="productListItem">
                        <input
                            type="checkbox"
                            onChange={handleValidarProductsDestacados}
                            value={params.row.id}
                            checked={validarProducts.id_destacado.includes("" + params.row.id)}
                        />
                    </div>
                );
            },
        },
        // { field: "stock", headerName: "Stock", width: 140 },
        // {
        //   field: "status",
        //   headerName: "Status",
        //   width: 120,
        // },
        {
            field: "price",
            headerName: "Price",
            width: 150,
        },
        {
            field: "action",
            headerName: "Action",
            width: 150,
            renderCell: params => {
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
        <Grid
            container
            direction="column"
            justifyContent="flex-start"
            alignItems="center"
            spacing={3}
        >
            <Grid item container direction="row" justifyContent="space-between" alignItems="center">
                <Grid
                    item
                    container
                    justifyContent="flex-start"
                    alignItems="center"
                    xs={4}
                    spacing={2}
                >
                    <Grid item>
                        <h1>Products</h1>
                    </Grid>
                    <Grid item>
                        <Button
                            variant="contained"
                            color="secondary"
                            style={{ display: `${arrayIds.length > 1 ? "" : "none"}` }}
                            startIcon={<DeleteIcon />}
                            onClick={handleDeleteAll}
                        >
                            Delete selected
                        </Button>
                    </Grid>
                </Grid>

                <Grid item xs={4}>
                    <Button > View Oferts and Best Sellers </Button>
                </Grid>

                <Grid
                    item
                    container
                    justifyContent="flex-end"
                    alignItems="center"
                    xs={4}
                    spacing={2}
                >
                    <Grid item>
                        {validarProducts.id_oferta.length !== 0 && (
                            <select
                                defaultValue="default"
                                className="selectOfert"
                                onChange={e => handlePorcentaje(e)}
                            >
                                <option> Percent %: </option>
                                <option value="10"> 10% </option>
                                <option value="20"> 20% </option>
                                <option value="30"> 30% </option>
                                <option value="40"> 40% </option>
                                <option value="50"> 50% </option>
                            </select>
                        )}
                    </Grid>
                    <Grid item>
                        <Button onClick={handleSubmit}> Confirm</Button>
                    </Grid>
                </Grid>
            </Grid>

            <Grid item>
                <DataGrid
                    style={{ height: "520px", width: "945px" }}
                    rows={products}
                    disableSelectionOnClick
                    columns={columns}
                    pageSize={25}
                    checkboxSelection
                    onSelectionModelChange={ids => setArrayIds(ids)}
                    components={{
                        Toolbar: CustomToolbar,
                    }}
                />
            </Grid>
            <Grid item >
              <VerOferta/>
            </Grid>
            <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                draggable
            />
        </Grid>
    );
}
