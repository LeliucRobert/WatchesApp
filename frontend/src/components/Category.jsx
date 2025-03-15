/** @format */

import React from "react";
import Image from "next/image";
import Link from "next/link";
import "../styles/components/Category.css";
export default function Category() {
  return (
    <div className='category-card'>
      <div className='category-image-container'>
        <Image
          src='/placeholder.svg?height=80&width=80'
          alt='Men Watch'
          width={80}
          height={80}
          className='category-image'
        />
      </div>
      <h3 className='category-title'>Men Watches</h3>
      <p className='category-description'>Explore latest styles for men</p>
    </div>
  );
}
