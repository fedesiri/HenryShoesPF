import { Link } from "react-router-dom";

export default function CardProduct({ id, model, description, price, image }) {
  return (
    <div>
      <Link to={`/details/${id}`}>
        <img src={image} alt="" height="200px" />
        <div>
          <h2>{model}</h2>
          <p>
            <span>price</span>:$ {price} <br />
          </p>
          <p>
            <span>Descripcion</span>: {description} <br />
          </p>
        </div>
      </Link>
    </div>
  );
}
