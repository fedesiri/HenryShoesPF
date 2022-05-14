import { useSelector } from "react-redux";

export default function Filter({ allProducts, handleOrdered, handleFilter }) {
    const brand = useSelector(state => state.filter.brand);
    const gender = useSelector(state => state.filter.gender);

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
        allProducts?.map(product => {
            if (!brands.includes(product?.brandName)) brands.push(product?.brandName);
        });
    }
    allUniqueProducts(allProducts);

    const genders = [];
    function allGenders(allProducts) {
        allProducts?.map(product => {
            if (!genders.includes(product.gender)) genders.push(product.gender);
        });
    }
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
        </div>
    );
}
