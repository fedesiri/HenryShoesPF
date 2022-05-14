import React,{useState, useEffect } from 'react';
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getAllBrands, getAllProducts } from '../redux/actions';
import { Link } from "react-router-dom";


const CreateProduct = () => {

const dispatch = useDispatch();    
useEffect(() => {
    dispatch(getAllProducts());
}, []);

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
  brand: "",
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
  else if( !input.product || !input.price || !input.brand || !input.gender || !input.description || !input.image ){
    error.incomplete = "Hay campos incompletos";
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
if(input.product.length > 0)
try{
  axios({
    method: "post",
    url: "http://localhost:3001/create",
    data: {
      model: input.product,
      brand: input.brand,
      description: input.description,
      price: input.price,
      image: input.image,
      gender: input.gender,
      year: input.year,
    }
    });
  alert("el producto ha sido creado" )
  form.reset();
  setInput({
    product: "",
    brand: "",
    description: "",
    price: "",
    image: "",
    gender: "",
    year: "",
  })
}catch(err){
  console.log(err)
}
}

return (
        <div>
           <div>
              <Link to="/">
              Volver
              </Link>
           </div>
    
          <form name="CreateForm" id="CreateForm">
    
          <label>Marca: </label>
              <div>
                <select name= "brand" onChange={HandleOnChange}>
                    {brands?.map( brand => <option key={brand} value={brand}>
                        {brand}
                        </option>
                        )};
                </select>
              </div>

    
            <div>
              <label>Categoria: </label>
              <div>
              <select name= "gender" onChange={HandleOnChange}>
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
                <input type="text" name= "product"  onChange={HandleOnChange} />
              </div>
            </div>
    
            <div>
              <div>
              <label>Precio: </label>
              </div>
              <div>
                <input name="price" min="1" type="number" onChange={HandleOnChange} />
              </div>
            </div>

            <div>
              <div>
              <label>Año de Lanzamiento: </label>
              </div>
              <div>
                <input name="year" min="1" type="number" onChange={HandleOnChange} />
              </div>
            </div>
    
            <label>Descripción: </label>
              <div>
                <input name="description" type="text"  onChange={HandleOnChange} />
              </div>
    
            <div>
              <label>Imágen: </label>
            </div>
            <div>
                <input name="image" type="text"  onChange={HandleOnChange} />
            </div>
            <div>
              {error.price? <p>{error.price}</p>: null}
              {error.incomplete? <p>{error.incomplete}</p>: null}
            </div>
            {!error.incomplete && !error.price &&
            <div>
              <button onClick={(e) => HandleOnSubmit(e)}>Create</button>
            </div>
            }
          </form>
        </div>
      );
    
    };
    
export default CreateProduct;