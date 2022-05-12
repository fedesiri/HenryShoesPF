import React,{useState} from 'react'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux"
import { getAllBrands, getAllProducts } from '../redux/actions';


const CreateProduct = () => {

const dispatch = useDispatch();    
useEffect(() => {
    dispatch(getAllBrands());
}, []);
    
    return (
        // <div className>
           <div>
             <NavBar/>
           </div>
    
        //   <form name="CreateForm" id="CreateForm">
    
        //   <label>Marca: </label>
        //       <div>
        //         <select name= "brand" onChange={HandleBrand}>
        //             {temperRedux?.map( temper => <option key={temper.id} value={temper.name}>
        //                 {temper.name}
        //                 </option>
        //                 )};
        //         </select>
        //         </div>

    
        //     <div>
        //       <label>Categoria: </label>
        //       <div>
        //       <select name= "gender" onChange={HandleBreedGroup}>
        //             {BreedGroups?.map( breed => <option key={BreedGroups.indexOf(breed)} value={breed}>
        //                 {breed}
        //                 </option>
        //                 )};
        //         </select>
        //       </div>
        //     </div>
    
        //     <div>
        //       <label>Modelo: </label>
        //       <div>
        //         <input type="text" name= "model"  onChange={HandleOnChange} />
        //       </div>
        //     </div>
    
        //     <div>
        //       <div>
        //       <label>Precio: </label>
        //       </div>
        //       <div>
        //         <input name="Price" min="1"  onChange={HandleOnChange} />
        //       </div>
        //     </div>
    
        //     <label>Altura mínima: </label>
        //       <div>
        //         <input name="minHeight" min="1"  onChange={HandleOnChange} />
        //       </div>
        //     <div>
    
        //     <div>
        //       <label>Peso Máximo: </label>
        //     </div>
        //     <div>
        //         <input name="maxWeight" min="1"  onChange={HandleOnChange} />
        //     </div>
    
        //     <label>Peso mínimo: </label>
        //     <div>
        //         <input name="minWeight" min="1"  onChange={HandleOnChange} />
        //     </div>
        //     </div>
    
        //     <div>
        //       <label>Años de vida: </label>
        //       <div>
        //         <input type="number" name= "life_span" min="1"  onChange={HandleOnChange} />
        //       </div>
        //       </div>
    


        //     <div>
        //       <button onClick={(e) => HandleOnSubmit(e)}>Create</button>
        //     </div>
        //   </form>
        // </div>
      );
    
    };
    
export default CreateProduct;