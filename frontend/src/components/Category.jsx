/** @format */

import React from "react";
import Image from "next/image";
import Link from "next/link";
import "../styles/components/Category.css";
export default function Category({ Name, Description, ImageURL }) {
  return (
    <div className='category-card'>
      <div className='category-image-container'>
        <Image
          src={ImageURL || "/placeholder.svg?height=80&width=80"}
          alt={Name || "Watch Category"}
          width={80}
          height={80}
          className='category-image'
        />
      </div>
      <h3 className='category-title'>{Name || "Category Name"}</h3>
      <p className='category-description'>
        {Description || "Explore our latest collection"}
      </p>
    </div>
  );
}
