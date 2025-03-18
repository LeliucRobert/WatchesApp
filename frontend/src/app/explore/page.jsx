/** @format */
"use client";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  ChevronDown,
  Heart,
  ShoppingCart,
  ArrowRight,
  Cat,
} from "lucide-react";
import "../../styles/explore.css";
import Footer from "@/components/Footer";
import Pagination from "@/components/Pagination";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Check } from "lucide-react";
import Category from "@/components/Category";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
export default function Home() {
  // Price filter state
  // Price filter state
  const [selectedPrice, setSelectedPrice] = useState("All Prices");

  // Sort filter state
  const [selectedSort, setSelectedSort] = useState("Featured");
  return (
    // <div className='container'>
    // {/* Header */}

    <div className='main'>
      {/* Sell your watch section */}
      <section className='sell-section'>
        <div className='sell-content'>
          <h1 className='sell-title'>Sell your watch now!</h1>
          <p className='sell-description'>Put your watch up for sale now</p>
          {/* <button className='button'>Button</button>
           */}
          <Link href='/addEntity'>
            <Button variant='outline' className='button'>
              Sell your watch
            </Button>
          </Link>
        </div>
      </section>

      {/* Browse watches section */}
      <section className='browse-section'>
        <h2 className='section-title'>Browse watches</h2>

        <div className='category-grid'>
          {/* Men Watches */}
          <Category />
          {/* Women Watches 1 */}
          <Category />

          {/* Women Watches 2 */}
          <Category />

          {/* Women Watches 3 */}
          <Category />
        </div>
      </section>

      {/* Featured section */}
      <section className='featured-section'>
        <h2 className='section-title'>Featured</h2>

        {/* Filters */}
        <div className='filters'>
          <div className='search-container'>
            <input
              type='text'
              placeholder='Search in site'
              className='search-input'
            />
            <Search className='search-icon' />
          </div>

          <div className='filter-controls'>
            {/* Price Filter Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className='dropdown-button' variant='outline'>
                  <span>Price Range: {selectedPrice}</span>
                  <ChevronDown className='dropdown-icon' />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className='dropdown-content'>
                <DropdownMenuItem
                  className={`dropdown-item ${
                    selectedPrice === "All Prices" ? "selected" : ""
                  }`}
                  onClick={() => setSelectedPrice("All Prices")}
                >
                  All Prices
                  {selectedPrice === "All Prices" && (
                    <Check className='check-icon' />
                  )}
                </DropdownMenuItem>
                <DropdownMenuItem
                  className={`dropdown-item ${
                    selectedPrice === "Under $50" ? "selected" : ""
                  }`}
                  onClick={() => setSelectedPrice("Under $50")}
                >
                  Under $50
                  {selectedPrice === "Under $50" && (
                    <Check className='check-icon' />
                  )}
                </DropdownMenuItem>
                <DropdownMenuItem
                  className={`dropdown-item ${
                    selectedPrice === "$50 - $100" ? "selected" : ""
                  }`}
                  onClick={() => setSelectedPrice("$50 - $100")}
                >
                  $50 - $100
                  {selectedPrice === "$50 - $100" && (
                    <Check className='check-icon' />
                  )}
                </DropdownMenuItem>
                <DropdownMenuItem
                  className={`dropdown-item ${
                    selectedPrice === "$100 - $200" ? "selected" : ""
                  }`}
                  onClick={() => setSelectedPrice("$100 - $200")}
                >
                  $100 - $200
                  {selectedPrice === "$100 - $200" && (
                    <Check className='check-icon' />
                  )}
                </DropdownMenuItem>
                <DropdownMenuItem
                  className={`dropdown-item ${
                    selectedPrice === "Over $200" ? "selected" : ""
                  }`}
                  onClick={() => setSelectedPrice("Over $200")}
                >
                  Over $200
                  {selectedPrice === "Over $200" && (
                    <Check className='check-icon' />
                  )}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Sort Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className='dropdown-button' variant='outline'>
                  <span>Sort By: {selectedSort}</span>
                  <ChevronDown className='dropdown-icon' />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className='dropdown-content'>
                <DropdownMenuItem
                  className={`dropdown-item ${
                    selectedSort === "Featured" ? "selected" : ""
                  }`}
                  onClick={() => setSelectedSort("Featured")}
                >
                  Featured
                  {selectedSort === "Featured" && (
                    <Check className='check-icon' />
                  )}
                </DropdownMenuItem>
                <DropdownMenuItem
                  className={`dropdown-item ${
                    selectedSort === "Price: Low to High" ? "selected" : ""
                  }`}
                  onClick={() => setSelectedSort("Price: Low to High")}
                >
                  Price: Low to High
                  {selectedSort === "Price: Low to High" && (
                    <Check className='check-icon' />
                  )}
                </DropdownMenuItem>
                <DropdownMenuItem
                  className={`dropdown-item ${
                    selectedSort === "Price: High to Low" ? "selected" : ""
                  }`}
                  onClick={() => setSelectedSort("Price: High to Low")}
                >
                  Price: High to Low
                  {selectedSort === "Price: High to Low" && (
                    <Check className='check-icon' />
                  )}
                </DropdownMenuItem>
                <DropdownMenuItem
                  className={`dropdown-item ${
                    selectedSort === "Newest" ? "selected" : ""
                  }`}
                  onClick={() => setSelectedSort("Newest")}
                >
                  Newest
                  {selectedSort === "Newest" && (
                    <Check className='check-icon' />
                  )}
                </DropdownMenuItem>
                <DropdownMenuItem
                  className={`dropdown-item ${
                    selectedSort === "Best Selling" ? "selected" : ""
                  }`}
                  onClick={() => setSelectedSort("Best Selling")}
                >
                  Best Selling
                  {selectedSort === "Best Selling" && (
                    <Check className='check-icon' />
                  )}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Products Grid - First Row */}
        <div className='product-grid'>
          {[1, 2, 3, 4].map((item) => (
            <div key={`product-${item}`} className='product-card'>
              <div className='product-image-container'>
                <Image
                  src='/placeholder.svg?height=160&width=160'
                  alt='Watch'
                  width={160}
                  height={160}
                  className='product-image'
                />
              </div>
              <div className='product-info'>
                <p className='product-title'>Text</p>
                <p className='product-price'>$0</p>
                <p className='product-seller'>Seller: Letuc Robert</p>
              </div>
              <div className='product-actions'>
                <button className='add-to-cart-button'>
                  <ShoppingCart className='cart-icon' />
                  ADD TO CART
                  <ArrowRight className='arrow-icon' />
                </button>
                <button className='favorite-button'>
                  <Heart className='heart-icon' />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Products Grid - Second Row */}
        <div className='product-grid'>
          {[5, 6, 7, 8].map((item) => (
            <div key={`product-${item}`} className='product-card'>
              <div className='product-image-container'>
                <Image
                  src='/placeholder.svg?height=160&width=160'
                  alt='Watch'
                  width={160}
                  height={160}
                  className='product-image'
                />
              </div>
              <div className='product-info'>
                <p className='product-title'>Text</p>
                <p className='product-price'>$0</p>
                <p className='product-seller'>Seller: Letuc Robert</p>
              </div>
              <div className='product-actions'>
                <button className='add-to-cart-button'>
                  <ShoppingCart className='cart-icon' />
                  ADD TO CART
                  <ArrowRight className='arrow-icon' />
                </button>
                <button className='favorite-button'>
                  <Heart className='heart-icon' />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
      </section>
    </div>
    // <Pagination />
    // {/* Footer */}
    // {/* <Footer /> */}
    // </div>
  );
}
