import { FILTER_BY_BRANDS, FILTER_BY_GENDER } from "../actions";

const intialState = {
    allProducts: [],
    products: [],
};

export default function rootReducer(state = intialState, { type, payload }) {
    switch (type) {
        case FILTER_BY_BRANDS:
            let productFiltersByBrands = [...state.allProducts];
            let shoesByBrand = [];
            if (payload !== "filterByBrands") {
                for (let i = 0; i < productFiltersByBrands?.length; i++) {
                    for (let j = 0; j < productFiltersByBrands[i].results.length; j++) {
                        if (productFiltersByBrands[i].results[j].brand === payload) {
                            shoesByBrand.push(productFiltersByBrands[i]);
                        }
                    }
                }
                return {
                    ...state,
                    products: shoesByBrand,
                };
            }
            return {
                ...state,
                allProducts: allProducts,
            };
        case FILTER_BY_GENDER:
            let productFiltersByGender = [...state.allProducts];
            let shoesByGender = [];
            if (payload !== "filterByGender") {
                for (let i = 0; i < productFiltersByGender?.length; i++) {
                    for (let j = 0; j < productFiltersByGender[i].results.length; j++) {
                        if (productFiltersByGender[i].results[j].gender === payload) {
                            shoesByGender.push(productFiltersByGender[i]);
                        }
                    }
                }
                return {
                    ...state,
                    products: shoesByGender,
                };
            }
            return {
                ...state,
                allProducts: allProducts,
            };
        default:
            return {
                ...state,
            };
    }
}
