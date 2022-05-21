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
  DELETE_DESTACADO_PRODUCTS,
  DELETE_PROMOTION_PRODUCTS,
  POST_LOG_OUT,
  CLEAR_DETAIL,
  POST_REGISTER,
  ADD_SHOPPING_CART,
  REMOVE_SHOPPING_CART,
  REMOVE_ONE_PRODUCT_CART,
  ADD_ONE_PRODUCT_CART,
  COMBINE_STATE_CART,
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
  inOfertAux: [],
  inBestSellerAux: [],
  shoppingCart: [],
  shoppingCartUserRegister: [],
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
          return products.filter(
            (product) => product.brandName && product.brandName.includes(brand)
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
        inOfertAux: filterOfert,
        inBestSellerAux: filterDestacado,
      };

    case CLEAR_OFERT_DESTACADO:
      return {
        ...state,
        inOfertDestacado: [],
      };

    case DELETE_DESTACADO_PRODUCTS:
      return {
        ...state,
        postMsj: payload,
      };

    case DELETE_PROMOTION_PRODUCTS:
      return {
        ...state,
        postMsj: payload,
      };

    case CLEAR_DETAIL:
      return {
        ...state,
        details: {},
      };

    case POST_REGISTER:
      return {
        ...state,
        userInfo: payload,
      };

    case ADD_SHOPPING_CART:
      // userInfo -  shoppingCartUserRegister
      // userInfo &&  
      if (!state.userInfo) {
        let auxCartState = state.shoppingCart;
        console.log(auxCartState, "carritoInvidatado")
        let newItem = payload;
        let itemInCart = state.shoppingCart.find(
          (item) => item.model === newItem.model && item.sizes === newItem.sizes
        );

        return itemInCart
          ? {
            ...state,
            shoppingCart: auxCartState.map((item) =>
              item.model === newItem.model && item.sizes === newItem.sizes
                ? {
                  ...item,
                  allitems: Number(item.allitems) + Number(newItem.allitems),
                }
                : item
            ),
          }
          : {
            ...state,
            shoppingCart: [...state.shoppingCart].concat(newItem),
          };
      } else {
        // let auxCartState5 = state.shoppingCart;
        let auxCartState = state.shoppingCartUserRegister;
        let newItem = payload;
        let itemInCart = state.shoppingCartUserRegister.find(
          (item) => item.model === newItem.model && item.sizes === newItem.sizes
        );
        console.log(state.shoppingCartUserRegister)

        return itemInCart
          ? {
            ...state,
            shoppingCartUserRegister: auxCartState.map((item) =>
              item.model === newItem.model && item.sizes === newItem.sizes
                ? {
                  ...item,
                  allitems: Number(item.allitems) + Number(newItem.allitems),
                }
                : item
            ),
          }
          : {
            ...state,
            shoppingCartUserRegister: ([...state.shoppingCartUserRegister].concat(newItem)),
          };

      }

    case REMOVE_SHOPPING_CART:

      if (!state.userInfo) {
        let firstFilter = state.shoppingCart.filter(
          (item) => item.id !== payload.id
        );
        let secondFilter = state.shoppingCart.filter(
          (item) => (item.id === payload.id && item.sizes !== payload.sizes)
        );

        return {
          ...state,
          shoppingCart: firstFilter.concat(secondFilter)
        };
      } else {
        let firstFilter = state.shoppingCartUserRegister.filter(
          (item) => item.id !== payload.id
        );
        let secondFilter = state.shoppingCartUserRegister.filter(
          (item) => (item.id === payload.id && item.sizes !== payload.sizes)
        );

        return {
          ...state,
          shoppingCartUserRegister: firstFilter.concat(secondFilter)
        };
      }


    case REMOVE_ONE_PRODUCT_CART: {
      // console.log("elemento a remover", payload);
      if (!state.userInfo) {
        let itemToDelete = state.shoppingCart.find((item) => item.id === payload.id
          && item.sizes === payload.sizes
        );

        let firstFilter1 = state.shoppingCart.filter(
          (item) => item.id !== payload.id
        );
        let secondFilter1 = state.shoppingCart.filter(
          (item) => (item.id === payload.id && item.sizes !== payload.sizes)
        );


        return itemToDelete.allitems > 1
          ? {
            ...state,
            shoppingCart: state.shoppingCart.map((item) =>
              item.id === payload.id && item.sizes === payload.sizes
                ? { ...item, allitems: item.allitems - 1 }
                : item
            ),
          }
          : {
            ...state,
            shoppingCart: firstFilter1.concat(secondFilter1),
          };
      } else {
        let itemToDelete = state.shoppingCartUserRegister.find((item) => item.id === payload.id
          && item.sizes === payload.sizes
        );

        let firstFilter1 = state.shoppingCartUserRegister.filter(
          (item) => item.id !== payload.id
        );
        let secondFilter1 = state.shoppingCartUserRegister.filter(
          (item) => (item.id === payload.id && item.sizes !== payload.sizes)
        );


        return itemToDelete.allitems > 1
          ? {
            ...state,
            shoppingCartUserRegister: state.shoppingCartUserRegister.map((item) =>
              item.id === payload.id && item.sizes === payload.sizes
                ? { ...item, allitems: item.allitems - 1 }
                : item
            ),
          }
          : {
            ...state,
            shoppingCartUserRegister: firstFilter1.concat(secondFilter1),
          };
      }
    }


    case ADD_ONE_PRODUCT_CART: {
      if (!state.userInfo) {
        let auxCartState2 = state.shoppingCart;
        let newItem2 = payload;
        // console.log(newItem2)
        let itemInCart2 = state.shoppingCart.find(
          (item) => item.id === newItem2.id && item.sizes === newItem2.sizes
        );

        return itemInCart2
          && {
          ...state,
          shoppingCart: auxCartState2.map((item) =>
            item.id === newItem2.id && item.sizes === newItem2.sizes
              ? {
                ...item,
                allitems: Number(item.allitems) + 1,
              }
              : item
          ),
        }
      } else {

        let auxCartState2 = state.shoppingCartUserRegister;
        let newItem2 = payload;
        // console.log(newItem2)
        let itemInCart2 = state.shoppingCartUserRegister.find(
          (item) => item.id === newItem2.id && item.sizes === newItem2.sizes
        );

        return itemInCart2
          && {
          ...state,
          shoppingCartUserRegister: auxCartState2.map((item) =>
            item.id === newItem2.id && item.sizes === newItem2.sizes
              ? {
                ...item,
                allitems: Number(item.allitems) + 1,
              }
              : item
          ),
        }
      }
    }

    case COMBINE_STATE_CART:
      if (state.userInfo) {
        return {
          ...state,
          shoppingCartUserRegister: state.shoppingCartUserRegister.concat(state.shoppingCart),
          shoppingCart: []
        }
      }

    default:
      return { ...state };
  }
}
