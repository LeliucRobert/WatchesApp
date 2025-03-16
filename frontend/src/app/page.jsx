/** @format */

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
import "../styles/main.css";
import Footer from "@/components/Footer";
import Pagination from "@/components/Pagination";
import { Button } from "@/components/ui/button";
import Category from "@/components/Category";
export default function Home() {
  return (
    <div className='container'>
      {/* Header */}

      <main className='main'>
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
              <div className='dropdown'>
                <button className='dropdown-button'>
                  <span>Price Range: Value</span>
                  <ChevronDown className='dropdown-icon' />
                </button>
              </div>

              <div className='dropdown'>
                <button className='dropdown-button'>
                  <span>Sort By</span>
                  <ChevronDown className='dropdown-icon' />
                </button>
              </div>
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
      </main>
      <Pagination />
      {/* Footer */}
      {/* <Footer /> */}
    </div>
  );
}
