import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import React, {useState, useEffect} from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import { getAllProducts, getProductById } from "../redux/actions/index"




const EditProduct = () => {

    const dispatch = useDispatch();
    const params = useParams();
    let addres = params.id;
    const detail = useSelector((state) => state.details)
console.log(detail)


    useEffect(() => {
        dispatch(getAllProducts());
        dispatch(getProductById(addres));
    }, [])//  eslint-disable-line react-hooks/exhaustive-deps


    const reduxProducts = useSelector((state) => state.products)
const genders = [];
const brands = [];

function GenderGetter(reduxProducts){
  reduxProducts?.map( product => {if(!genders.includes(product?.gender)) genders.push(product?.gender)});
  };
  GenderGetter(reduxProducts);

  function BrandGetter(reduxProducts){
    reduxProducts?.map( product => {if(!brands.includes(product.brand?.name)) brands.push(product.brand?.name)});
    };
    BrandGetter(reduxProducts);



const [error, setError] = useState({});
const [input, setInput] = useState({
  product: "",
  brandName: "",
  description: "",
  price: "",
  image: "",
  gender: "",
  year: "",
});
console.log(input)

function validate(value){ 
  let error = {};
  
  if((!/^\d+$/.test(input.price)) || (input.price < 0) || (input.year < 0)){
    error.price = "solo pueden ingresarse numeros positivos"
  }
  return error
  };

const HandleOnChange = (e) => {
  setInput(PreValue => ({
    ...PreValue,
    [e.target.name]: e.target.value 
  }));
  setError(validate({
    ...input,
     [e.target.name]: e.target.value
  }));
};

const HandleOnSubmit = (e) => {
e.preventDefault();
const form = document.getElementById("CreateForm");
try{
  axios({
    method: "put",
    url: `http://localhost:3001/details/${detail.id}`,
    data: {
      model: input.product !== ""?input.product: detail.model,
      brandName: input.brandName !== ""?input.brandName: detail.model,
      description: input.description !== ""?input.description: detail.description,
      price: input.price !== ""?input.price: detail.price,
      image: input.image !== ""?input.image: detail.image,
      gender: input.gender !== ""?input.gender: detail.gender,
      year: input.year !== ""?input.year: detail.year,
    }
    });
  alert("el producto ha sido editado con exito" )
}catch(err){
    console.log(err)
  }
  };



    return (

        <div>
            <div>
            <Link to="/" > Atras  </Link>
            </div>
    
    <div>
    <form name="CreateForm" id="CreateForm">
    
    <label>Marca: </label>
        <div>
          <select name= "brandName" onChange={HandleOnChange} placeholder={detail.brandName}>
              {brands?.map( brand => <option key={brand} value={brand}>
                  {brand}
                  </option>
                  )};
          </select>
        </div>


      <div>
        <label>Categoria: </label>
        <div>
        <select name= "gender" onChange={HandleOnChange} placeholder={detail.gender}>
              {genders?.map( gender => <option key={genders.indexOf(gender)} value={gender}>
                  {gender}
                  </option>
                  )};
          </select>
        </div>
      </div>

      <div>
        <label>Producto: </label>
        <div>
          <input type="text" name= "product"  onChange={HandleOnChange} placeholder={detail.model}/>
        </div>
      </div>

      <div>
        <div>
        <label>Precio: </label>
        </div>
        <div>
          <input name="price" min="1" type="number" onChange={HandleOnChange} placeholder={detail.price}/>
        </div>
      </div>

      <div>
        <div>
        <label>Año de Lanzamiento: </label>
        </div>
        <div>
          <input name="year" min="1" type="number" onChange={HandleOnChange} placeholder={detail.year}/>
        </div>
      </div>

      <label>Descripción: </label>
        <div>
          <input name="description" type="text"  onChange={HandleOnChange} placeholder={detail.description}/>
        </div>

      <div>
        <label>Imágen actual: </label>
        <img src={detail.image} alt="no image :("/>
      </div>
      <p>Nueva Imagen</p>
      <div>
          <input name="image" type="text"  onChange={HandleOnChange} />
      </div>
      <div>
        {error.price? <p>{error.price}</p>: null}
        {error.incomplete? <p>{error.incomplete}</p>: null}
      </div>
      
      <div>
        <button onClick={(e) => HandleOnSubmit(e)}>Confirmar</button>
      </div>
      
    </form>
    </div>
        </div>



    );


}

export default EditProduct;