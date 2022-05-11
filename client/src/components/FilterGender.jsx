import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
// import { getAllTypes } from '../../store/actions';
import { filterByGender } from "../../store/actions";

export default function FilterGender() {
    let shoes = useSelector(state => state.products);

    let dispatch = useDispatch();

    useEffect(() => {
        if (!shoes.length) {
            dispatch(getAllProducts());
        }
    }, [dispatch, shoes.length]);

    function onInputChangeBrands(e) {
        e.preventDefault();
        dispatch(filterByGender(e.target.value));
    }

    return (
        <select name="select" onChange={onInputChangeBrands}>
            <option value="filterByGender">Gender</option>
            {shoes?.map(elemento => {
                return (
                    <option value={elemento.gender} key={elemento.id}>
                        {elemento.gender}
                    </option>
                );
            })}
        </select>
    );
}
