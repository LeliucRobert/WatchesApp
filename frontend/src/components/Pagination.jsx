/** @format */

// components/Pagination.jsx
import { ChevronLeft, ChevronRight } from "lucide-react";
// import "../styles/main.css";
import "../styles/components/Pagination.css";
export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  pageNumbers,
}) {
  return (
    <div className='pagination'>
      <button
        className='pagination-prev'
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronLeft className='pagination-icon' />
        Previous
      </button>

      <div className='pagination-numbers'>
        {pageNumbers.map((number, index) =>
          number === "..." ? (
            <span key={`ellipsis-${index}`} className='pagination-ellipsis'>
              …
            </span>
          ) : (
            <button
              key={number}
              className={`pagination-number ${
                currentPage === number ? "active" : ""
              }`}
              onClick={() => onPageChange(number)}
            >
              {number}
            </button>
          )
        )}
      </div>

      <button
        className='pagination-next'
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
        <ChevronRight className='pagination-icon' />
      </button>
    </div>
  );
}
