import React,{useState, useEffect } from 'react';
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getAllBrands, getAllProducts } from '../redux/actions';



const CreateProduct = () => {

const dispatch = useDispatch();    
useEffect(() => {
    dispatch(getAllProducts());
}, []);

const reduxProducts = useSelector((state) => state.products)
const genders = [];
const brands = [];

function GenderGetter(reduxProducts){
  reduxProducts?.map( product => {if(!genders.includes(product.gender)) genders.push(product.gender)});
  console.log(genders)
  };
  GenderGetter(reduxProducts);

  function BrandGetter(reduxProducts){
    reduxProducts?.map( product => {if(!brands.includes(product.brand.name)) brands.push(product.brand.name)});
    console.log(brands)
    };
    BrandGetter(reduxProducts);

//const [error, setError] = useState({});
const [input, setInput] = useState({
  product: "",
  brand: "",
  description: "",
  price: "",
  image: "",
  gender: "",
});
console.log(input)

const HandleOnChange = (e) => {
  setInput(PreValue => ({
    ...PreValue,
    [e.target.name]: e.target.value 
  }));
};

const HandleOnSubmit = (e) => {
e.preventDefault();
const form = document.getElementById("CreateForm");
  axios({
    method: "post",
    url: 'http://localhost:3001/create',
    data: {
      product: input.product,
      brand: input.brand,
      description: input.description,
      price: input.price,
      image: input.image,
      gender: input.gender,
    }
  });
  form.reset();
  setInput({
    product: "",
    brand: "",
    description: "",
    price: "",
    image: "",
    gender: "",
  })
}

return (
        <div>
           <div>

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
                <input name="price" min="1"  onChange={HandleOnChange} />
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
              <button onClick={(e) => HandleOnSubmit(e)}>Create</button>
            </div>
          </form>
        </div>
      );
    
    };
    
export default CreateProduct;