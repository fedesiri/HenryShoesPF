import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentPage } from "../redux/actions/index.js";
import { PrevNext, ContPag, ContainerPage, LstPageBtn, FstPageBtn, BckBtn, NextBtn } from "../styles/Paged.js";

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
            <PrevNext>
                <ContPag>
                    <FstPageBtn onClick={() => changePage(1)} disabled={page === 1}>FIRST</FstPageBtn>
                    <BckBtn onClick={() => changePage(page - 1)} disabled={page === 1}>BACK</BckBtn>
                    <span>
                        Page {page} from {pageProducts.length}
                    </span>
                    <NextBtn onClick={() => changePage(page + 1)} disabled={page >= pageProducts.length}>NEXT</NextBtn>
                    <LstPageBtn onClick={() => changePage(pageProducts.length)} disabled={page >= pageProducts.length}>LAST</LstPageBtn>
                </ContPag>
            </PrevNext>
        )}
        {/* <ContainerPage>
            {pageProducts?.map((page) =>(
                <span onClick={() => changePage(page)} key={page}>
                    {page}
                </span>
            ))}
        </ContainerPage> */}
    </div>
);
}
