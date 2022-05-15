import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentPage } from "../redux/actions/index.js";

export default function Paged({ productsPerPage }) {
  const dispatch = useDispatch();
  const { products, page } = useSelector((state) => state);

  const pageProducts = [];

  const changePage = (pageNumber) => {
    dispatch(setCurrentPage(pageNumber));
  };

  for (let i = 1; i < Math.trunc(products.length / productsPerPage + 2); i++) {
    pageProducts.push(i);
  }

  return (
    <div>
      {pageProducts.length > 0 && (
        <div>
          <div>
            <button onClick={() => changePage(1)} disabled={page === 1}>
              FIRST
            </button>
            <button onClick={() => changePage(page - 1)} disabled={page === 1}>
              BACK
            </button>
            <span>
              Pagina {page} de {pageProducts.length}
            </span>
            <button
              onClick={() => changePage(page + 1)}
              disabled={page >= pageProducts.length}
            >
              NEXT
            </button>
            <button
              onClick={() => changePage(pageProducts.length)}
              disabled={page >= pageProducts.length}
            >
              LAST
            </button>
          </div>
        </div>
      )}
      {/* <div>
                {pageProducts?.map((page) =>(
                    <span onClick={() => changePage(page)} key={page}>
                        {page}
                    </span>
                ))}
            </div> */}
    </div>
  );
}
