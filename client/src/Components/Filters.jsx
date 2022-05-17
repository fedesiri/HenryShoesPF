import { useSelector } from "react-redux";
import { FilterDiv } from "../styles/Filters";

export default function Filter({ allProducts, handleOrdered, handleFilter }) {
  const brand = useSelector((state) => state.filter.brand);
  const gender = useSelector((state) => state.filter.gender);

  function handleSelectChange(e) {
    e.preventDefault();
    if (e.target.name === "selectBrand") {
      handleFilter({ brand: e.target.value, gender: gender });
    }
    if (e.target.name === "selectGender") {
      handleFilter({ brand: brand, gender: e.target.value });
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

  return (
    <FilterDiv>
        <select onChange={handleOrdered}>
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
    </FilterDiv>
);
}
