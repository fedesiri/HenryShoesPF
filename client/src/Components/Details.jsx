import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect} from "react";
import { Link } from 'react-router-dom';
import { getProductById } from "../redux/actions/index"




const Details = () => {

    const dispatch = useDispatch();
    const params = useParams();
    let addres = params.id;

    const detail = useSelector((state) => state.details)



    useEffect(() => {

        dispatch(getProductById(addres))




    }, [])//  eslint-disable-line react-hooks/exhaustive-deps



    function CargarCarrito() {

    }

    return (

        <>

            <Link to="/home" > Atras  </Link>
            <>
                <img src={detail.image} alt="imagen zapa " />
                <h4>{detail.name} </h4>
                <h2>${detail.price}</h2>
            </>
            <>
                <h3>Colores:</h3>
                <h2>{detail.colorway}</h2>
            </>
            <button onClick={(e) => CargarCarrito(e)} > <h4>Agregar al carrito</h4></button>


        </>



    );


}

export default Details
