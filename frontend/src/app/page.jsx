/** @format */

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

import {
  ShoppingCart,
  User,
  Moon,
  Heart,
  Facebook,
  Linkedin,
  Twitter,
} from "lucide-react";
import "../styles/main.css";
import Footer from "@/components/Footer";
export default function Home() {
  return (
    <div className='main'>
      {/* Navigation */}

      {/* Hero Section */}
      <section className='hero-section'>
        <div className='hero-container'>
          <div className='hero-content'>
            <h1 className='hero-title'>Welcome to our Watch Marketplace</h1>
            <p className='hero-description'>
              Discover a wide range of luxury watches
            </p>
            <div className='hero-buttons'>
              <button className='button button-primary'>Register</button>
              <button className='button button-secondary'>Log In</button>
            </div>
          </div>
          <div className='hero-image-placeholder'></div>
        </div>
      </section>

      {/* Banner Image */}
      {/* <section className='banner-section'>
        <div className='banner-container'>
          <div className='banner-image-wrapper'>
            <Image
              src='/images/Banner.png'
              alt='Luxury watch'
              fill
              className='banner-image'
            />
          </div>
        </div>
      </section> */}

      {/* Buy a Watch Section */}
      <section className='buy-section'>
        <div className='buy-container'>
          <div className='buy-image-placeholder'></div>
          <div className='buy-content'>
            <h2 className='section-title'>Buy a watch</h2>
            <p className='section-description'>
              See what others are saying about their purchases
            </p>

            <div className='testimonials'>
              <div className='testimonial-card'>
                <div className='testimonial-header'>
                  {/* <div className='testimonial-avatar'></div> */}
                  <span className='testimonial-name'>Gabriel M. </span>
                </div>
                <div className='testimonial-rating'>★★★★★</div>
                <p className='testimonial-text'>
                  Great quality and fast delivery
                </p>
              </div>
              <div className='testimonial-card'>
                <div className='testimonial-header'>
                  {/* <div className='testimonial-avatar'></div> */}
                  <span className='testimonial-name'>Alex C. </span>
                </div>
                <div className='testimonial-rating'>★★★★★</div>
                <p className='testimonial-text'>Very happy with my purchase</p>
              </div>
            </div>
            <Link href='/explore'>
              <Button variant='outline' className='button button-primary'>
                Explore watches
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Selling Options */}
      <section className='selling-section'>
        <div className='selling-container'>
          <div className='selling-content'>
            <h2 className='section-title'>Selling Options</h2>
            <p className='section-description'>
              Put your watch up for sale now
            </p>
            <Link href='/explore'>
              <div className='selling-option'>
                <div className='selling-icon'>
                  <span>💰</span>
                </div>

                <div className='selling-details'>
                  <h3 className='selling-option-title'>Sell Your Watch</h3>
                  <p className='selling-option-description'>
                    Earn money by selling your watch
                  </p>
                </div>
              </div>
            </Link>
          </div>
          <div className='selling-image-placeholder'></div>
        </div>
      </section>

      {/* Latest Watches */}
      <section className='latest-section'>
        <div className='latest-container'>
          <h2 className='section-title section-title-center'>Latest Watches</h2>

          <div className='product-grid'>
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className='product-card'>
                <div className='product-image-placeholder'></div>
                <div className='product-details'>
                  <p className='product-name'>Test</p>
                  <p className='product-price'>$0</p>
                  <p className='product-seller'>Seller: Lexus Robert</p>
                  <div className='product-actions'>
                    <button className='add-to-cart-button'>
                      + ADD TO CART <span className='arrow'>→</span>
                    </button>
                    <button className='wishlist-button'>
                      <Heart size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
