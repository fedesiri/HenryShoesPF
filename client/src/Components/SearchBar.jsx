import { useState } from "react";
import { useDispatch } from "react-redux";
import { getAllProducts } from "../redux/actions";

export default function SearchBar() {
    const [search, setSearch] = useState("");
    const dispatch = useDispatch();

    const handleOnChange = e => {
        e.preventDefault();
        setSearch(e.target.value);
    };

    const handleOnClick = e => {
        e.preventDefault();

        if (!search) {
            alert("Insert shoes name");
        } else {
            dispatch(getAllProducts(search));
            setSearch("");
        }
    };

    return (
        <div>
            <form onSubmit={handleOnClick}>
                <input className={s.inputBuscar} type="submit" value="Search" />
                <input
                    type="text"
                    placeholder="Shoes..."
                    onChange={handleOnChange}
                    value={search}
                />
            </form>
        </div>
    );
}
