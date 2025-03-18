/** @format */

import React from "react";
import Image from "next/image";
import Link from "next/link";
import "../styles/components/Navbar.css";
import { Heart, ShoppingCart, User, Moon } from "lucide-react";
export default function Navbar() {
  return (
    <div className='header-container'>
      <div className='logo'>
        <Image
          src='/images/Watch.png'
          alt='Watchly Logo'
          width={44}
          height={44}
          className='logo-image'
        />
        <span className='logo-text'>Watchly</span>
      </div>

      <div className='nav-actions'>
        {/* Navigation Links */}
        <nav className='nav'>
          <Link href='/' className='nav-link'>
            Home
          </Link>
          <Link href='/explore' className='nav-link'>
            Explore
          </Link>
          <Link href='/addEntity' className='nav-link'>
            Sell a watch
          </Link>
        </nav>

        {/* Action Buttons */}
        <div className='header-actions'>
          <button className='icon-button'>
            <Heart className='icon' />
          </button>
          <button className='icon-button'>
            <User className='icon' />
          </button>
          <button className='icon-button'>
            <ShoppingCart className='icon' />
          </button>
          <button className='icon-button'>
            <Moon className='icon' />
          </button>
        </div>
      </div>
    </div>
  );
}
