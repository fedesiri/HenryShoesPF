export default function Filter({ allProducts, handleOrdered, handleFilterGender, handleFilterBrands, products }) {
     
    let brands = [];
    function allUniqueProducts (products) {
        allProducts?.map(product=> {if(!brands.includes(product.brand?.name)) brands.push(product.brand?.name)});
        
    }
    allUniqueProducts(allProducts);
    console.log(brands)

    const genders = [];
    function allGenders (allProducts) {
        allProducts?.map(product=> {if(!genders.includes(product?.gender)) genders.push(product?.gender)});    
    };
    allGenders(allProducts);

    return (
        <div>
            <select onChange={handleOrdered}>
                <option value="">Seleccione orden</option>
                <option value="Mayor precio">Mayor Precio</option>
                <option value="Menor precio">Menor precio</option>
                <option value="Mas recientes">Mas recientes</option>
                <option value="Menos recientes">Menos recientes</option>
            </select>
            <select onChange={handleFilterBrands}>
                <option value="All">All brands</option>
                
                {brands?.map((product, index) => (
                <option key={index} value={product}>
                    {product}
                </option>
                    ))}
            </select>
            <select onChange={handleFilterGender}>
                    <option value="filterByGender">All genders</option>
                    {genders?.map((product, index) => (
                <option key={index} value={product}>
                    {product}
                </option>
                    ))};
            </select>
        </div>
    );
}
//function BreedGetter(dogsRedux){
//dogsRedux?.map( dog => {if(!BreedGroups.includes(dog.breedGroup)) BreedGroups.push(dog.breedGroup)});
//console.log(BreedGroups)
//};
//BreedGetter(dogsRedux);