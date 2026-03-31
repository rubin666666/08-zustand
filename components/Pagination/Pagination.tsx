"use client";

import ReactPaginate from "react-paginate";

import css from "./Pagination.module.css";

interface PaginationProps {
  pageCount: number;
  currentPage?: number;
  onPageChange?: (selectedPage: number) => void;
}

export default function Pagination({
  pageCount,
  currentPage = 0,
  onPageChange,
}: PaginationProps) {
  if (pageCount <= 1) {
    return null;
  }

  return (
    <ReactPaginate
      pageCount={pageCount}
      forcePage={currentPage}
      onPageChange={({ selected }) => onPageChange?.(selected)}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      containerClassName={css.pagination}
      activeClassName={css.active}
      pageClassName={css.pageItem}
      previousClassName={css.pageItem}
      nextClassName={css.pageItem}
      breakClassName={css.pageItem}
      disabledClassName={css.disabled}
    />
  );
}
