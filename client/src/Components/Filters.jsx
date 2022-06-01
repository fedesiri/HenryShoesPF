import { useSelector } from "react-redux";
import { FilterDiv } from "../styles/Filters";

export default function Filter({ allProducts, handleOrdered, handleFilter }) {
  const {brand, gender, order, category} = useSelector((state) => state.filter);
  
  

  function handleSelectChange(e) {
    e.preventDefault();
    if (e.target.name === "selectBrand") {
      handleFilter({ brand: e.target.value, gender: gender, category: category });
    }
    if (e.target.name === "selectGender") {
      handleFilter({ brand: brand, gender: e.target.value, category: category });
    }
    if(e.target.name === "selectCategory"){
      handleFilter({ brand: brand, gender: gender, category: e.target.value})
    }
  }

  let brands = [];
  function allUniqueProducts(allProducts) {
    allProducts?.forEach((product) => { 
      if (!brands.includes(product?.brandName)) brands.push(product?.brandName);
    });
  }
  allUniqueProducts(allProducts);

  const genders = [];
  function allGenders(allProducts) {
    allProducts?.forEach((product) => {
      if (!genders.includes(product.gender)) genders.push(product.gender);
    });
  }
  allGenders(allProducts);

  const categories = [];
  function allCategories(allProducts) {
    allProducts?.forEach((product) => {
        if (product.CategName && !categories.includes(product.CategName)) categories.push(product.CategName);
    });
  }
  allCategories(allProducts);

  console.log(categories, 'soy categories')

  return (
    <FilterDiv>
        <select value={order} onChange={handleOrdered}>
            <option value="">Order Select</option>
            <option value="Mayor precio">Higher Price</option>
            <option value="Menor precio">Lower Price</option>
            <option value="Mas recientes">More recent</option>
            <option value="Menos recientes">Least recent</option>
        </select>
        <select value={brand} name="selectBrand" onChange={handleSelectChange}>
            <option value="All">All brands</option>
            {brands?.map((product, index) => (
                <option key={index} value={product}>
                    {product}
                </option>
            ))}
        </select>
        <select value={gender} name="selectGender" onChange={handleSelectChange}>
            <option value="filterByGender">All genders</option>
            {genders?.map((product, index) => (
                <option key={index} value={product}>
                    {product}
                </option>
            ))}
        </select>
        
          {categories.length ? (
            <select value={category} name="selectCategory" onChange={handleSelectChange}> 
            <option value="filterByCategory">Categories</option>
            {categories?.map((product, index) => (
              <option key={index} value={product}>
                {product}
              </option>
            ) )}
      </select>
          ) : null }
        
    </FilterDiv>
);
}
