import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
// import { getAllProducts } from '../../store/actions';
import { filterByBrands } from "../../store/actions";

export default function FilterBrands() {
    let shoes = useSelector(state => state.products);

    let dispatch = useDispatch();

    useEffect(() => {
        if (!shoes.length) {
            dispatch(getAllProducts());
        }
    }, [dispatch, shoes.length]);

    function onInputChangeBrands(e) {
        e.preventDefault();
        dispatch(filterByBrands(e.target.value));
    }

    return (
        <select name="select" onChange={onInputChangeBrands}>
            <option value="filterByBrands">Brands</option>
            {shoes?.map(brand => {
                return (
                    <option value={brand.brand} key={brand.id}>
                        {brand.brand}
                    </option>
                );
            })}
        </select>
    );
}
