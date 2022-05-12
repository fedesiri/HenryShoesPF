// export default function Filter({ products, handleOrdered, handleFilterGender, handleFilterBrands }) {
//     return (
//         <div>
//             <select onChange={handleOrdered}>
//                 <option value="">Seleccione orden</option>
//                 <option value="Mayor precio">Mayor Precio</option>
//                 <option value="Menor precio">Menor precio</option>
//                 <option value="Mas recientes">Mas recientes</option>
//                 <option value="Menos recientes">Menos recientes</option>
//             </select>

//             <select name="select" onChange={handleFilterGender}>
//                 <option value="filterByGender">Gender</option>
//                 {shoes?.map(elemento => {
//                     return (
//                         <option value={elemento.gender} key={elemento.id}>
//                             {elemento.gender}
//                         </option>
//                     );
//                 })}
//             </select>

//             <select name="select" onChange={handleFilterBrands}>
//                 <option value="filterByBrands">Brands</option>
//                 {products?.map(brand => {
//                     return (
//                         <option value={brand.brand} key={brand.id}>
//                             {brand.brand}
//                         </option>
//                     );
//                 })}
//             </select>
//         </div>
//     );
// }
