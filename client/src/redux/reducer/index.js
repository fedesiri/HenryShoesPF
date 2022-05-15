import {
  GET_ALL_PRODUCTS,
  GET_PRODUCT_BY_ID,
  FILTER,
  GET_ALL_BRANDS,
  POST_LOG_IN,
  ORDER_PRODUCTS,
  SET_CURRENT_PAGE,
  GET_ALL_PRODUCTS_BY_BRANDS,
  SELECT_OFERT,
  CLEAR_OFERT,
  FILTER_OFERT_DESTACADO,
  CLEAR_OFERT_DESTACADO,
  POST_LOG_OUT,
} from "../actions/types";

const intialState = {
  products: [],
  allProducts: [],
  productsByBrand: [],
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
  details: {},
  page: 1,
  brands: [],
  ofertSelect: [],
  filter: { brand: "All", gender: "filterByGender" },
  inOfertDestacado: [],
};

export default function rootReducer(state = intialState, { type, payload }) {
  switch (type) {
    case GET_ALL_PRODUCTS:
      return {
        ...state,
        products: payload,
        allProducts: payload,
        filter: { brand: "All", gender: "filterByGender" },
      };

    case GET_ALL_PRODUCTS_BY_BRANDS:
      return {
        ...state,
        productsByBrand: payload,
      };

    case GET_PRODUCT_BY_ID:
      return {
        ...state,
        details: payload,
      };

    case POST_LOG_IN:
      return {
        ...state,
        userInfo: payload,
      };
    case POST_LOG_OUT:
      return {
        ...state,
        userInfo: null,
      };

    case FILTER:
      function filterByBrand(products, brand) {
        if (brand === "All") {
          return products;
        } else {
          return products.filter((product) =>
            product.brandName.includes(brand)
          );
        }
      }

      function filterByGender(products, gender) {
        if (gender === "filterByGender") {
          return products;
        } else {
          return products.filter((product) => product.gender.includes(gender));
        }
      }
      const productsFilterByBrands = filterByBrand(
        state.allProducts,
        payload.brand
      );
      const productsFilterByGender = filterByGender(
        productsFilterByBrands,
        payload.gender
      );
      return {
        ...state,
        products: productsFilterByGender,
        filter: { brand: payload.brand, gender: payload.gender },
      };

    case ORDER_PRODUCTS:
      let ordered = state.products;
      payload === "Mayor precio" &&
        ordered.sort((a, b) => {
          return b.price - a.price;
        });
      payload === "Menor precio" &&
        ordered.sort((a, b) => {
          return a.price - b.price;
        });
      payload === "Mas recientes" &&
        ordered.sort((a, b) => {
          return b.year - a.year;
        });
      payload === "Menos recientes" &&
        ordered.sort((a, b) => {
          return a.year - b.year;
        });
      return { ...state, products: ordered };

    case GET_ALL_BRANDS:
      return {
        ...state,
        brands: payload,
      };
    case SET_CURRENT_PAGE:
      return { ...state, page: payload };

    case CLEAR_OFERT:
      return {
        ...state,
        ofertSelect: [],
      };

    case SELECT_OFERT:
      const auxState = state.allProducts;
      const infoChequear =
        payload.length <= 4 && auxState.filter((e) => e.id === Number(payload));
      const infoModels = auxState.filter(
        (e) =>
          e.model.toLocaleLowerCase().slice(0, 10) ===
          payload.trim().toLocaleLowerCase().slice(0, 10)
      );

      return {
        ...state,
        ofertSelect: infoChequear ? infoChequear : infoModels,
      };

    case FILTER_OFERT_DESTACADO:
      const auxState1 = state.allProducts;
      const filterOfert = auxState1.filter((e) => e.inOferta === true);
      const filterDestacado = auxState1.filter((e) => e.inDestacados === true);

      const filterOfertDestacado = filterOfert.concat(filterDestacado);
      const dataArr = new Set(filterOfertDestacado);
      let result = [...dataArr];

      return {
        ...state,
        inOfertDestacado: result,
      };

    case CLEAR_OFERT_DESTACADO:
      return {
        ...state,
        inOfertDestacado: [],
      };

    default:
      return { ...state };
  }
}
