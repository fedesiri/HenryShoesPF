export const FILTER_BY_BRANDS = "FILTER_BY_BRANDS";
export const FILTER_BY_GENDER = "FILTER_BY_GENDER";

export const filterByBrands = filter => {
    return {
        type: FILTER_BY_BRANDS,
        payload: filter,
    };
};

export const filterByGender = filter => {
    return {
        type: FILTER_BY_GENDER,
        payload: filter,
    };
};
