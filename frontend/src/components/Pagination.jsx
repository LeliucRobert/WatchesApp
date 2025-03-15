/** @format */

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "../styles/main.css";
export default function Pagination() {
  return (
    <div className='pagination'>
      <button className='pagination-prev'>
        <ChevronLeft className='pagination-icon' />
        Previous
      </button>

      <div className='pagination-numbers'>
        <button className='pagination-number active'>1</button>
        <button className='pagination-number'>2</button>
        <button className='pagination-number'>3</button>
        <span className='pagination-ellipsis'>...</span>
        <button className='pagination-number'>67</button>
        <button className='pagination-number'>68</button>
      </div>

      <button className='pagination-next'>
        Next
        <ChevronRight className='pagination-icon' />
      </button>
    </div>
  );
}
