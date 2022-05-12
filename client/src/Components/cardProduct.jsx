import { Link } from "react-router-dom";


export default function CardProduct ({ id, brand, model, image, descripcion }){
    return (
        <div>
            <Link to={`/home/detailProduct/${id}`}>
                <img src={image} alt="image" />
                <div>
                    <h2>{model}</h2>
                    <h2>{brand}</h2>
                    <p>
                        <span>Descripcion</span>:{descripcion} <br/>
                    </p>
                </div>
            </Link>
        </div>
    );
}
