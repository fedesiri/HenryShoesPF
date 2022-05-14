export default function Filter({
    allProducts,
    handleOrdered,
    handleFilterGender,
    handleFilterBrands,
  }) {
    let brands = [];
    // console.log(allProducts);
    // console.log(allProducts[0].brandName)
    // const allBrands = useSelector((state) => state.products);
    // const brandName = Array.from(new Set(allBrands.map(brand => brand.brandName)));
    // console.log(brandName)
  
  //   console.log("soy all products", allProducts);
    function allUniqueProducts(allProducts) {
      // console.log("soy all products", allProducts);
      allProducts?.map((product) => {
        if (!brands.includes(product?.brandName)) brands.push(product?.brandName);
      });
    }
    allUniqueProducts(allProducts);
  //   console.log(brands);
  
    const genders = [];
    function allGenders (allProducts) {
        allProducts?.map(product=> {if(!genders.includes(product.gender)) genders.push(product.gender)});
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
          <option value="All">All genders</option>
          {genders?.map((product, index) => (
            <option key={index} value={product}>
              {product}
            </option>
          ))}
        </select>
  
  
        {/* <select onChange={handleFilterGender}>
          <option value="filterByGender">All genders</option>
          <option value="infant">Infant</option>
          <option value="child">Child</option>
          <option value="unisex">Unisex</option>
          <option value="man">Man</option>
          <option value="women">Women</option>
        </select> */}
      </div>
    );
  }
  //function BreedGetter(dogsRedux){
  //dogsRedux?.map( dog => {if(!BreedGroups.includes(dog.breedGroup)) BreedGroups.push(dog.breedGroup)});
  //console.log(BreedGroups)
  //};
  //BreedGetter(dogsRedux);
  